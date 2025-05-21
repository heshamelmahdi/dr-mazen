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