"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";
import Toast from "./components/Toast";
import DarkModeToggle from "./components/DarkModeToggle";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Card from "./components/Card";
import Select from "./components/Select";
import { useToast } from "./hooks/useToast";
import { Video } from "./types";
import Image from "next/image";

// Seed video data - loaded on first visit
const seedVideos: Video[] = [
  {
    id: "seed-1",
    title: "Intro to JavaScript",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
    name: "Intro to JavaScript",
    description: "Learn the basics of JavaScript for beginners.",
    youtubeUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
    embedUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
  },
  {
    id: "seed-2",
    title: "TailwindCSS Crash Course",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dFgzHOX84xQ",
    name: "TailwindCSS Crash Course",
    description: "Build modern UIs with TailwindCSS.",
    youtubeUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
    embedUrl: "https://www.youtube.com/embed/dFgzHOX84xQ",
  },
  {
    id: "seed-3",
    title: "Vue.js Fundamentals",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/YrxBCBibVo0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YrxBCBibVo0",
    name: "Vue.js Fundamentals",
    description: "Understand the core concepts of Vue.js.",
    youtubeUrl: "https://www.youtube.com/watch?v=YrxBCBibVo0",
    embedUrl: "https://www.youtube.com/embed/YrxBCBibVo0",
  },
  {
    id: "seed-4",
    title: "React Hooks Tutorial",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
    name: "React Hooks Tutorial",
    description: "Master React Hooks with practical examples.",
    youtubeUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
    embedUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
  },
  {
    id: "seed-5",
    title: "Node.js Express Tutorial",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/L72fhGm1tfE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L72fhGm1tfE",
    name: "Node.js Express Tutorial",
    description: "Build REST APIs with Node.js and Express.",
    youtubeUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
    embedUrl: "https://www.youtube.com/embed/L72fhGm1tfE",
  },
  {
    id: "seed-6",
    title: "TypeScript for Beginners",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/BwuLxPH8IDs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
    name: "TypeScript for Beginners",
    description: "Learn TypeScript fundamentals and best practices.",
    youtubeUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
    embedUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
  },
  {
    id: "seed-7",
    title: "CSS Grid Layout",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o",
    name: "CSS Grid Layout",
    description: "Master CSS Grid for modern web layouts.",
    youtubeUrl: "https://www.youtube.com/watch?v=jV8B24rSN5o",
    embedUrl: "https://www.youtube.com/embed/jV8B24rSN5o",
  },
  {
    id: "seed-8",
    title: "Python Django Tutorial",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/F5mRW0jo-U4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/F5mRW0jo-U4",
    name: "Python Django Tutorial",
    description: "Build web applications with Django framework.",
    youtubeUrl: "https://www.youtube.com/watch?v=F5mRW0jo-U4",
    embedUrl: "https://www.youtube.com/embed/F5mRW0jo-U4",
  },
  {
    id: "seed-9",
    title: "MongoDB Crash Course",
    duration: "Seed Video",
    thumbnail: "https://img.youtube.com/vi/-56x56UppqQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/-56x56UppqQ",
    name: "MongoDB Crash Course",
    description: "Learn NoSQL database fundamentals with MongoDB.",
    youtubeUrl: "https://www.youtube.com/watch?v=-56x56UppqQ",
    embedUrl: "https://www.youtube.com/embed/-56x56UppqQ",
  },
];

