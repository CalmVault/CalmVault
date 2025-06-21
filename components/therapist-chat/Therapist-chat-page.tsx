"use client";

import { useState } from "react";
import { SessionGrid } from "@/components/therapist-chat/session-grid";
import { ChatInterface } from "@/components/therapist-chat/chat-interface";
import type { SessionData } from "@/types/chat";

// Main page component that handles the view state
export default function TherapistChatPage() {
  // State to manage which view is currently active
  const [currentView, setCurrentView] = useState<"grid" | "chat">("grid");
  // State to store the selected session data
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null
  );

  // Function to handle viewing a specific chat session
  const handleViewChat = (sessionData: SessionData) => {
    setSelectedSession(sessionData);
    setCurrentView("chat");
  };

  // Function to go back to the session grid
  const handleBackToGrid = () => {
    setCurrentView("grid");
    setSelectedSession(null);
  };

  return (
    <div className="h-screen">
      {/* Conditional rendering based on current view */}
      {currentView === "grid" ? (
        <SessionGrid onViewChat={handleViewChat} />
      ) : (
        selectedSession && (
          <ChatInterface
            sessionData={selectedSession}
            onBack={handleBackToGrid}
          />
        )
      )}
    </div>
  );
}
