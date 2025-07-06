"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MessageBubbleProps } from "@/types/chat";
import Image from "next/image";

export function MessageBubble({
  message,
  repliedMessage,
  onReply,
}: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showReplyButton, setShowReplyButton] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isUser = message.sender === "user";

  // Load audio metadata when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || message.type !== "voice") return;

    const handleLoadedMetadata = () => {
      const duration = audio.duration;
      if (isFinite(duration) && duration > 0) {
        setAudioDuration(duration);
        setAudioError(false);
        console.log("Audio duration loaded:", duration);
      } else {
        // Fallback to message duration if metadata not available
        setAudioDuration(message.duration || 5);
      }
    };

    const handleCanPlay = () => {
      console.log("Audio can play");
      setAudioError(false);
    };

    const handleError = (e: Event) => {
      console.error("Audio loading error:", e);
      setAudioError(true);
      setAudioDuration(message.duration || 5); // Use fallback duration
    };

    const handleLoadStart = () => {
      console.log("Audio load started");
      setAudioError(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);

    // Force load metadata
    if (message.content) {
      audio.load();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, [message.content, message.duration, message.type]);

  // Toggle audio playback state
  const handlePlayVoice = () => {
    if (audioError) {
      console.log("Cannot play audio due to error");
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Reset to beginning if at end
        if (currentTime >= audioDuration) {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setAudioError(true);
        });
      }
    }
  };

  // Track audio progress and handle playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log("Audio playback ended");
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setAudioError(false);
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
      setAudioError(true);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
    };
  }, [audioDuration]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate remaining playback time for countdown
  const getRemainingTime = () => {
    const duration = audioDuration || message.duration || 5;
    const remaining = Math.max(0, duration - currentTime);
    return formatTime(remaining);
  };

  // Get total duration for display
  const getTotalDuration = () => {
    const duration = audioDuration || message.duration || 5;
    return formatTime(duration);
  };

  // Therapist profile avatar component
  const TherapistLogo = () => (
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
      <Image
        src="/therapist.svg"
        alt="Therapist Profile"
        width={32}
        height={32}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );

  return (
    <div
      className="mb-4 group"
      onMouseEnter={() => setShowReplyButton(true)}
      onMouseLeave={() => setShowReplyButton(false)}
    >
      {/* Main message row with three-column layout */}
      <div
        className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
      >
        {/* Column 1: Therapist avatar (only for therapist messages) */}
        {!isUser && (
          <div className="flex-shrink-0 self-end mb-1">
            <TherapistLogo />
          </div>
        )}

        {/* Column 2: Message content bubble */}
        <div className="flex flex-col max-w-xs lg:max-w-md min-w-0">
          {/* Show original message being replied to */}
          {repliedMessage && (
            <div
              className={`mb-1 p-2 rounded-lg bg-gray-6050 border-l-2 ${
                isUser ? "bg-[#1b5858]" : "bg-[#263636]"
              }`}
            >
              <p className="text-xs text-gray-400 mb-1">
                {repliedMessage.sender === "therapist"
                  ? "Amazing Listener"
                  : "You"}
              </p>
              <p className="text-xs text-gray-300 truncate">
                {repliedMessage.type === "voice"
                  ? "🎵 Voice message"
                  : repliedMessage.content}
              </p>
            </div>
          )}

          {/* Text or voice message bubble */}
          {message.type === "text" ? (
            <div
              className={`p-3 rounded-lg ${
                isUser
                  ? "bg-[#263636] text-white rounded-br-sm"
                  : "bg-gray-700 text-gray-100 rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed break-words overflow-wrap-anywhere">
                {message.content}
              </p>
            </div>
          ) : (
            <div
              className={`p-3 rounded-lg flex items-center space-x-3 w-64 ${
                isUser
                  ? "bg-[#263636] text-white rounded-br-sm"
                  : "bg-gray-700 text-gray-100 rounded-bl-sm"
              }`}
            >
              {/* Play/pause button for voice messages */}
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayVoice}
                  disabled={audioError}
                  className={`w-8 h-8 p-0 hover:bg-white/10 rounded-full ${
                    audioError ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {audioError ? (
                    <span className="text-xs">❌</span>
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Audio waveform visualization */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-center space-x-1 h-6 mb-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-current rounded-full transition-all duration-150 ${
                        isPlaying && !audioError ? "animate-pulse" : ""
                      }`}
                      style={{
                        height: `${Math.random() * 16 + 8}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Countdown timer display */}
                <div className="text-center">
                  <span className="text-xs opacity-70 font-mono inline-block w-12">
                    {audioError
                      ? "Error"
                      : isPlaying
                        ? getRemainingTime()
                        : getTotalDuration()}
                  </span>
                </div>
              </div>

              {/* Audio element with proper source handling */}
              {message.content && !audioError && (
                <audio
                  ref={audioRef}
                  preload="metadata"
                  style={{ display: "none" }}
                >
                  <source src={message.content} type="audio/wav" />
                  <source src={message.content} type="audio/webm" />
                  <source src={message.content} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}

          {/* Message timestamp */}
          <div
            className={`text-xs text-gray-400 mt-1 ${isUser ? "text-right" : "text-left"}`}
          >
            {message.timestamp}
          </div>
        </div>

        {/* Column 3: Reply button (always present to maintain layout) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onReply}
          className={`w-8 h-8 bg-gray-800/90 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full shadow-lg border border-gray-600 transition-opacity duration-200 ${
            showReplyButton ? "opacity-100" : "opacity-0"
          }`}
        >
          <Reply className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
