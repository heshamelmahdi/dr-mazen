"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { answerUserQuestion } from "@/app/dashboard/qa/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AudioRecorder from "./audio-recorder";

interface QAAnswerFormProps {
  questionId: string;
  userQuestion: string;
}

export default function QAAnswerForm({ questionId, userQuestion }: QAAnswerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answerType, setAnswerType] = useState<'TEXT' | 'AUDIO'>("TEXT");
  const [answerText, setAnswerText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validation
    if (answerType === 'TEXT' && !answerText.trim()) {
      setError("Answer text is required");
      setIsSubmitting(false);
      return;
    }
    
    if (answerType === 'AUDIO' && !audioFile) {
      setError("Audio file is required");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("answerType", answerType);
      formData.append("answerText", answerText);
      formData.append("isPrivate", isPrivate.toString());
      
      if (audioFile) {
        formData.append("audioFile", audioFile);
      }
      
      const result = await answerUserQuestion(questionId, formData);
      
      if (result.success) {
        router.push("/dashboard/qa");
        router.refresh();
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAudioCapture = (file: File) => {
    setAudioFile(file);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAudioFile(files[0]);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Answer Type</Label>
            <Tabs 
              defaultValue="TEXT" 
              onValueChange={(value) => setAnswerType(value as 'TEXT' | 'AUDIO')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="TEXT" disabled={isSubmitting}>Text Answer</TabsTrigger>
                <TabsTrigger value="AUDIO" disabled={isSubmitting}>Audio Answer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="TEXT" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="answerText">Answer Text</Label>
                  <Textarea
                    id="answerText"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Enter your answer here"
                    className="min-h-[150px]"
                    disabled={isSubmitting}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="AUDIO" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Record Audio</Label>
                    <div className="mt-2">
                      <AudioRecorder onAudioCapture={handleAudioCapture} />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label htmlFor="audioFile">Or Upload Audio File</Label>
                    <input
                      id="audioFile"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="mt-2 w-full"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {audioFile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700 mb-2">Selected Audio:</p>
                      <p className="text-sm text-gray-500">{audioFile.name} ({Math.round(audioFile.size / 1024)} KB)</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isPrivate"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
              disabled={isSubmitting}
            />
            <Label htmlFor="isPrivate">Make this answer private</Label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/qa")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 