"use client";

import type React from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageInputProps } from "@/types/chat";

export function MessageInput({
  value,
  onChange,
  onSend,
  onStartRecording,
}: MessageInputProps) {
  // Send message when Enter is pressed (without Shift)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Text input with voice button - responsive sizing */}
      <div className="flex-1 relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Your Message"
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10 sm:pr-12 rounded-full text-sm sm:text-base py-2 sm:py-3"
        />

        {/* Voice recording button inside input - responsive positioning */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onStartRecording}
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white w-8 h-8 sm:w-10 sm:h-10"
        >
          <Mic className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>

      {/* Send message button - responsive sizing */}
      <Button
        onClick={onSend}
        disabled={!value.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 flex-shrink-0"
      >
        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
}
