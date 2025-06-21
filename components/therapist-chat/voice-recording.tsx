"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VoiceRecordingProps } from "@/types/chat";

// Type for WebKit AudioContext
interface WebKitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

// Custom hook for voice recording - completely rewritten for stability
function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingState, setRecordingState] = useState<
    "idle" | "starting" | "recording" | "stopping"
  >("idle");

  // Refs for audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isCleaningUpRef = useRef<boolean>(false);

  // Audio level monitoring with proper cleanup
  const monitorAudioLevel = useCallback(() => {
    if (!analyserRef.current || isCleaningUpRef.current) return;

    try {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate RMS (Root Mean Square) for better audio level detection
      const rms = Math.sqrt(
        dataArray.reduce((sum, value) => sum + value * value, 0) /
          dataArray.length
      );
      setAudioLevel(Math.min(rms / 128, 1)); // Normalize and cap at 1

      if (isRecording && !isCleaningUpRef.current) {
        animationRef.current = requestAnimationFrame(monitorAudioLevel);
      }
    } catch (error) {
      console.warn("Audio monitoring error:", error);
    }
  }, [isRecording]);

  // Complete cleanup function
  const cleanup = useCallback(() => {
    if (isCleaningUpRef.current) return;
    isCleaningUpRef.current = true;

    console.log("🧹 Cleaning up all recording resources...");

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Stop MediaRecorder properly
    if (mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      } catch (error) {
        console.warn("MediaRecorder stop error:", error);
      }
      mediaRecorderRef.current = null;
    }

    // Close AudioContext properly
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== "closed") {
          audioContextRef.current.close();
        }
      } catch (error) {
        console.warn("AudioContext close error:", error);
      }
      audioContextRef.current = null;
    }

    // Stop all media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
          console.log("🔇 Stopped track:", track.kind, track.label);
        } catch (error) {
          console.warn("Track stop error:", error);
        }
      });
      streamRef.current = null;
    }

    // Clear refs
    analyserRef.current = null;
    chunksRef.current = [];
    startTimeRef.current = 0;

    // Reset state
    setIsRecording(false);
    setRecordingTime(0);
    setAudioLevel(0);
    setRecordingState("idle");

    isCleaningUpRef.current = false;
  }, []);

  // Start recording with proper error handling
  const startRecording = useCallback(async (): Promise<boolean> => {
    if (isCleaningUpRef.current || isRecording) {
      console.warn("Recording already in progress or cleaning up");
      return false;
    }

    try {
      setRecordingState("starting");
      console.log("🎤 Initializing voice recording...");

      // Clean up any existing resources first
      cleanup();

      // Request microphone with specific constraints to prevent echo
      const constraints: MediaStreamConstraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      console.log("✅ Microphone access granted");

      // Set up AudioContext for monitoring (separate from recording)
      const AudioContextClass =
        window.AudioContext || (window as WebKitWindow).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();

        // Wait for context to be ready
        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume();
        }

        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();

        // Configure analyser for better performance
        analyserRef.current.fftSize = 512;
        analyserRef.current.smoothingTimeConstant = 0.8;

        source.connect(analyserRef.current);
        console.log("✅ Audio analysis setup complete");
      }

      // Determine best supported MIME type
      const supportedTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4;codecs=mp4a.40.2",
        "audio/mp4",
        "audio/ogg;codecs=opus",
        "audio/wav",
      ];

      let selectedMimeType = "";
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedMimeType = type;
          console.log("📊 Selected audio format:", type);
          break;
        }
      }

      // Create MediaRecorder with optimal settings
      const options: MediaRecorderOptions = {
        mimeType: selectedMimeType || undefined,
        audioBitsPerSecond: 128000,
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Set up MediaRecorder event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log("📦 Audio chunk:", event.data.size, "bytes");
        }
      };

      mediaRecorder.onstart = () => {
        console.log("🎙️ Recording started");
        setIsRecording(true);
        setRecordingState("recording");
        setRecordingTime(0);
        startTimeRef.current = Date.now();

        // Start precise timer
        timerRef.current = setInterval(() => {
          if (!isCleaningUpRef.current) {
            const elapsed = Math.floor(
              (Date.now() - startTimeRef.current) / 1000
            );
            setRecordingTime(elapsed);
          }
        }, 1000);

        // Start audio monitoring
        monitorAudioLevel();
      };

      mediaRecorder.onstop = () => {
        console.log("⏹️ Recording stopped");
        setIsRecording(false);
        setRecordingState("idle");
      };

      mediaRecorder.onerror = (event) => {
        console.error("❌ MediaRecorder error:", event);
        cleanup();
        setRecordingState("idle");
      };

      // Start recording with data collection every 1000ms
      mediaRecorder.start(1000);

      return true;
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
      cleanup();
      setRecordingState("idle");
      return false;
    }
  }, [isRecording, cleanup, monitorAudioLevel]);

  // Stop recording with proper blob creation
  const stopRecording = useCallback((): Promise<{
    audioUrl: string;
    duration: number;
  } | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || !isRecording) {
        console.warn("⚠️ No active recording to stop");
        resolve(null);
        return;
      }

      setRecordingState("stopping");
      console.log("⏹️ Stopping recording...");

      const finalDuration = Math.max(
        1,
        Math.floor((Date.now() - startTimeRef.current) / 1000)
      );

      // Handle stop event
      const handleStop = () => {
        console.log("📦 Processing audio data...");

        if (chunksRef.current.length === 0) {
          console.warn("⚠️ No audio chunks recorded");
          cleanup();
          resolve(null);
          return;
        }

        try {
          // Create blob with proper MIME type
          const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
          const audioBlob = new Blob(chunksRef.current, { type: mimeType });

          if (audioBlob.size === 0) {
            console.warn("⚠️ Empty audio blob");
            cleanup();
            resolve(null);
            return;
          }

          // Create object URL
          const audioUrl = URL.createObjectURL(audioBlob);

          console.log("✅ Audio processed successfully:", {
            size: audioBlob.size,
            duration: finalDuration,
            type: mimeType,
            chunks: chunksRef.current.length,
          });

          resolve({
            audioUrl,
            duration: finalDuration,
          });

          // Clean up after successful processing
          setTimeout(cleanup, 100);
        } catch (error) {
          console.error("❌ Error processing audio:", error);
          cleanup();
          resolve(null);
        }
      };

      // Set up one-time stop event listener
      mediaRecorderRef.current.addEventListener("stop", handleStop, {
        once: true,
      });

      // Stop the recording
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error("❌ Error stopping MediaRecorder:", error);
        cleanup();
        resolve(null);
      }
    });
  }, [isRecording, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isRecording,
    recordingTime,
    audioLevel,
    recordingState,
    startRecording,
    stopRecording,
    cleanup,
  };
}

