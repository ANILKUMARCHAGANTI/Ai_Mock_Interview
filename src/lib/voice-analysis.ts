import { GoogleGenerativeAI } from "@google/generative-ai";

// Interface for voice analysis results
export interface VoiceAnalysisResult {
  sentiment: string;
  domainKnowledge: string;
  voiceTone: string;
  confidenceScore: number;
  overallAssessment: string;
}

/**
 * Analyzes the voice transcription of a candidate to provide unbiased feedback
 * on sentiment, domain knowledge, and voice tone.
 */
export class VoiceAnalysisService {
  private apiKey: string = '';
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    try {
      this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      
      if (!this.apiKey) {
        console.warn('VITE_GEMINI_API_KEY is not set in environment variables');
        // Use a fallback mechanism if API key is not available
        this.genAI = null;
        this.model = null;
      } else {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({
          model: "gemini-1.5-flash", // Updated to a more widely available model
        });
      }
    } catch (error) {
      console.error('Error initializing voice analysis service:', error);
      this.genAI = null;
      this.model = null;
    }
  }

  /**
   * Analyzes the candidate's voice transcription
   * @param question The interview question
   * @param transcription The transcribed answer from the candidate
   * @param expectedAnswer The expected or ideal answer
   * @returns Voice analysis result with sentiment, domain knowledge, and tone assessment
   */
  async analyzeVoice(
    question: string,
    transcription: string,
    expectedAnswer: string
  ): Promise<VoiceAnalysisResult> {
    try {
      // Trim and clean the transcription
      const cleanedTranscription = transcription.trim();
      console.log(`Analyzing voice for answer with ${cleanedTranscription.length} characters`);
      
      // Skip analysis if transcription is too short
      if (cleanedTranscription.length < 30) {
        console.warn('Transcription too short for analysis');
        return {
          sentiment: "Neutral",
          domainKnowledge: "Insufficient data",
          voiceTone: "Insufficient data",
          confidenceScore: 0,
          overallAssessment: "The response is too short to analyze properly."
        };
      }

      // Check if model is available (API key is set)
      if (!this.model || !this.genAI) {
        console.warn('Voice analysis service not properly initialized - missing API key');
        // Provide a reasonable default analysis
        return this.generateDefaultAnalysis(cleanedTranscription);
      }

      const prompt = `
        As an unbiased AI assistant, analyze this candidate's interview response:
        
        Question: "${question}"
        
        Candidate's Response: "${cleanedTranscription}"
        
        Expected Answer Points: "${expectedAnswer}"
        
        Provide an objective analysis with the following components:
        
        1. Sentiment Analysis: Analyze the emotional tone of the response (positive, negative, neutral, confident, uncertain).
        
        2. Domain Knowledge Assessment: Evaluate how well the candidate demonstrates knowledge of the subject matter. Consider accuracy, depth, and relevance to the question.
        
        3. Voice Tone Analysis: Based on word choice and phrasing, assess the candidate's communication style (formal, casual, technical, clear, confusing).
        
        4. Confidence Score: Rate from 1-10 how confidently the candidate appears to know the subject matter.
        
        5. Overall Assessment: Provide a brief, unbiased summary of the candidate's response quality.
        
        Return ONLY a JSON object with these fields: "sentiment", "domainKnowledge", "voiceTone", "confidenceScore", and "overallAssessment".
      `;

      try {
        console.log('Sending request to Gemini API...');
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const parsedResult = this.parseAnalysisResponse(text);
        console.log('Successfully parsed analysis response');
        return parsedResult;
      } catch (apiError) {
        console.error('Error calling Gemini API:', apiError);
        // If the API call fails, generate a default analysis
        return this.generateDefaultAnalysis(cleanedTranscription);
      }
    } catch (error) {
      console.error("Voice analysis error:", error);
      return {
        sentiment: "Error",
        domainKnowledge: "Error analyzing domain knowledge",
        voiceTone: "Error analyzing voice tone",
        confidenceScore: 0,
        overallAssessment: "An error occurred during analysis."
      };
    }
  }

  /**
   * Generates a default voice analysis result when the API is unavailable
   */
  private generateDefaultAnalysis(transcription: string): VoiceAnalysisResult {
    // Generate a confidence score based on answer length
    const length = transcription.length;
    let confidenceScore = 5; // Default mid-range score
    
    if (length > 500) confidenceScore = 8;
    else if (length > 300) confidenceScore = 7;
    else if (length > 100) confidenceScore = 6;
    else if (length < 50) confidenceScore = 2; // Very short answers get low scores
    
    // Simple sentiment analysis based on positive/negative words
    const positiveWords = ['good', 'great', 'excellent', 'best', 'confident', 'sure', 'definitely', 'absolutely'];
    const negativeWords = ['not', 'cannot', 'difficult', 'hard', 'problem', 'issue', 'unfortunately', 'however'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    const words = transcription.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    // Determine sentiment based on word analysis AND confidence score
    let sentiment = "Neutral";
    let domainKnowledge = "";
    let voiceTone = "";
    let overallAssessment = "";
    
    // Align sentiment with confidence score
    if (confidenceScore >= 7) {
      sentiment = "Positive";
      domainKnowledge = "The candidate demonstrates strong understanding of the topic.";
      voiceTone = "Professional, clear, and confident";
      overallAssessment = `The candidate provided a ${length > 300 ? 'detailed' : 'comprehensive'} response that thoroughly addresses the question.`;
    } 
    else if (confidenceScore >= 5) {
      sentiment = "Slightly Positive";
      domainKnowledge = "The candidate demonstrates adequate understanding of the topic.";
      voiceTone = "Professional with some clarity";
      overallAssessment = `The candidate provided a ${length > 200 ? 'detailed' : 'reasonable'} response that addresses most aspects of the question.`;
    }
    else if (confidenceScore >= 3) {
      sentiment = "Neutral";
      domainKnowledge = "The candidate demonstrates basic understanding of the topic.";
      voiceTone = "Somewhat hesitant but clear";
      overallAssessment = `The candidate provided a brief response that partially addresses the question.`;
    }
    else {
      sentiment = "Slightly Negative";
      domainKnowledge = "The candidate demonstrates limited understanding of the topic.";
      voiceTone = "Uncertain or hesitant";
      overallAssessment = `The candidate provided a minimal response that may not fully address the question.`;
    }
    
    // Override with word analysis if there's a strong signal
    if (positiveCount > negativeCount * 3 && confidenceScore >= 5) {
      sentiment = "Positive";
    } else if (negativeCount > positiveCount * 3 && confidenceScore <= 5) {
      sentiment = "Negative";
    }
    
    return {
      sentiment: sentiment,
      domainKnowledge: domainKnowledge,
      voiceTone: voiceTone,
      confidenceScore: confidenceScore,
      overallAssessment: overallAssessment
    };
  }

  /**
   * Parses the AI response into a structured VoiceAnalysisResult
   */
  private parseAnalysisResponse(responseText: string): VoiceAnalysisResult {
    try {
      // Clean up the response text to extract just the JSON
      let cleanText = responseText.trim();
      
      // Remove any markdown code block indicators
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.substring(7);
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.substring(3);
      }
      
      if (cleanText.endsWith("```")) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
      }
      
      // Additional cleanup for common issues
      // Remove any text before the first { and after the last }
      const firstBrace = cleanText.indexOf('{');
      const lastBrace = cleanText.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      }
      
      console.log('Cleaned JSON text:', cleanText.substring(0, 50) + '...');
      
      // Parse the JSON
      const parsedResult = JSON.parse(cleanText);
      
      // Validate the result has the expected fields
      if (!parsedResult.sentiment || !parsedResult.domainKnowledge || 
          !parsedResult.voiceTone || !parsedResult.overallAssessment) {
        console.warn('Parsed result missing required fields:', parsedResult);
      }
      
      // Ensure confidence score is a number between 0-10
      let confidenceScore = 5; // Default
      if (parsedResult.confidenceScore !== undefined) {
        confidenceScore = Number(parsedResult.confidenceScore);
        if (isNaN(confidenceScore)) confidenceScore = 5;
        if (confidenceScore < 0) confidenceScore = 0;
        if (confidenceScore > 10) confidenceScore = 10;
      }
      
      return {
        sentiment: parsedResult.sentiment || "Neutral",
        domainKnowledge: parsedResult.domainKnowledge || "No assessment available",
        voiceTone: parsedResult.voiceTone || "No assessment available",
        confidenceScore: confidenceScore,
        overallAssessment: parsedResult.overallAssessment || "No overall assessment available"
      };
    } catch (error) {
      console.error("Error parsing voice analysis response:", error);
      return this.generateDefaultAnalysis("Error occurred during analysis");
    }
  }
}

// Create a singleton instance
export const voiceAnalysisService = new VoiceAnalysisService();
