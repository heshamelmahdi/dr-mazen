"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createQAEntry, updateQAEntry } from "@/app/dashboard/qa/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AudioRecorder from "./audio-recorder";

interface QAFormProps {
  initialData?: {
    id: string;
    question: string;
    answerType: 'TEXT' | 'AUDIO';
    answerText: string | null;
    answerAudioPath: string | null;
    isPrivate: boolean;
  };
}

export default function QAForm({ initialData }: QAFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answerType, setAnswerType] = useState<'TEXT' | 'AUDIO'>(initialData?.answerType || "TEXT");
  const [answerText, setAnswerText] = useState(initialData?.answerText || "");
  const [isPrivate, setIsPrivate] = useState(initialData?.isPrivate || false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [existingAudioUrl, setExistingAudioUrl] = useState<string | null>(null);
  
  // Fetch existing audio URL if there's an audio path
  useEffect(() => {
    if (initialData?.answerAudioPath) {
      fetchAudioUrl();
    }
  }, [initialData]);
  
  const fetchAudioUrl = async () => {
    try {
      const response = await fetch(`/api/audio/${initialData?.id}`);
      if (response.ok) {
        const data = await response.json();
        setExistingAudioUrl(data.url);
      }
    } catch (error) {
      console.error("Error fetching audio URL:", error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validation
    if (!question.trim()) {
      setError("Question is required");
      setIsSubmitting(false);
      return;
    }
    
    if (answerType === 'TEXT' && !answerText.trim()) {
      setError("Answer text is required");
      setIsSubmitting(false);
      return;
    }
    
    if (answerType === 'AUDIO' && !audioFile && !initialData?.answerAudioPath) {
      setError("Audio file is required");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answerType", answerType);
      formData.append("answerText", answerText);
      formData.append("isPrivate", isPrivate.toString());
      
      if (audioFile) {
        formData.append("audioFile", audioFile);
      }
      
      let result;
      
      if (initialData) {
        // Update existing entry
        result = await updateQAEntry(initialData.id, formData);
      } else {
        // Create new entry
        result = await createQAEntry(formData);
      }
      
      if (result.success) {
        router.push("/dashboard/qa");
        router.refresh();
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting Q&A:", error);
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
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question here"
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Answer Type</Label>
            <Tabs 
              defaultValue={answerType} 
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
                    placeholder="Enter the answer text here"
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
                    <Input
                      id="audioFile"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="mt-2"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {initialData?.answerAudioPath && !audioFile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700 mb-2">Existing Audio:</p>
                      {existingAudioUrl ? (
                        <audio controls className="w-full">
                          <source src={existingAudioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <p className="text-sm text-gray-500">Loading audio...</p>
                      )}
                    </div>
                  )}
                  
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
            <Label htmlFor="isPrivate">Private (only visible to specified users)</Label>
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
              {isSubmitting 
                ? "Saving..." 
                : initialData 
                  ? "Update Q&A" 
                  : "Create Q&A"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 