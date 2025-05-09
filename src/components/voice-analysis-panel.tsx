import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { VoiceAnalysisResult } from '@/lib/voice-analysis';
import { AlertCircle, Brain, Mic, Smile } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface VoiceAnalysisPanelProps {
  analysisResult: VoiceAnalysisResult | null;
  isLoading: boolean;
}

export const VoiceAnalysisPanel: React.FC<VoiceAnalysisPanelProps> = ({ 
  analysisResult, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Analysis
          </CardTitle>
          <CardDescription>
            Analyzing candidate's response...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysisResult) {
    return (
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Analysis
          </CardTitle>
          <CardDescription>
            Record an answer to see the voice analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6 text-gray-400">
            <p className="text-center text-sm">
              Voice analysis will appear here after the candidate records their answer.
              <br />
              This provides an unbiased second opinion to assist with your evaluation.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get color based on confidence score
  const getConfidenceColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-blue-500";
    if (score >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Helper function to get sentiment badge color
  const getSentimentColor = (sentiment: string) => {
    const lowerSentiment = sentiment.toLowerCase();
    if (lowerSentiment.includes('positive') || lowerSentiment.includes('confident')) return "bg-green-100 text-green-800";
    if (lowerSentiment.includes('negative') || lowerSentiment.includes('uncertain')) return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Analysis
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircle className="h-4 w-4 text-gray-400 ml-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  This is an AI-powered unbiased analysis of the candidate's response.
                  Use it as a second opinion to assist with your evaluation.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>
          Unbiased assessment of the candidate's response
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sentiment Analysis */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Smile className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Sentiment</h3>
                <Badge variant="outline" className={getSentimentColor(analysisResult.sentiment)}>
                  {analysisResult.sentiment}
                </Badge>
              </div>
            </div>
          </div>

          {/* Domain Knowledge */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Brain className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium">Domain Knowledge</h3>
              </div>
              <p className="text-sm text-gray-600">{analysisResult.domainKnowledge}</p>
            </div>
          </div>

          {/* Voice Tone */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Mic className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium">Voice Tone</h3>
              </div>
              <p className="text-sm text-gray-600">{analysisResult.voiceTone}</p>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-medium">Confidence Score</h3>
              <span className="text-sm font-medium">{analysisResult.confidenceScore}/10</span>
            </div>
            <Progress 
              value={analysisResult.confidenceScore * 10} 
              className={`h-2 ${getConfidenceColor(analysisResult.confidenceScore)}`}
            />
          </div>

          {/* Overall Assessment */}
          <div className="mt-4 p-3 bg-gray-50 rounded-md border">
            <h3 className="text-sm font-medium mb-1">Overall Assessment</h3>
            <p className="text-sm text-gray-700">{analysisResult.overallAssessment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
