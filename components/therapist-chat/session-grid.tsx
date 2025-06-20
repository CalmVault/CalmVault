"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
  SessionData,
  SessionGridProps,
  SessionCardProps,
  SessionItem,
} from "@/types/chat";

// Enhanced session data with proper typing
const sessionData: SessionData[] = [
  {
    id: "anon-001",
    feedback: "4.8 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-04-09", duration: "50 mins", topic: "Stress Management" },
      { date: "2025-04-16", duration: "45 mins", topic: "Anxiety Check-in" },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "So from what you are saying you do not have hope?",
        timestamp: "Today",
        sender: "therapist",
      },
      {
        id: "2",
        type: "text",
        content:
          "So from what you are saying you do not have hope. I think that your bad attitude might just be the problem in all of this.",
        timestamp: "2:45 PM",
        sender: "therapist",
      },
      {
        id: "3",
        type: "text",
        content: "You are talking a lot on and 4 months sense",
        timestamp: "2:46 PM",
        sender: "user",
      },
      {
        id: "4",
        type: "text",
        content:
          "I would definitely say a couple if I follow this format you just gave to me",
        timestamp: "2:47 PM",
        sender: "user",
      },
    ],
    lastMessage:
      "I would definitely say a couple if I follow this format you just gave to me",
    lastMessageTime: "2:47 PM",
  },
  {
    id: "anon-002",
    feedback: "4.9 / 5.0",
    verified: true,
    sessions: [
      {
        date: "2025-04-07",
        duration: "60 mins",
        topic: "Relationship Support",
      },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "How are you feeling about your relationship today?",
        timestamp: "Yesterday",
        sender: "therapist",
      },
      {
        id: "2",
        type: "text",
        content: "I think we're making progress, but it's still challenging",
        timestamp: "3:20 PM",
        sender: "user",
      },
    ],
    lastMessage: "I think we're making progress, but it's still challenging",
    lastMessageTime: "3:20 PM",
  },
  {
    id: "anon-003",
    feedback: "4.7 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-04-05", duration: "50 mins", topic: "LGBTQ+ Affirming" },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "Thank you for creating such a safe space for me",
        timestamp: "2 days ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content: "You're very welcome. That's exactly what we aim for here.",
        timestamp: "1:15 PM",
        sender: "therapist",
      },
    ],
    lastMessage: "You're very welcome. That's exactly what we aim for here.",
    lastMessageTime: "1:15 PM",
  },
  {
    id: "anon-004",
    feedback: "4.9 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-04-03", duration: "50 mins", topic: "Addiction Recovery" },
      { date: "2025-04-10", duration: "45 mins", topic: "Trauma" },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "I've been clean for 30 days now",
        timestamp: "3 days ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content: "That's incredible progress! How are you feeling?",
        timestamp: "4:30 PM",
        sender: "therapist",
      },
    ],
    lastMessage: "That's incredible progress! How are you feeling?",
    lastMessageTime: "4:30 PM",
  },
  {
    id: "anon-005",
    feedback: "4.8 / 5.0",
    verified: true,
    sessions: [
      {
        date: "2025-04-02",
        duration: "50 mins",
        topic: "Grief and Loss Support",
      },
      { date: "2025-04-09", duration: "45 mins", topic: "Coping Strategies" },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "The grief comes in waves, but I'm learning to cope",
        timestamp: "4 days ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content: "That's a very healthy way to describe it. Waves do pass.",
        timestamp: "2:10 PM",
        sender: "therapist",
      },
    ],
    lastMessage: "That's a very healthy way to describe it. Waves do pass.",
    lastMessageTime: "2:10 PM",
  },
  {
    id: "anon-006",
    feedback: "4.9 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-04-01", duration: "50 mins", topic: "Counseling" },
      {
        date: "2025-04-08",
        duration: "45 mins",
        topic: "Mental Health Check-in",
      },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "I feel like I'm finally understanding myself better",
        timestamp: "5 days ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content: "Self-awareness is the first step to growth. Well done!",
        timestamp: "11:45 AM",
        sender: "therapist",
      },
    ],
    lastMessage: "Self-awareness is the first step to growth. Well done!",
    lastMessageTime: "11:45 AM",
  },
  // Additional sessions for scrolling demonstration
  {
    id: "anon-007",
    feedback: "4.6 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-03-28", duration: "45 mins", topic: "Career Guidance" },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "I'm feeling lost about my career direction",
        timestamp: "1 week ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content: "Let's explore what truly motivates you professionally",
        timestamp: "10:30 AM",
        sender: "therapist",
      },
    ],
    lastMessage: "Let's explore what truly motivates you professionally",
    lastMessageTime: "10:30 AM",
  },
  {
    id: "anon-008",
    feedback: "4.9 / 5.0",
    verified: true,
    sessions: [
      { date: "2025-03-25", duration: "55 mins", topic: "Family Therapy" },
      {
        date: "2025-04-01",
        duration: "50 mins",
        topic: "Communication Skills",
      },
    ],
    messages: [
      {
        id: "1",
        type: "text",
        content: "My family dynamics are really challenging right now",
        timestamp: "1 week ago",
        sender: "user",
      },
      {
        id: "2",
        type: "text",
        content:
          "Family relationships can be complex. Let's work through this together.",
        timestamp: "3:45 PM",
        sender: "therapist",
      },
    ],
    lastMessage:
      "Family relationships can be complex. Let's work through this together.",
    lastMessageTime: "3:45 PM",
  },
];

// Session grid with vertical scrolling capability
export function SessionGrid({ onViewChat }: SessionGridProps) {
  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header section - fixed at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-2">Therapy Sessions</h1>
        <p className="text-gray-400">
          View and manage your anonymous therapy sessions
        </p>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessionData.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewMore={() => onViewChat(session)}
              />
            ))}
          </div>

          {/* Bottom spacing for better scrolling experience */}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}

// Session card with consistent height and proper button positioning
function SessionCard({ session, onViewMore }: SessionCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-6 flex flex-col h-[400px] hover:bg-gray-750 transition-colors duration-200">
      {/* Session header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Anonymous ID : {session.id}</h3>
        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
          Messaging only
        </span>
      </div>

      {/* Feedback rating */}
      <div className="flex items-center space-x-2 mb-4">
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
        <div className="mt-3 p-3 bg-gray-700/50 rounded">
          <p className="text-gray-400 text-xs mb-1">Last message:</p>
          <p className="text-gray-300 text-sm line-clamp-2">
            &quot;{session.lastMessage}&quot;
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {session.lastMessageTime}
          </p>
        </div>
      </div>

      {/* View More button - always at bottom */}
      <Button
        onClick={onViewMore}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white mt-auto transition-colors duration-200"
      >
        View More
      </Button>
    </Card>
  );
}
