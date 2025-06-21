import { SessionCard } from "./session-card";
import { EmptySessionsState } from "./empty-sessions-state";
import type { SessionData, SessionGridProps } from "@/types/chat";

// Enhanced session data with proper typing
const sessionData: SessionData[] = [
  {
    id: "anon-001",
    feedback: "4.8 / 5.0",
    verified: true,
    sessions: [
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

// Main session grid component with conditional rendering
export function SessionGrid({ onViewChat }: SessionGridProps) {
  // For demo purposes, you can change this to [] to see the empty state
  const hasSessions = sessionData.length > 0;

  return (
    <div className="h-screen bg-[#272727] flex flex-col">
      {/* Header section - fixed at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-2">Therapy Sessions</h1>
        <p className="text-gray-400">
          {hasSessions
            ? "View and manage your anonymous therapy sessions"
            : "Your anonymous therapy sessions will appear here"}
        </p>
      </div>

      {/* Conditional content based on sessions availability */}
      {hasSessions ? (
        /* Scrollable content area with sessions */
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
      ) : (
        /* Empty state when no sessions exist */
        <EmptySessionsState />
      )}
    </div>
  );
}
