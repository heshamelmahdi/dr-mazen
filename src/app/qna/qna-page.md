# Q&A Page

This document outlines the implementation details for the Q&A page of the nutrition website.

## Overview

The Q&A page displays frequently asked questions and their answers, allowing users to browse existing Q&A entries and submit new questions. The doctor (admin) can later review and answer these questions through the admin dashboard.

## File Location

```
src/app/qna/page.tsx
```

## Page Structure

The Q&A page will be implemented as a server component that fetches Q&A data and passes it to client components for rendering and interaction.

## Components

### QAPage (Server Component)

```typescript
// src/app/qna/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import QAContent from "@/components/qna/qna-content";

export default async function QAPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if client's subscription is expired
  if (
    session.user.role === "CLIENT" && 
    session.user.subscriptionEndDate && 
    new Date(session.user.subscriptionEndDate) < new Date()
  ) {
    redirect("/subscription-expired");
  }
  
  // Fetch all public Q&A entries
  const qaEntries = await prisma.qAEntry.findMany({
    where: { 
      isActive: true,
      isPrivate: false
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return <QAContent qaEntries={qaEntries} userId={session.user.id} />;
}
```

### QAContent (Client Component)

```typescript
// src/components/qna/qna-content.tsx
"use client";

import { useState } from "react";
import QAList from "@/components/qna/qna-list";
import AskQuestionForm from "@/components/qna/ask-question-form";

interface QAEntry {
  id: string;
  question: string;
  answerType: 'TEXT' | 'AUDIO';
  answerText: string | null;
  answerAudioPath: string | null;
  createdAt: Date;
}

interface QAContentProps {
  qaEntries: QAEntry[];
  userId: string;
}

export default function QAContent({ qaEntries, userId }: QAContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Filter Q&A entries by search term
  const filteredEntries = searchTerm 
    ? qaEntries.filter(entry => 
        entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.answerText && entry.answerText.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : qaEntries;
  
  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    setFormSubmitted(true);
    
    // Reset form submitted state after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Questions & Answers
        </h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="md:w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions and answers..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <button
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Ask a Question
              </button>
            </div>
          </div>
          
          {formSubmitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
              Your question has been submitted successfully. The doctor will review and answer it soon.
            </div>
          )}
          
          {showForm && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Ask Your Question
              </h2>
              <AskQuestionForm 
                userId={userId} 
                onSuccess={handleFormSubmitSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Frequently Asked Questions
            </h2>
            
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  {searchTerm 
                    ? "No questions found matching your search. Try different keywords or ask a new question."
                    : "No questions available yet. Be the first to ask a question!"}
                </p>
              </div>
            ) : (
              <QAList entries={filteredEntries} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### QAList Component

```typescript
// src/components/qna/qna-list.tsx
"use client";

import { useState } from "react";
import AudioPlayer from "@/components/qna/audio-player";
import { formatDate } from "@/lib/utils/date-utils";

interface QAEntry {
  id: string;
  question: string;
  answerType: 'TEXT' | 'AUDIO';
  answerText: string | null;
  answerAudioPath: string | null;
  createdAt: Date;
}

interface QAListProps {
  entries: QAEntry[];
}

