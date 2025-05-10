"use client";
import React, { useState } from "react";
import Header from "../../header";
import TherapySessionSidebar from "./alert-sidebar";
import TherapistCard from "./therapist-card";
import JournalCard from "./journal-card";
import QuoteCard from "./quote";
import ChatPrompt from "./chat-prompt";
import ChatInterface from "./ai-chat";
import TherapistProfile from "./therapist-profile";
import {
  chatPrompts,
  therapists,
  journalEntries,
} from "@/data/mock-data";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  hasViewAll?: boolean;
  onViewAllClick?: () => void | null;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  hasViewAll = false,
  onViewAllClick = null,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-xl font-bold">{title}</h2>
      {hasViewAll && (
        <Button
          variant="link"
          className="text-white p-0 h-auto text-sm"
          onClick={onViewAllClick || undefined}
        >
          See all
        </Button>
      )}
    </div>
  );
};

const TherapyHub = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPromptText, setChatPromptText] = useState("");
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleStartSession = () => {
    console.log("Starting therapy session - opening chat");
    setIsChatOpen(true);
    setChatPromptText("What emotion are you avoiding today?");
  };

  const handleCloseChat = () => {
    console.log("Closing chat");
    setIsChatOpen(false);
  };

  const handleTherapistClick = (therapistId: string | number) => {
    console.log(`Selected therapist ID: ${therapistId}`);
    setSelectedTherapistId(String(therapistId));
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedTherapistId(null);
  };

  const handleJournalClick = (journalId: string | number) => {
    console.log(`Selected journal entry ID: ${journalId}`);
    // Add your journal entry navigation logic here
  };

  const handleViewAllTherapists = () => {
    console.log("View all therapists clicked");
    // Add navigation to therapists page
  };

  const handleViewAllJournals = () => {
    console.log("View all journal entries clicked");
    // Add navigation to journal entries page
  };

  const handleChatPromptClick = (promptId: string | number) => {
    console.log(`Selected chat prompt ID: ${promptId}`);
    const prompt = chatPrompts.find(p => p.id === promptId);
    if (prompt) {
      setChatPromptText(prompt.question);
      setIsChatOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-sidebar-bg">
      {/* Main content with sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - takes up 2/3 on medium+ screens */}
          <div className="md:col-span-2 space-y-8">
            <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
              <Header title="Therapy Hub" />
            </div>
            <QuoteCard id={1} />

            {/* Chat with CalmVault AI section */}
            <div>
              <SectionHeader title="Chat with CalmVault AI" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {chatPrompts.slice(0, 3).map((prompt) => (
                  <ChatPrompt
                    key={prompt.id}
                    id={prompt.id}
                    onClick={handleChatPromptClick}
                  />
                ))}
              </div>
            </div>

            {/* Recommended Therapists section */}
            <div>
              <SectionHeader
                title="Recommended Therapists"
                hasViewAll={true}
                onViewAllClick={handleViewAllTherapists}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {therapists.slice(0, 4).map((therapist) => (
                  <TherapistCard
                    key={therapist.id}
                    id={therapist.id}
                    onClick={handleTherapistClick}
                  />
                ))}
              </div>
            </div>

            {/* Bottom quote */}
            <QuoteCard id={2} />

            {/* Calm Vault Journal section */}
            <div>
              <SectionHeader
                title="Calm Vault Journal"
                hasViewAll={true}
                onViewAllClick={handleViewAllJournals}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {journalEntries.slice(0, 2).map((entry) => (
                  <JournalCard
                    key={entry.id}
                    id={entry.id}
                    onClick={handleJournalClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Always visible on the right */}
          <div className="hidden md:block">
            <TherapySessionSidebar onStartSession={handleStartSession} />
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialPrompt={chatPromptText}
      />

      {/* Therapist Profile */}
      <TherapistProfile
        therapistId={selectedTherapistId}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default TherapyHub;