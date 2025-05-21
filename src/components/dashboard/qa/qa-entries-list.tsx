"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteQAEntry, toggleQAVisibility } from "@/app/dashboard/qa/actions";

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

interface QAEntriesListProps {
  entries: QAEntry[];
}

export default function QAEntriesList({ entries }: QAEntriesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleToggleVisibility = async (id: string, currentState: boolean) => {
    setLoading({ ...loading, [id]: true });
    
    try {
      await toggleQAVisibility(id, !currentState);
    } catch (error) {
      console.error("Error toggling visibility:", error);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Q&A entry?")) {
      return;
    }
    
    setLoading({ ...loading, [id]: true });
    
    try {
      await deleteQAEntry(id);
    } catch (error) {
      console.error("Error deleting entry:", error);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };
  
  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No Q&A entries found</p>
        <Link href="/dashboard/qa/new">
          <Button>Create Your First Q&A</Button>
        </Link>
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
      {entries.map((entry) => (
        <Card key={entry.id} className={entry.isActive ? "" : "opacity-60"}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-2">
                <h3 
                  className="text-lg font-medium cursor-pointer" 
                  onClick={() => handleToggleExpand(entry.id)}
                >
                  {entry.question}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={entry.isPrivate ? "outline" : "default"}>
                  {entry.isPrivate ? "Private" : "Public"}
                </Badge>
                <Badge variant="secondary">
                  {entry.answerType === 'TEXT' ? "Text" : "Audio"}
                </Badge>
                {!entry.isActive && (
                  <Badge variant="destructive">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Created on {formatDate(entry.createdAt)}
            </div>
          </CardHeader>
          
          {expandedId === entry.id && (
            <CardContent>
              {entry.answerType === 'TEXT' ? (
                <div className="whitespace-pre-line bg-gray-50 p-3 rounded-md">
                  {entry.answerText || "No text answer provided"}
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-md">
                  {entry.answerAudioPath ? (
                    <audio controls className="w-full">
                      <source src={`/api/audio/${entry.id}`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p className="text-gray-500">No audio answer provided</p>
                  )}
                </div>
              )}
            </CardContent>
          )}
          
          <CardFooter className="pt-2">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleVisibility(entry.id, entry.isActive)}
                disabled={loading[entry.id]}
              >
                {entry.isActive ? "Deactivate" : "Activate"}
              </Button>
              
              <div className="space-x-2">
                <Link href={`/dashboard/qa/edit/${entry.id}`}>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(entry.id)}
                  disabled={loading[entry.id]}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 