export default function QAList({ entries }: QAListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div 
          key={entry.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div 
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => toggleExpand(entry.id)}
          >
            <h3 className="text-lg font-medium text-gray-800">{entry.question}</h3>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">
                {formatDate(entry.createdAt)}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedId === entry.id ? 'transform rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {expandedId === entry.id && (
            <div className="p-4 bg-white">
              {entry.answerType === 'TEXT' && entry.answerText ? (
                <div className="text-gray-700 whitespace-pre-line">
                  {entry.answerText}
                </div>
              ) : entry.answerType === 'AUDIO' && entry.answerAudioPath ? (
                <AudioPlayer audioPath={entry.answerAudioPath} />
              ) : (
                <div className="text-gray-500 italic">
                  No answer available.
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

### AskQuestionForm Component

```typescript
// src/components/qna/ask-question-form.tsx
"use client";

import { useState } from "react";
import { submitQuestion } from "@/app/qna/actions";

interface AskQuestionFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AskQuestionForm({ 
  userId, 
  onSuccess, 
  onCancel 
}: AskQuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError("Please enter your question");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const result = await submitQuestion(userId, question);
      
      if (result.success) {
        setQuestion("");
        onSuccess();
      } else {
        setError(result.error || "Failed to submit question. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your nutrition or health question here..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Question"}
        </button>
      </div>
    </form>
  );
}
```

### AudioPlayer Component

```typescript
// src/components/qna/audio-player.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getS3PresignedUrl } from "@/lib/s3";

interface AudioPlayerProps {
  audioPath: string;
}

export default function AudioPlayer({ audioPath }: AudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Fetch presigned URL for audio file
  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        setIsLoading(true);
        const url = await getS3PresignedUrl(audioPath);
        setAudioUrl(url);
        setError(null);
      } catch (error) {
        console.error("Error fetching audio URL:", error);
        setError("Failed to load audio file");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAudioUrl();
  }, [audioPath]);
  
  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio || !audioUrl) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  
  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 bg-gray-50 rounded-md">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <audio ref={audioRef} src={audioUrl || undefined} preload="metadata" />
      
      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-grow">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Server Actions

```typescript
// src/app/qna/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitQuestion(userId: string, question: string) {
  try {
    if (!question.trim()) {
      return { success: false, error: "Question cannot be empty" };
    }
    
    await prisma.userQuestion.create({
      data: {
        userId,
        question: question.trim(),
      }
    });
    
    revalidatePath('/qna');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to submit question:", error);
    return { success: false, error: "Failed to submit question" };
  }
}

export async function getS3AudioUrl(audioPath: string) {
  try {
    // This would be implemented in the S3 utility
    // but we're calling it here for simplicity
    const url = await getS3PresignedUrl(audioPath);
    return { success: true, url };
  } catch (error) {
    console.error("Failed to get audio URL:", error);
    return { success: false, error: "Failed to load audio" };
  }
}
```

## Data Operations

### Q&A Page

1. Fetch all public Q&A entries:
```typescript
const qaEntries = await prisma.qAEntry.findMany({
  where: { 
    isActive: true,
    isPrivate: false
  },
  orderBy: { createdAt: 'desc' }
});
```

2. Submit a new question:
```typescript
await prisma.userQuestion.create({
  data: {
    userId,
    question: question.trim(),
  }
});
```

3. Generate presigned URL for audio file:
```typescript
const url = await getS3PresignedUrl(audioPath);
```

## Authentication and Access

- **Role**: Accessible to both admin and client users
- **Authentication**: Required
- **Subscription Check**: For client users, checks if subscription is active

## UI/UX Considerations

1. **Q&A List**:
   - Accordion-style list for questions and answers
   - Click to expand/collapse answers
   - Date display for each Q&A entry
   - Support for both text and audio answers
   - Custom audio player for audio answers

2. **Question Submission**:
   - Simple form for submitting new questions
   - Form appears/disappears on button click
   - Success message after submission
   - Error handling for failed submissions

3. **Search Functionality**:
   - Search box for filtering Q&A entries
   - Real-time filtering as user types
   - Clear messaging when no results are found

4. **Responsive Design**:
   - Adapts to different screen sizes
   - Form and search controls stack on mobile

## Assets Required

1. **Audio Files**:
   - Stored in S3 bucket
   - Accessed via presigned URLs

## Implementation Notes

1. The Q&A page uses a combination of server and client components:
   - Server component for data fetching and authentication
   - Client components for interactive UI elements and audio playback

2. Audio answers are handled with a custom audio player:
   - Fetches presigned URL for secure access
   - Provides play/pause controls
   - Shows progress bar and time display
   - Handles loading and error states

3. Question submission is implemented with server actions:
   - Form validation on client side
   - Server-side validation for additional security
   - Success and error handling
   - Page revalidation after submission

4. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette
   - Soft, rounded shapes

5. The Q&A entries are displayed in an accordion format:
   - Only one answer is expanded at a time
   - Smooth animations for expand/collapse
   - Clear visual indication of expanded state

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Prisma for database access
- AWS SDK for S3 presigned URLs
- Tailwind CSS for styling
