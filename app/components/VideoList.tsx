"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Video } from "../types";

interface VideoListProps {
  videos: Video[];
  onWatchVideo: (video: Video) => void;
  onDeleteVideo: (videoId: string) => void;
}

export default function VideoList({
  videos,
  onWatchVideo,
  onDeleteVideo,
}: Readonly<VideoListProps>) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (video: Video) => {
    setVideoToDelete(video);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!videoToDelete) return;

    setIsDeleting(true);
    try {
      await onDeleteVideo(videoToDelete.id);
      setDeleteModalOpen(false);
      setVideoToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setVideoToDelete(null);
  };
  if (videos.length === 0) {
    return (
      <section
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl border border-gray-300 dark:border-gray-700/50 rounded-2xl p-12 text-center"
        aria-labelledby="empty-state-heading"
      >
        <div
          className="text-gray-400 dark:text-gray-500 mb-6"
          aria-hidden="true"
        >
          <svg
            className="w-20 h-20 mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3
          id="empty-state-heading"
          className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
        >
          No videos added yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Click the &ldquo;Add Video&rdquo; button to start building your
          collection.
        </p>
      </section>
    );
  }

  return (
    <section
      className="overflow-hidden"
      aria-labelledby="video-collection-heading"
    >
      <div className="">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <li
              key={video.id}
              className="backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-medium animate-fade-in-up group"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <article className="p-10">
                {/* Video Thumbnail */}
                <div className="aspect-video h-45 w-full bg-gray-100 dark:bg-gray-700 mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.name || video.title}`}
                    width={190}
                    height={100}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/320x180/gray/white?text=No+Thumbnail";
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {video.name || video.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3">
                    {video.description || "No description available"}
                  </p>

                  {/* Action Buttons */}
                  <div
                    className="flex gap-2 pt-4"
                    role="group"
                    aria-label={`Actions for ${video.name || video.title}`}
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onWatchVideo(video)}
                      className="flex-1"
                      icon={
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                      aria-label={`Watch ${video.name || video.title}`}
                    >
                      Watch
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDeleteClick(video)}
                      className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400"
                      icon={
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      }
                      aria-label={`Delete ${
                        video.name || video.title
                      } from collection`}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Video"
        message="Are you sure you want to delete"
        itemName={videoToDelete?.name || videoToDelete?.title}
        isDeleting={isDeleting}
      />
    </section>
  );
}
