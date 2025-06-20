"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubbleProps } from "@/types/chat";

export function MessageBubble({
  message,
  repliedMessage,
  onReply,
}: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showReplyButton, setShowReplyButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isUser = message.sender === "user";

  // Toggle audio playback state
  const handlePlayVoice = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Track audio progress and handle playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate remaining playback time for countdown
  const getRemainingTime = () => {
    const duration = message.duration || 5;
    const remaining = Math.max(0, duration - currentTime);
    return formatTime(remaining);
  };

  // Therapist profile avatar component
  const TherapistLogo = () => (
    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
      </div>
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
              className={`mb-2 p-2 rounded-lg bg-gray-600/50 border-l-2 ${
                isUser ? "border-blue-400" : "border-teal-400"
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
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-700 text-gray-100 rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          ) : (
            <div
              className={`p-3 rounded-lg flex items-center space-x-3 w-64 ${
                isUser
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-700 text-gray-100 rounded-bl-sm"
              }`}
            >
              {/* Play/pause button for voice messages */}
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayVoice}
                  className="w-8 h-8 p-0 hover:bg-white/10 rounded-full"
                >
                  {isPlaying ? (
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
                        isPlaying ? "animate-pulse" : ""
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
                    {isPlaying
                      ? getRemainingTime()
                      : formatTime(message.duration || 5)}
                  </span>
                </div>
              </div>

              <audio ref={audioRef} src={message.content} preload="metadata" />
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
