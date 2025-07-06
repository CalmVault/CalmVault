"use client";

import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./chat-header";
import { MessagesList } from "./messages-list";
import { MessageInput } from "./message-input";
import { VoiceRecording } from "./voice-recording";
import type { Message, ChatInterfaceProps } from "@/types/chat";

export function ChatInterface({ sessionData, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    sessionData?.messages || []
  );
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send text message and clear input
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        type: "text",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "user",
        replyTo: replyingTo?.id,
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setReplyingTo(null);
    }
  };

  // Add voice message to chat and reset recording state
  const handleVoiceMessage = (audioUrl: string, duration: number) => {
    console.log("💬 Adding voice message:", {
      duration,
      audioUrl: audioUrl.substring(0, 50) + "...",
    });

    const voiceMessage: Message = {
      id: Date.now().toString(),
      type: "voice",
      content: audioUrl,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
      duration,
      replyTo: replyingTo?.id,
    };

    setMessages((prev) => [...prev, voiceMessage]);
    setReplyingTo(null);
    setIsRecording(false);
  };

  // Set message to reply to
  const handleReplyToMessage = (message: Message) => {
    setReplyingTo(message);
  };

  // Cancel voice recording
  const handleCancelRecording = () => {
    console.log("❌ Voice recording cancelled");
    setIsRecording(false);
  };

  // Start recording
  const handleStartRecording = () => {
    console.log("🎤 Starting voice recording");
    setIsRecording(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[#2a2a2a]">
      {/* Fixed header section */}
      <div className="flex-shrink-0">
        <ChatHeader onBack={onBack} />
      </div>

      {/* Scrollable messages area */}
      <div className="flex-1 min-h-0 flex flex-col">
        <MessagesList
          messages={messages}
          onReply={handleReplyToMessage}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Reply preview bar */}
      {replyingTo && (
        <div className="flex-shrink-0 px-3 sm:px-4 py-2 bg-[#1b5858] border-t border-gray-700">
          <div className="flex items-center justify-between bg-[#272727] rounded p-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">
                Replying to{" "}
                {replyingTo.sender === "therapist" ? "Amazing Listener" : "You"}
              </p>
              <p className="text-sm text-gray-200 truncate ">
                {replyingTo.type === "voice"
                  ? "🎵 Voice message"
                  : replyingTo.content}
              </p>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-gray-400 hover:text-white ml-2 flex-shrink-0 w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input section */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-100 ">
        {isRecording ? (
          <VoiceRecording
            onVoiceMessage={handleVoiceMessage}
            onCancel={handleCancelRecording}
          />
        ) : (
          <MessageInput
            value={newMessage}
            onChange={setNewMessage}
            onSend={handleSendMessage}
            onStartRecording={handleStartRecording}
          />
        )}
      </div>
    </div>
  );
}
