"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VoiceRecordingProps } from "@/types/chat";

export function VoiceRecording({
  recordingTime,
  setRecordingTime,
  onVoiceMessage,
  onCancel,
}: VoiceRecordingProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side for window access
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Clean up all recording resources
  const cleanup = useCallback(() => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Initialize microphone and start recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Collect audio data chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();

      // Update timer every second with proper typing
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev: number) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone access denied:", error);
      onCancel();
    }
  }, [setRecordingTime, onCancel]);

  // Start recording when component mounts
  useEffect(() => {
    startRecording();
    return () => cleanup();
  }, [startRecording, cleanup]);

  // Stop recording and send audio message
  const sendRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      // Handle recording completion
      mediaRecorderRef.current.addEventListener(
        "stop",
        () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          onVoiceMessage(audioUrl, recordingTime);
        },
        { once: true }
      );

      mediaRecorderRef.current.stop();
    } else {
      onCancel();
    }
    cleanup();
  };

  // Cancel recording without sending
  const cancelRecording = () => {
    cleanup();
    onCancel();
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get responsive waveform count based on screen size
  const getWaveformCount = () => {
    if (!isClient) return 20; // Default for SSR
    return window.innerWidth < 640 ? 12 : 20;
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg gap-2 sm:gap-4">
      {/* Delete/cancel button - responsive sizing */}
      <Button
        variant="ghost"
        size="icon"
        onClick={cancelRecording}
        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Recording status and waveform - responsive layout */}
      <div className="flex items-center flex-1 justify-center min-w-0">
        {/* Mobile layout: stacked vertically */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
          {/* Recording indicator */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium text-sm sm:text-base">
              Recording
            </span>
          </div>

          {/* Animated waveform bars - responsive count and sizing */}
          <div className="flex items-center justify-center space-x-1 h-6 sm:h-8 flex-shrink-0">
            {[...Array(getWaveformCount())].map((_, i) => (
              <div
                key={i}
                className="w-0.5 sm:w-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 16 + 8}px`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: "0.5s",
                }}
              />
            ))}
          </div>

          {/* Recording duration - responsive text size */}
          <span className="text-white font-mono text-base sm:text-lg flex-shrink-0 min-w-[3rem] text-center">
            {formatTime(recordingTime)}
          </span>
        </div>
      </div>

      {/* Send recording button - responsive sizing */}
      <Button
        onClick={sendRecording}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Send</span>
        <span className="sm:hidden">→</span>
      </Button>
    </div>
  );
}
