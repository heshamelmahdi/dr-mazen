"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils/date-utils";

interface AudioRecorderProps {
  onAudioCapture: (file: File) => void;
}

export default function AudioRecorder({ onAudioCapture }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);
  
  const startRecording = async () => {
    try {
      // Reset state
      audioChunksRef.current = [];
      setRecordingTime(0);
      setAudioURL(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        // Create a File object from the Blob
        const fileName = `recorded-audio-${new Date().toISOString()}.mp3`;
        const audioFile = new File([audioBlob], fileName, { type: 'audio/mpeg' });
        
        // Pass the file to parent component
        onAudioCapture(audioFile);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please ensure you have microphone permissions enabled.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {!isRecording ? (
          <Button 
            type="button" 
            onClick={startRecording} 
            variant="destructive"
            className="flex items-center"
          >
            <span className="mr-2">●</span>
            Start Recording
          </Button>
        ) : (
          <Button 
            type="button" 
            onClick={stopRecording} 
            variant="outline" 
            className="flex items-center"
          >
            <span className="mr-2">■</span>
            Stop Recording
          </Button>
        )}
        
        {isRecording && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-3"></div>
            <div className="text-sm font-mono">{formatTime(recordingTime)}</div>
          </div>
        )}
      </div>
      
      {audioURL && (
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm mb-2 text-gray-700">Preview recording:</p>
          <audio controls className="w-full">
            <source src={audioURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
} 