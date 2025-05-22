"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteUserQuestion } from "@/app/(admin)/dashboard/qna/actions";

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

interface UserQuestionsListProps {
  questions: UserQuestion[];
}

export default function UserQuestionsList({ questions }: UserQuestionsListProps) {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }
    
    setLoading({ ...loading, [id]: true });
    
    try {
      await deleteUserQuestion(id);
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };
  
  if (questions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No user questions found</p>
      </div>
    );
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{question.question}</h3>
                <Badge variant={question.isAnswered ? "outline" : "secondary"}>
                  {question.isAnswered ? "Answered" : "Pending"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                From: {question.user.name || question.user.email} • {formatDate(question.createdAt)}
              </div>
            </div>
          </CardHeader>
          
          <CardFooter className="pt-2">
            <div className="flex justify-between w-full">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(question.id)}
                disabled={loading[question.id]}
              >
                Delete
              </Button>
              
              {!question.isAnswered && (
                <Link href={`/dashboard/qna/answer/${question.id}`}>
                  <Button variant="default" size="sm">
                    Answer Question
                  </Button>
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 