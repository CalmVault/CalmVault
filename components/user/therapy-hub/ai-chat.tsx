"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Reply, Check, CheckCheck, Mic, Square, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text?: string;
  voiceNote?: {
    url: string;
    duration: number;
  };
  sender: "user" | "ai";
  timestamp: string;
  replyTo?: string;
  status?: "sent" | "delivered" | "read";
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      setMessages([
        {
          id: "1",
          text: initialPrompt,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration counter
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const sendVoiceNote = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const newMessage: Message = {
        id: Date.now().toString(),
        voiceNote: {
          url: audioUrl,
          duration: recordingDuration,
        },
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        replyTo: replyingTo || undefined,
        status: "sent",
      };

      setMessages([...messages, newMessage]);
      setAudioBlob(null);
      setRecordingDuration(0);
      setReplyingTo(null);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I've received your voice message. How can I help you with what you shared?",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replyTo: replyingTo || undefined,
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setReplyingTo(null);

    // Update message status
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 1000);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const getAIResponse = () => {
    const responses = [
      "I understand that feeling. Would you like to explore what's behind it?",
      "That sounds challenging. How long have you been dealing with this?",
      "It's brave of you to acknowledge that. What do you think might help?",
      "I hear you. Sometimes these feelings can be overwhelming. What does it feel like in your body?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getReplyMessage = (replyId: string) => {
    return messages.find((msg) => msg.id === replyId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Chat Interface */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl text-white z-50 flex flex-col"
          >
            {/* Header - with gray background */}
            <div className="bg-[#4A4A4A] rounded-tl-[3em] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">CalmVault AI</h2>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Online</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages - dark background */}
            <ScrollArea
              className="flex-1 bg-[#1a1a1a] px-6 py-4"
              ref={scrollRef}
            >
              {/* Date separator */}
              <div className="text-center mb-4">
                <span className="text-xs text-gray-400">—— Today ——</span>
              </div>

              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`group flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {/* Avatar for AI */}
                    {message.sender === "ai" && (
                      <Avatar className="h-8 w-8 bg-teal-600 flex-shrink-0">
                        <AvatarImage src="/therapist.svg" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`flex items-center ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`max-w-[80%] ${message.sender === "user" ? "mr-2" : ""}`}
                      >
                        {/* Reply indicator */}
                        {message.replyTo && (
                          <div className="text-xs text-gray-400 mb-1 pl-2 border-l-2 border-gray-600">
                            {getReplyMessage(message.replyTo)?.text?.substring(
                              0,
                              30
                            ) || "Voice message"}
                            ...
                          </div>
                        )}

                        {/* Message bubble */}
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-[#00A6A6] text-white rounded-br-none"
                              : "bg-[#00a6a621] text-white rounded-bl-none"
                          }`}
                        >
                          {message.text && (
                            <p className="whitespace-pre-wrap break-words">
                              {message.text}
                            </p>
                          )}
                          {message.voiceNote && (
                            <div className="flex items-center gap-2">
                              <audio
                                src={message.voiceNote.url}
                                controls
                                className="max-w-[200px]"
                              />
                              <span className="text-xs">
                                {formatDuration(message.voiceNote.duration)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Timestamp and status */}
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs ${
                            message.sender === "user"
                              ? "justify-end text-teal-400"
                              : "text-gray-400"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.sender === "user" && (
                            <>
                              {message.status === "sent" && (
                                <Check className="h-3 w-3" />
                              )}
                              {message.status === "delivered" && (
                                <CheckCheck className="h-3 w-3" />
                              )}
                              {message.status === "read" && (
                                <CheckCheck className="h-3 w-3 text-teal-400" />
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Reply button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setReplyingTo(message.id)}
                        className="h-6 w-6 rounded-full bg-gray-800 ml-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
                      >
                        <Reply className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply indicator */}
            {replyingTo && (
              <div className="px-6 py-2 bg-[#1a1a1a] border-t border-gray-700 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Replying to:{" "}
                  {getReplyMessage(replyingTo)?.text?.substring(0, 30) ||
                    "Voice message"}
                  ...
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setReplyingTo(null)}
                  className="h-6 w-6 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Input area - with gray background */}
            <div className="bg-[#4A4A4A] rounded-bl-[3em] px-6 py-4">
              {isRecording ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white">
                      Recording... {formatDuration(recordingDuration)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={stopRecording}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Square className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : audioBlob ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <audio
                      src={URL.createObjectURL(audioBlob)}
                      controls
                      className="max-w-[250px]"
                    />
                    <span className="text-sm text-gray-300">
                      {formatDuration(recordingDuration)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAudioBlob(null)}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={sendVoiceNote}
                      className="text-teal-500 hover:text-teal-400 hover:bg-teal-500/10"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
<input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Your Message..."
                    className="flex-1 bg-transparent border-0 border-b border-gray-500 rounded-none text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-0 focus:outline-none h-auto py-2 transition-colors mb-[1em]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={startRecording}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