export function VoiceRecording({
  onVoiceMessage,
  onCancel,
}: VoiceRecordingProps) {
  const {
    recordingTime,
    audioLevel,
    recordingState,
    startRecording,
    stopRecording,
    cleanup,
  } = useVoiceRecording();

  const [isClient, setIsClient] = useState(false);
  const hasStartedRef = useRef(false);

  // Initialize component and start recording
  useEffect(() => {
    setIsClient(true);

    // Prevent multiple starts
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      const initRecording = async () => {
        const success = await startRecording();
        if (!success) {
          console.error("Failed to initialize recording");
          onCancel();
        }
      };
      initRecording();
    }
  }, [startRecording, onCancel]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle send recording
  const handleSend = async () => {
    console.log("📤 Sending recording...");
    try {
      const result = await stopRecording();
      if (result) {
        onVoiceMessage(result.audioUrl, result.duration);
      } else {
        console.warn("⚠️ No recording data to send");
        onCancel();
      }
    } catch (error) {
      console.error("❌ Error sending recording:", error);
      onCancel();
    }
  };

  // Handle cancel recording
  const handleCancel = () => {
    console.log("❌ Cancelling recording...");
    cleanup();
    onCancel();
  };

  // Get status text
  const getStatusText = () => {
    switch (recordingState) {
      case "starting":
        return "Starting...";
      case "recording":
        return "Recording";
      case "stopping":
        return "Processing...";
      default:
        return "Ready";
    }
  };

  // Get responsive waveform count
  const getWaveformCount = () => {
    if (!isClient) return 12;
    return window.innerWidth < 640 ? 8 : 12;
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg gap-2 sm:gap-4">
      {/* Cancel button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCancel}
        disabled={recordingState === "stopping"}
        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Recording visualization */}
      <div className="flex items-center flex-1 justify-center min-w-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
          {/* Status indicator */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                recordingState === "recording"
                  ? "bg-red-500 animate-pulse"
                  : recordingState === "starting"
                    ? "bg-yellow-500 animate-pulse"
                    : "bg-gray-500"
              }`}
            />
            <span
              className={`font-medium text-sm sm:text-base ${
                recordingState === "recording"
                  ? "text-red-400"
                  : recordingState === "starting"
                    ? "text-yellow-400"
                    : "text-gray-400"
              }`}
            >
              {getStatusText()}
            </span>
          </div>

          {/* Audio level visualization */}
          <div className="flex items-center justify-center space-x-1 h-6 sm:h-8 flex-shrink-0">
            {[...Array(getWaveformCount())].map((_, i) => {
              // Create more natural waveform based on actual audio level
              const baseHeight = 8;
              const maxHeight = 24;
              const audioHeight =
                recordingState === "recording" ? audioLevel * maxHeight : 0;
              const randomVariation = Math.sin(Date.now() / 200 + i * 0.5) * 3;
              const height = Math.max(
                baseHeight,
                audioHeight + randomVariation
              );

              return (
                <div
                  key={i}
                  className={`w-0.5 sm:w-1 rounded-full transition-all duration-200 ${
                    recordingState === "recording"
                      ? "bg-red-400"
                      : "bg-blue-400"
                  }`}
                  style={{
                    height: `${height}px`,
                    opacity:
                      recordingState === "recording"
                        ? 0.8 + audioLevel * 0.2
                        : 0.4,
                  }}
                />
              );
            })}
          </div>

          {/* Timer */}
          <span className="text-white font-mono text-base sm:text-lg flex-shrink-0 min-w-[3rem] text-center">
            {formatTime(recordingTime)}
          </span>
        </div>
      </div>

      {/* Send button */}
      <Button
        onClick={handleSend}
        disabled={recordingState !== "recording" || recordingTime < 1}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Send</span>
        <span className="sm:hidden">→</span>
      </Button>
    </div>
  );
}
