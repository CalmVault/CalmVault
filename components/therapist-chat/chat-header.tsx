"use client";

import { ArrowLeft, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatHeaderProps } from "@/types/chat";

// Chat header component - sessionData removed as it wasn't being used
export function ChatHeader({ onBack }: ChatHeaderProps) {
  // Therapist profile logo component
  const TherapistLogo = () => (
    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
      {/* Left section: back button and therapist info */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Therapist profile section */}
        <div className="flex items-center space-x-3">
          <TherapistLogo />
          <div>
            <h2 className="text-white font-medium">Amazing Listener</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right section: action buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Phone className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