export default function WatchTube() {
  const [currentVideo, setCurrentVideo] = useState(seedVideos[0]);
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"collections" | "player">(
    "collections"
  );
  const { toasts, showSuccess, showError, hideToast } = useToast();

  // Load user videos from localStorage on component mount, or seed data on first visit
  useEffect(() => {
    const savedVideos = localStorage.getItem("learntube-user-videos");
    const hasVisited = localStorage.getItem("learntube-has-visited");

    if (savedVideos) {
      try {
        const parsedVideos = JSON.parse(savedVideos);
        setUserVideos(parsedVideos);
      } catch (error) {
        console.error("Error loading videos from localStorage:", error);
      }
    } else if (!hasVisited) {
      // First visit - load seed data
      setUserVideos(seedVideos);
      localStorage.setItem("learntube-has-visited", "true");
    }
  }, []);

  // Save user videos to localStorage whenever userVideos changes
  useEffect(() => {
    if (userVideos.length > 0) {
      localStorage.setItem("learntube-user-videos", JSON.stringify(userVideos));
    }
  }, [userVideos]);

  // Filter and sort videos based on search query and sort option
  const filteredAndSortedVideos = userVideos
    .filter((video) => {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch =
        video.name?.toLowerCase().includes(searchLower) || false;
      const titleMatch = video.title.toLowerCase().includes(searchLower);
      const descMatch =
        video.description?.toLowerCase().includes(searchLower) || false;
      return nameMatch || titleMatch || descMatch;
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        const nameA = a.name || a.title;
        const nameB = b.name || b.title;
        return nameA.localeCompare(nameB);
      }
      // For 'recent', keep original order (most recently added first)
      return 0;
    });

  // Handle adding new video from form
  const handleAddVideo = (newVideo: {
    id: string;
    name: string;
    description: string;
    youtubeUrl: string;
    embedUrl: string;
  }) => {
    try {
      const videoToAdd: Video = {
        id: newVideo.id,
        title: newVideo.name,
        duration: "User Added",
        thumbnail: `https://img.youtube.com/vi/${newVideo.embedUrl
          .split("/")
          .pop()}/maxresdefault.jpg`,
        videoUrl: newVideo.embedUrl,
        name: newVideo.name,
        description: newVideo.description,
        youtubeUrl: newVideo.youtubeUrl,
        embedUrl: newVideo.embedUrl,
      };
      setUserVideos((prev) => [...prev, videoToAdd]);
      showSuccess(`Video "${newVideo.name}" added successfully!`);
    } catch (error) {
      showError("Failed to add video. Please try again.");
    }
  };

  // Handle watching a video from the list
  const handleWatchVideo = (video: Video) => {
    setCurrentVideo(video);
    setActiveTab("player");
    // Scroll to top to ensure video player is visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle deleting a video from user list
  const handleDeleteVideo = (videoId: string) => {
    const videoToDelete = userVideos.find((video) => video.id === videoId);
    setUserVideos((prev) => prev.filter((video) => video.id !== videoId));
    // If the deleted video was currently playing, switch to default
    if (currentVideo.id === videoId) {
      setCurrentVideo(seedVideos[0]);
    }
    if (videoToDelete) {
      showSuccess(
        `Video "${
          videoToDelete.name || videoToDelete.title
        }" deleted successfully!`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/95">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-300/60 dark:border-gray-700/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-5 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-400">Watch</span>
                <span className="text-gray-900 dark:text-white">Tube</span>
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
              >
                Add Video
              </Button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex border-white/20">
            <button
              onClick={() => setActiveTab("collections")}
              className={`px-6 py-4 cursor-pointer text-xs font-semibold transition-smooth ${
                activeTab === "collections"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              Collections ({filteredAndSortedVideos.length})
            </button>
            <button
              onClick={() => setActiveTab("player")}
              className={`px-6 py-4 cursor-pointer text-xs font-semibold transition-smooth ${
                activeTab === "player"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              Player
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "collections" && (
          <div>
            {/* Search and Sort Controls */}
            <div className="mb-6 flex justify-end gap-4 text-xs">
              {/* Search Bar */}
              <div className="">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-50">
                    <svg
                      className="size-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m21.407 19.753-4.41-4.41a8.148 8.148 0 0 0 1.633-4.903c0-4.516-3.674-8.19-8.19-8.19s-8.19 3.674-8.19 8.19 3.674 8.19 8.19 8.19a8.148 8.148 0 0 0 4.902-1.633l4.41 4.41a1.171 1.171 0 0 0 1.655-1.654ZM4.59 10.44a5.85 5.85 0 1 1 5.85 5.85 5.857 5.857 0 0 1-5.85-5.85Z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search videos by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600/50 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-transparent rounded-lg transition-smooth hover:border-gray-400 dark:hover:border-gray-500 focus:shadow-lg hover:shadow-md"
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="">
                <Select
                  value={sortBy}
                  onChange={(value: string) => setSortBy(value as "recent" | "alphabetical")}
                  options={[
                    { value: "recent", label: "Most Recent" },
                    { value: "alphabetical", label: "Alphabetical (A-Z)" },
                  ]}
                  placeholder="Sort by..."
                />
              </div>
            </div>

            <VideoList
              videos={filteredAndSortedVideos}
              onWatchVideo={handleWatchVideo}
              onDeleteVideo={handleDeleteVideo}
            />
          </div>
        )}

        {activeTab === "player" && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Video Player Section */}
            <div className="flex-1 lg:w-2/3">
              <Card>
                {/* Video Player */}
                <VideoPlayer
                  videoUrl={currentVideo.videoUrl}
                  title={currentVideo.title}
                />

                {/* Video Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentVideo.title}
                  </h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 text-xs">
                    <span className="">{currentVideo.duration}</span>
                    <span className="mx-2">•</span>
                    <span className="">1.2M views</span>
                    <span className="mx-2">•</span>
                    <span className="">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        }
                      >
                        Like
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                        }
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Video List Sidebar */}
            <div className="lg:w-1/3">
              <Card>
                <div className="p-6 border-b border-gray-300 dark:border-gray-700/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Up Next
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userVideos.map((video: Video) => (
                    <div
                      key={video.id}
                      className={`p-4 cursor-pointer transition-smooth hover:bg-gray-50/80 dark:hover:bg-gray-700/50 hover:scale-[1.02] ${
                        currentVideo.id === video.id
                          ? "bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-blue-600"
                          : ""
                      }`}
                      onClick={() => setCurrentVideo(video)}
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <Image
                            width={96}
                            height={56}
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-24 h-14 object-cover rounded-lg shadow-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-medium line-clamp-2 ${
                              currentVideo.id === video.id
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {video.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Add Video Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Video"
      >
        <VideoForm
          onAddVideo={(video) => {
            handleAddVideo(video);
            setIsModalOpen(false);
          }}
        />
      </Modal>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}
