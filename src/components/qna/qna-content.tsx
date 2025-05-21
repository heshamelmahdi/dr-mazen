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