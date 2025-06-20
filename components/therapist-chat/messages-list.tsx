"use client";

import type React from "react";
import { MessageBubble } from "./message-bubble";

interface Message {
  id: string;
  type: "text" | "voice";
  content: string;
  timestamp: string;
  sender: "user" | "therapist";
  duration?: number;
  replyTo?: string;
}

interface MessagesListProps {
  messages: Message[];
  onReply: (message: Message) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessagesList({
  messages,
  onReply,
  messagesEndRef,
}: MessagesListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Container with padding to accommodate reply buttons */}
      <div className="px-4 py-4 space-y-2">
        {messages.map((message) => {
          // Find the message being replied to (if any)
          const repliedMessage = message.replyTo
            ? messages.find((m) => m.id === message.replyTo)
            : null;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              repliedMessage={repliedMessage}
              onReply={() => onReply(message)}
            />
          );
        })}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} className="h-1" />
      </div>
    </div>
  );
}
