"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProgramVideo } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { updateVideoSequence, toggleVideoActive, deleteProgramVideo } from "@/app/(admin)/dashboard/program/actions";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, 
  Trash, 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Eye, 
  EyeOff, 
  ExternalLink 
} from "lucide-react";

interface ProgramVideosListProps {
  videos: ProgramVideo[];
}

export default function ProgramVideosList({ videos }: ProgramVideosListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<ProgramVideo | null>(null);
  const [processing, setProcessing] = useState(false);

  // Handle video sequence change (move up or down)
  const handleSequenceChange = async (videoId: string, currentSeq: number, direction: "up" | "down") => {
    if (processing) return;
    
    setProcessing(true);
    const newSequence = direction === "up" ? currentSeq - 1 : currentSeq + 1;
    
    try {
      const result = await updateVideoSequence(videoId, newSequence);
      if (!result.success) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to update sequence:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Handle toggling video active status
  const handleToggleActive = async (videoId: string, currentActive: boolean) => {
    if (processing) return;
    
    setProcessing(true);
    try {
      const result = await toggleVideoActive(videoId, !currentActive);
      if (!result.success) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to toggle active status:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Handle opening delete confirmation dialog
  const openDeleteDialog = (video: ProgramVideo) => {
    setVideoToDelete(video);
    setIsDeleting(true);
  };

  // Handle delete video
  const handleDeleteVideo = async () => {
    if (!videoToDelete || processing) return;
    
    setProcessing(true);
    try {
      const result = await deleteProgramVideo(videoToDelete.id);
      if (result.success) {
        setIsDeleting(false);
        setVideoToDelete(null);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
    } finally {
      setProcessing(false);
    }
  };

  // Format video duration
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No videos found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading your first program video.</p>
            <div className="mt-6">
              <Link 
                href="/dashboard/program/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Upload New Video
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Seq</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos
                  .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                  .map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col items-center">
                          <span>{video.sequenceNumber}</span>
                          <div className="flex flex-col mt-1">
                            <button
                              onClick={() => handleSequenceChange(video.id, video.sequenceNumber, "up")}
                              disabled={video.sequenceNumber === 1 || processing}
                              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              onClick={() => handleSequenceChange(video.id, video.sequenceNumber, "down")}
                              disabled={video.sequenceNumber === videos.length || processing}
                              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                            >
                              <ChevronDown size={16} />
                            </button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-16 bg-gray-100 relative rounded">
                            {video.thumbnailPath ? (
                              <Image
                                src={video.thumbnailPath}
                                alt={video.title}
                                fill
                                className="object-cover rounded"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-xs text-gray-400">No thumb</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{video.title}</div>
                            {video.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {video.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={video.videoType === "SELF_HOSTED" ? "default" : "secondary"}>
                          {video.videoType === "SELF_HOSTED" ? "Self Hosted" : "YouTube"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDuration(video.durationSeconds)}</TableCell>
                      <TableCell>
                        <Badge variant={video.isActive ? "default" : "destructive"}>
                          {video.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatDistance(new Date(video.updatedAt), new Date(), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/dashboard/program/edit/${video.id}`)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              onClick={() => handleToggleActive(video.id, video.isActive)}
                            >
                              {video.isActive ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Show
                                </>
                              )}
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={() => router.push(`/program/${video.id}`)}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => openDeleteDialog(video)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{videoToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleting(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteVideo}
              disabled={processing}
            >
              {processing ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 