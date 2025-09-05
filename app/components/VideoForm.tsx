"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import Image from "next/image";
import Input from "./Input";
import { Video } from "../types";
import { validateRequired, validateYouTubeUrl, extractVideoId, validateYouTubeUrlWithError } from "../utils/validation";

interface VideoFormProps {
  onAddVideo: (video: {
    id: string;
    name: string;
    description: string;
    youtubeUrl: string;
    embedUrl: string;
  }) => void;
}

export default function VideoForm({ onAddVideo }: Readonly<VideoFormProps>) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    youtubeUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    thumbnail: string;
    isLoading: boolean;
  } | null>(null);

  // Note: YouTube validation and extraction functions moved to utils/validation.ts

  // Fetch YouTube video information
  const fetchVideoInfo = async (videoId: string) => {
    try {
      setPreviewData({ title: "", thumbnail: "", isLoading: true });

      // Use YouTube thumbnail URL (no API key needed)
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      // For title, we'll use a simple approach with oEmbed API
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );

      if (response.ok) {
        const data = await response.json();
        setPreviewData({
          title: data.title || "YouTube Video",
          thumbnail,
          isLoading: false,
        });

        // Auto-fill the name field if it's empty
        if (!formData.name.trim()) {
          setFormData((prev) => ({ ...prev, name: data.title || "" }));
        }
      } else {
        setPreviewData({
          title: "YouTube Video",
          thumbnail,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching video info:", error);
      setPreviewData({
        title: "YouTube Video",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        isLoading: false,
      });
    }
  };

  // Effect to fetch video info when YouTube URL changes
  useEffect(() => {
    if (formData.youtubeUrl && validateYouTubeUrl(formData.youtubeUrl)) {
      const videoId = extractVideoId(formData.youtubeUrl);
      if (videoId) {
        fetchVideoInfo(videoId);
      }
    } else {
      setPreviewData(null);
    }
  }, [formData.youtubeUrl]);

  // Form validation
  const validateFormData = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateRequired(formData.name, "Video name");
    if (nameError) newErrors.name = nameError;

    const descriptionError = validateRequired(formData.description, "Description");
    if (descriptionError) newErrors.description = descriptionError;

    const youtubeUrlError = validateYouTubeUrlWithError(formData.youtubeUrl);
    if (youtubeUrlError) newErrors.youtubeUrl = youtubeUrlError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateFormData()) {
      const videoId = extractVideoId(formData.youtubeUrl);
      const newVideo = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        youtubeUrl: formData.youtubeUrl.trim(),
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };

      onAddVideo(newVideo);

      // Reset form
      setFormData({ name: "", description: "", youtubeUrl: "" });
      setErrors({});
      setPreviewData(null);
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4" noValidate>
      {/* Name */}
      <Input
        type="text"
        id="name"
        name="name"
        label="Video Name *"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter video name"
        error={errors.name}
        aria-required="true"
        aria-invalid={errors.name ? "true" : "false"}
        aria-describedby={errors.name ? "name-error" : undefined}
      />

      {/* Description */}
      <Input
        multiline
        id="description"
        name="description"
        label="Description *"
        value={formData.description}
        onChange={handleInputChange}
        rows={3}
        placeholder="Enter video description"
        error={errors.description}
        aria-required="true"
        aria-invalid={errors.description ? "true" : "false"}
        aria-describedby={errors.description ? "description-error" : undefined}
      />

      {/* YouTube URL */}
      <div>
        <Input
          type="url"
          id="youtubeUrl"
          name="youtubeUrl"
          label="YouTube URL *"
          value={formData.youtubeUrl}
          onChange={handleInputChange}
          placeholder="https://www.youtube.com/watch?v=..."
          error={errors.youtubeUrl}
          aria-required="true"
          aria-invalid={errors.youtubeUrl ? "true" : "false"}
          aria-describedby={
            errors.youtubeUrl
              ? "youtubeUrl-error youtubeUrl-help"
              : "youtubeUrl-help"
          }
        />
        <p
          id="youtubeUrl-help"
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
        >
          Supported formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
        </p>

        {/* Video Preview Card */}
        {previewData && (
          <div className="mt-6 p-5 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600/60 rounded-lg shadow-lg">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
              Video Preview
            </h4>
            {previewData.isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="w-20 h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3">
                <Image
                  width={80}
                  height={48}
                  src={previewData.thumbnail}
                  alt="Video thumbnail"
                  className="w-20 h-12 object-cover shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/320x180/gray/white?text=No+Thumbnail";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                    {previewData.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    YouTube Video
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        loading={isSubmitting}
        className="w-full py-4 font-semibold tracking-wide mt-6"
        aria-describedby={isSubmitting ? "submit-status" : undefined}
      >
        Add Video
        {isSubmitting && (
          <span id="submit-status" className="sr-only">
            Please wait, adding video to your collection
          </span>
        )}
      </Button>
    </form>
  );
}
