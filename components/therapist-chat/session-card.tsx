"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SessionCardProps, SessionItem } from "@/types/chat";

// Session card component with consistent height and proper button positioning
export function SessionCard({ session, onViewMore }: SessionCardProps) {
  return (
    <Card className="bg-[#3b3b3b] border-gray-400 p-6 flex flex-col h-[400px] hover:bg-gray-750 transition-colors duration-200">
      {/* Session header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium text-xl">
          Anonymous ID : {session.id}
        </h3>
        <span className="bg-[#5f5f5f] text-gray-300 px-2 py-1 text-xs rounded-xl">
          Messaging only
        </span>
      </div>

      {/* Feedback rating */}
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-gray-300 text-sm">
          Feedback: {session.feedback} - Verified
        </span>
      </div>

      {/* Session history - scrollable if content is too long */}
      <div className="flex-1 mb-4 min-h-0">
        <h4 className="text-gray-300 font-medium mb-2">
          Session History (Summary Only)
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {session.sessions.map((sessionItem: SessionItem, index: number) => (
            <div key={index} className="text-gray-400 text-sm">
              • {sessionItem.date} - {sessionItem.duration} -{" "}
              {sessionItem.topic}
            </div>
          ))}
        </div>

        {/* Last message preview */}
        <div className="mt-3 p-3 bg-[#5f5f5f] rounded-lg">
          <p className="text-gray-300 text-xs mb-1">Last message:</p>
          <p className="text-gray-300 text-sm line-clamp-2">
            &quot;{session.lastMessage}&quot;
          </p>
          <p className="text-gray-300 text-xs mt-2">
            {session.lastMessageTime}
          </p>
        </div>
      </div>

      {/* View More button - always at bottom */}
      <Button
        onClick={onViewMore}
        className="w-full bg-[#5f5f5f] hover:bg-[#757575] border border-[#EDEDEDB2] text-white mt-auto transition-colors duration-200 cursor-pointer"
      >
        View More
      </Button>
    </Card>
  );
}
