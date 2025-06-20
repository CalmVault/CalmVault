import type React from "react";
// Centralized type definitions for the chat application

export interface Message {
  id: string;
  type: "text" | "voice";
  content: string;
  timestamp: string;
  sender: "user" | "therapist";
  duration?: number;
  replyTo?: string;
}

export interface SessionItem {
  date: string;
  duration: string;
  topic: string;
}

export interface SessionData {
  id: string;
  feedback: string;
  verified: boolean;
  sessions: SessionItem[];
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
}

export interface ChatHeaderProps {
  onBack: () => void;
}

export interface ChatInterfaceProps {
  sessionData: SessionData;
  onBack: () => void;
}

export interface MessagesListProps {
  messages: Message[];
  onReply: (message: Message) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export interface MessageBubbleProps {
  message: Message;
  repliedMessage?: Message | null;
  onReply: () => void;
}

export interface SessionGridProps {
  onViewChat: (sessionData: SessionData) => void;
}

export interface SessionCardProps {
  session: SessionData;
  onViewMore: () => void;
}

export interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStartRecording: () => void;
}

export interface VoiceRecordingProps {
  recordingTime: number;
  setRecordingTime: (time: number) => void;
  onVoiceMessage: (audioUrl: string, duration: number) => void;
  onCancel: () => void;
}
