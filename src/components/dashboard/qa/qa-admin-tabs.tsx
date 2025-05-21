"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QAEntriesList from "./qa-entries-list";
import UserQuestionsList from "./user-questions-list";
import { PrismaClient } from "@prisma/client";

// These types match our Prisma schema
interface QAEntry {
  id: string;
  question: string;
  answerType: 'TEXT' | 'AUDIO';
  answerText: string | null;
  answerAudioPath: string | null;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface UserQuestion {
  id: string;
  userId: string;
  question: string;
  isAnswered: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface QAAdminTabsProps {
  qaEntries: QAEntry[];
  userQuestions: UserQuestion[];
}

export default function QAAdminTabs({ qaEntries, userQuestions }: QAAdminTabsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter QA entries based on search term
  const filteredQAEntries = searchTerm
    ? qaEntries.filter(entry => 
        entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.answerType === 'TEXT' && entry.answerText && 
         entry.answerText.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : qaEntries;
  
  // Filter user questions based on search term
  const filteredUserQuestions = searchTerm
    ? userQuestions.filter(question => 
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.user.name && 
         question.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        question.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userQuestions;
  
  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Q&A entries and user questions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <Tabs defaultValue="qa-entries">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="qa-entries">
            Q&A Entries ({filteredQAEntries.length})
          </TabsTrigger>
          <TabsTrigger value="user-questions">
            User Questions ({filteredUserQuestions.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="qa-entries">
          <QAEntriesList entries={filteredQAEntries} />
        </TabsContent>
        
        <TabsContent value="user-questions">
          <UserQuestionsList questions={filteredUserQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 