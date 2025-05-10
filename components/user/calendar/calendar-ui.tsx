'use client';
import React, { useState } from 'react';
import Header from '../../header';
import TherapySessionSidebar from '../therapy-hub/alert-sidebar';
import ChatInterface from '../therapy-hub/ai-chat';
import Calendar from './calendar';
import EventsList from './event-list';
import { bookedEvents } from '@/data/mock-data';

// Custom hooks to separate logic
const useCalendarState = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    const modifier = direction === 'prev' ? -1 : 1;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + modifier));
  };

  const selectToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return {
    selectedDate,
    currentDate,
    setSelectedDate,
    navigateMonth,
    selectToday
  };
};

const useChatState = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPromptText, setChatPromptText] = useState('');

  const openChat = (promptText: string = "Let's talk about how you're feeling today. What's on your mind?") => {
    console.log("Starting therapy session - opening chat");
    setChatPromptText(promptText);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    console.log("Closing chat");
    setIsChatOpen(false);
  };

  return {
    isChatOpen,
    chatPromptText,
    openChat,
    closeChat
  };
};

const CalendarPage = () => {
  const [events] = useState(bookedEvents);
  const { selectedDate, currentDate, setSelectedDate, navigateMonth, selectToday } = useCalendarState();
  const { isChatOpen, chatPromptText, openChat, closeChat } = useChatState();

  const handleCancelEvent = (eventId: string) => {
    console.log('Cancel event:', eventId);
    // Add actual cancel logic here
  };

  // Extract event dates from actual events
  const getEventDates = () => {
    // This could be made more sophisticated to extract dates from actual events
    return [10, 15, 24, 27];
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - takes up 2/3 on medium+ screens */}
          <div className="md:col-span-2 space-y-6">
            <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
              <Header title="Calendar" />
            </div>

            {/* Calendar Component */}
            <Calendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onMonthChange={navigateMonth}
              onTodayClick={selectToday}
              eventDates={getEventDates()}
            />

            {/* Events List */}
            <EventsList
              events={events}
              selectedDate={selectedDate}
              onCancelEvent={handleCancelEvent}
            />
          </div>

          {/* Sidebar */}
          <div className="hidden md:block">
            <TherapySessionSidebar onStartSession={() => openChat()} />
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={closeChat}
        initialPrompt={chatPromptText}
      />
    </div>
  );
};

export default CalendarPage;