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
      console.error(error);
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