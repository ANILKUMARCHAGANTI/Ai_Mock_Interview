import { useAuth } from "@clerk/clerk-react";
import { CircleStop, Loader, Mic, RefreshCw, Save, Video, VideoOff, WebcamIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModal } from "./save-modal";
import { VoiceAnalysisPanel } from "./voice-analysis-panel";
import { VoiceAnalysisResult, voiceAnalysisService } from "@/lib/voice-analysis";

import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

interface VoiceAnalysisData {
  isAnalyzing: boolean;
  result: VoiceAnalysisResult | null;
}

export const RecordAnswer = ({ question, isWebCam, setIsWebCam }: RecordAnswerProps) => {
  const [microphonePermission, setMicrophonePermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [previouslyAnswered, setPreviouslyAnswered] = useState(false);
  const [savedAnswer, setSavedAnswer] = useState<{
    user_ans: string;
    feedback: string;
    rating: number;
    voiceAnalysis: VoiceAnalysisResult | null;
  } | null>(null);

  const checkMicrophonePermission = useCallback(async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      
      switch (permissionStatus.state) {
        case 'granted':
          setMicrophonePermission('granted');
          break;
        case 'prompt':
          setMicrophonePermission('pending');
          break;
        case 'denied':
          setMicrophonePermission('denied');
          toast.error('Microphone Access Denied', {
            description: 'Please enable microphone access in your browser settings.'
          });
          break;
      }

      permissionStatus.onchange = () => {
        switch (permissionStatus.state) {
          case 'granted':
            setMicrophonePermission('granted');
            break;
          case 'denied':
            setMicrophonePermission('denied');
            break;
        }
      };
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      toast.error('Microphone Permission Error', {
        description: 'Unable to check microphone permissions.'
      });
    }
  }, []);

  // Add a manual control flag to prevent auto-restart loops
  const [manuallyStoppedRecording, setManuallyStoppedRecording] = useState(false);
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true, // Keep continuous true for uninterrupted recording
    useLegacyResults: false,
    crossBrowser: true,
    timeout: 600000, // Increased timeout to 10 minutes to ensure it doesn't stop prematurely
    speechRecognitionProperties: {
      lang: 'en-US',
      interimResults: true, // Enable interim results for real-time updates
      maxAlternatives: 1
    }
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState("");
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysisData>({
    isAnalyzing: false,
    result: null
  });

  const { userId } = useAuth();
  const { interviewId } = useParams();

  // Record user answer function
  const recordUserAnswer = async () => {
    if (isRecording) {
      // Set the manual stop flag to prevent auto-restart loops
      setManuallyStoppedRecording(true);
      
      // Stop recording
      stopSpeechToText();
      toast.success('Recording stopped');
      
      // Wait a moment to ensure all final results are processed
      setTimeout(() => {
        // Trim the user answer to remove extra whitespace
        const trimmedAnswer = userAnswer?.trim() || "";
        console.log('Final answer length:', trimmedAnswer.length, 'characters');
        
        // Validate answer length
        if (trimmedAnswer.length < 30) {
          toast.error("Error", {
            description: `Your answer is only ${trimmedAnswer.length} characters. It should be more than 30 characters.`,
          });
          setManuallyStoppedRecording(false); // Reset the flag
          return;
        }
        
        // Store the final answer to ensure it's not lost during processing
        const finalAnswer = trimmedAnswer;
        processRecordedAnswer(finalAnswer);
      }, 2000); // Increased timeout to ensure all speech is processed
    } else {
      // Reset previous state before starting
      setUserAnswer('');
      setCurrentSpeech('');
      setAiResult(null);
      setVoiceAnalysis({
        isAnalyzing: false,
        result: null
      });
      
      // Reset the manual stop flag before starting a new recording
      setManuallyStoppedRecording(false);
      
      // Start recording
      startRecording();
    }
  };
  
  const startRecording = async () => {
    // Check microphone permission before starting
    if (microphonePermission === 'denied') {
      toast.error('Microphone Access Denied', {
        description: 'Please enable microphone access in your browser settings.'
      });
      return;
    }
    
    // Reset the manual stop flag to ensure we can record
    setManuallyStoppedRecording(false);
    
    try {
      // Start recording with retry mechanism
      let attempts = 0;
      const maxAttempts = 3;
      let success = false;
      
      while (!success && attempts < maxAttempts) {
        try {
          await startSpeechToText();
          success = true;
          toast.success('Recording started', {
            description: 'Speak clearly into your microphone'
          });
        } catch (err) {
          attempts++;
          console.error(`Speech recognition start error (attempt ${attempts}):`, err);
          
          if (attempts >= maxAttempts) {
            throw err; // Re-throw if we've reached max attempts
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error('Speech recognition start error:', error);
      toast.error('Speech Recognition Error', {
        description: 'Failed to start speech recognition. Check microphone access.'
      });
    }
  };
  
  const processRecordedAnswer = async (trimmedAnswer: string) => {
    // Set AI generating state to true
    setIsAiGenerating(true);
    
    try {
      // Generate AI feedback first
      console.log('Generating AI feedback...');
      const result = await generateResult(
        question.question,
        question.answer,
        trimmedAnswer
      );
      console.log('AI Result:', result);
      setAiResult(result);
      
      // Then generate voice analysis
      setVoiceAnalysis({
        isAnalyzing: true,
        result: null
      });
      
      // Use a timeout to ensure UI updates before starting voice analysis
      setTimeout(async () => {
        try {
          console.log('Starting voice analysis for answer with length:', trimmedAnswer.length);
          
          // Ensure the answer is substantial enough for analysis
          if (trimmedAnswer.length < 50) {
            console.warn('Answer may be too short for meaningful analysis');
          }
          
          const analysisResult = await voiceAnalysisService.analyzeVoice(
            question.question,
            trimmedAnswer,
            question.answer
          );
          
          console.log('Voice analysis result:', analysisResult);
          
          // Validate the analysis result
          if (!analysisResult || typeof analysisResult.confidenceScore !== 'number') {
            throw new Error('Invalid analysis result received');
          }
          
          setVoiceAnalysis({
            isAnalyzing: false,
            result: analysisResult
          });
          
          toast.success('Analysis Complete', {
            description: 'Voice analysis and feedback generated successfully.'
          });
        } catch (error) {
          console.error("Voice analysis error:", error);
          
          // Generate a fallback analysis based on answer length and content
          const answerLength = trimmedAnswer.length;
          let confidenceScore = 5; // Default mid-range score
          
          if (answerLength > 500) confidenceScore = 8;
          else if (answerLength > 300) confidenceScore = 7;
          else if (answerLength > 100) confidenceScore = 6;
          else if (answerLength < 50) confidenceScore = 3;
          
          // Create appropriate fallback result based on answer quality
          const fallbackResult = {
            sentiment: confidenceScore >= 6 ? "Positive" : confidenceScore >= 4 ? "Neutral" : "Slightly Negative",
            domainKnowledge: confidenceScore >= 6 ? 
              "The candidate shows good understanding of the topic." : 
              "The candidate shows basic understanding of the topic.",
            voiceTone: confidenceScore >= 6 ? 
              "Professional and clear" : 
              "Somewhat hesitant but understandable",
            confidenceScore: confidenceScore,
            overallAssessment: confidenceScore >= 6 ? 
              "Overall, this is a solid response that addresses the key points." :
              "The response addresses some aspects of the question but could be more comprehensive."
          };
          
          setVoiceAnalysis({
            isAnalyzing: false,
            result: fallbackResult
          });
          
          toast.warning("Voice Analysis Limited", {
            description: "Using simplified analysis due to service limitations."
          });
        }
      }, 1000); // Increased timeout to ensure proper processing
    } catch (error) {
      console.error("AI feedback generation error:", error);
      toast.error("Error", {
        description: "Failed to generate AI feedback."
      });
      setIsAiGenerating(false);
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    try {
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.substring(jsonStart, jsonEnd);
      const parsedResult = JSON.parse(jsonString);
      return parsedResult;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return { ratings: 0, feedback: "Error generating feedback" };
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;
    try {
      const aiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  const saveUserAnswer = async() => {
    setLoading(true);
    if (!aiResult) {
      toast("Error", {
        description: "Please record the candidate's answer first.",
      });
      setLoading(false);
      return;
    }
    const currentQuestion = question.question;

    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );
      const querySnap = await getDocs(userAnswerQuery);
      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "This question has already been answered",
        });
        return;
      }
      else {
        // Save the user answer with voice analysis data
        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          voiceAnalysis: voiceAnalysis.result || null,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "The candidate's answer has been saved." });
      }
      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description: "An error occurred while saving the response.",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // Check if this question has already been answered
  useEffect(() => {
    const checkPreviousAnswer = async () => {
      if (!userId || !question.question) return;
      
      try {
        const userAnswerQuery = query(
          collection(db, "userAnswers"),
          where("userId", "==", userId),
          where("question", "==", question.question)
        );
        const querySnap = await getDocs(userAnswerQuery);
        
        if (!querySnap.empty) {
          console.log("Found previous answer for this question");
          setPreviouslyAnswered(true);
          
          // Get the saved answer data
          const answerDoc = querySnap.docs[0].data();
          setSavedAnswer({
            user_ans: answerDoc.user_ans || "",
            feedback: answerDoc.feedback || "",
            rating: answerDoc.rating || 0,
            voiceAnalysis: answerDoc.voiceAnalysis || null
          });
          
          // Set the AI result from saved data
          setAiResult({
            ratings: answerDoc.rating || 0,
            feedback: answerDoc.feedback || ""
          });
          
          // Set voice analysis from saved data
          if (answerDoc.voiceAnalysis) {
            setVoiceAnalysis({
              isAnalyzing: false,
              result: answerDoc.voiceAnalysis
            });
          }
        } else {
          setPreviouslyAnswered(false);
          setSavedAnswer(null);
        }
      } catch (error) {
        console.error("Error checking previous answers:", error);
      }
    };
    
    checkPreviousAnswer();
  }, [userId, question.question]);

  useEffect(() => {
    // Check for microphone permission when component mounts
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  // Handle speech recognition errors
  useEffect(() => {
    if (error) {
      console.error('Speech recognition error:', error);
      toast.error('Speech Recognition Error', {
        description: `${error || 'Failed to recognize speech'}. Please check your microphone.`,
      });
      
      // Only stop recording if there's a critical error and we're not manually stopping
      if (isRecording && !manuallyStoppedRecording) {
        stopSpeechToText();
        // Don't automatically restart after an error
      }
    }
  }, [error, isRecording, stopSpeechToText, manuallyStoppedRecording]);

  // Process speech results in real-time
  useEffect(() => {
    // Don't process results if we've manually stopped recording
    if (manuallyStoppedRecording) return;
    
    // Update current speech from interim results for real-time feedback
    if (interimResult) {
      setCurrentSpeech(interimResult);
      console.log('Interim result:', interimResult);
    }
    
    // Update full transcript when results change
    if (results && results.length > 0) {
      try {
        // Process all results to build the complete transcript
        // Use a more robust approach to handle different result formats
        let processedResults = '';
        
        // Process each result and concatenate
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          if (typeof result === 'object' && result !== null && 'transcript' in result) {
            processedResults += ' ' + result.transcript;
          } else if (typeof result === 'string') {
            processedResults += ' ' + result;
          }
        }
        
        // Clean up the processed results
        processedResults = processedResults.trim();
        
        // Only update if we have content to avoid overwriting with empty string
        if (processedResults) {
          // Update the user answer with the complete transcript
          setUserAnswer(processedResults);
          console.log('Updated user answer length:', processedResults.length);
        }
      } catch (error) {
        console.error('Error processing speech results:', error);
      }
    }
  }, [results, interimResult, manuallyStoppedRecording]);
  
  // This duplicate error handler has been removed to prevent infinite loops

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
       <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />
 
      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
        {isWebCam ? (
          <WebCam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
        )}
      </div>
      
      {/* Show different controls based on whether the question was previously answered */}
      {!previouslyAnswered ? (
        <div className="flex items-center justify-center gap-3"> 
          <TooltipButton
            content={isWebCam ? "Turn Off" : "Turn On"}
            icon={
              isWebCam ? (
                <VideoOff className="min-w-5 min-h-5" />
              ) : (
                <Video className="min-w-5 min-h-5" />
              )
            }
            onClick={() => setIsWebCam(!isWebCam)}
          />
          <TooltipButton
            content={isRecording ? "Stop Recording" : "Start Recording"}
            icon={
              isRecording ? (
                <CircleStop className="min-w-5 min-h-5" />
              ) : (
                <Mic className="min-w-5 min-h-5" />
              )
            }
            onClick={recordUserAnswer}
          />
          <TooltipButton
            content="Record Again"
            icon={<RefreshCw className="min-w-5 min-h-5" />}
            onClick={recordNewAnswer}
          />
          <TooltipButton
            content="Save Result"
            icon={
              isAiGenerating ? (
                <Loader className="min-w-5 min-h-5 animate-spin" />
              ) : (
                <Save className="min-w-5 min-h-5" />
              )
            }
            onClick={() => {
              if (aiResult) {
                setOpen(true);
              } else {
                toast.error("Cannot Save", {
                  description: "Please complete recording and wait for analysis first."
                });
              }
            }}
            disabled={!aiResult || isAiGenerating}
          />
        </div>
      ) : (
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-amber-800 text-sm w-full max-w-md text-center">
          This question has already been answered and saved.
        </div>
      )}
      
      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Candidate's Answer */}
        <div className="w-full md:w-1/2 p-4 border rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold">Candidate's Answer:</h2>
          {previouslyAnswered && savedAnswer ? (
            <div>
              <p className="text-sm mt-2 text-gray-700 whitespace-normal">
                {savedAnswer.user_ans}
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800">AI Feedback:</h3>
                <p className="text-sm mt-1 text-gray-700">{savedAnswer.feedback}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium text-blue-800">Rating:</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {savedAnswer.rating}/10
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                {/* Main answer display */}
                <p className="text-sm mt-2 text-gray-700 whitespace-normal min-h-[100px]">
                  {userAnswer || "Start recording to see the candidate's answer here"}
                </p>
                
                {/* Real-time speech indicator */}
                {isRecording && (
                  <div className="mt-4 border-t pt-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xs text-gray-500">Recording in progress...</p>
                    </div>
                    
                    {currentSpeech && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-700 italic">
                          {currentSpeech}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Voice Analysis Panel */}
        <div className="w-full md:w-1/2">
          <VoiceAnalysisPanel 
            analysisResult={previouslyAnswered && savedAnswer ? savedAnswer.voiceAnalysis : voiceAnalysis.result}
            isLoading={voiceAnalysis.isAnalyzing}
          />
        </div>
      </div>
    </div>
  );
};
