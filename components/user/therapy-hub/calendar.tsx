'use client';
import React, { useState } from 'react';
import Header from '../../header';
import TherapySessionSidebar from './alert-sidebar';
import ChatInterface from './ai-chat'; // Using ChatInterface like in TherapyHub
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import { bookedEvents} from '@/data/mock-data';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState(bookedEvents);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPromptText, setChatPromptText] = useState('');

  // Get calendar data
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const calendarDays = [];
    
    // Monday = 1, Sunday = 0 needs to be Sunday = 6
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Previous month's days
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthDate);
    
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    // Next month's days
    const totalCells = calendarDays.length;
    const cellsToFill = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    
    for (let i = 1; i <= cellsToFill; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    return calendarDays;
  };

  // Check if a date is selected
  const isDateSelected = (day: number, isCurrentMonth: boolean) => {
    if (!selectedDate || !isCurrentMonth) return false;
    
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // Check if date has events
  const hasEvents = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    
    // For demo purposes, let's mark some dates as having events
    const eventDates = [10, 15, 24, 27]; // Mock event dates
    return eventDates.includes(day);
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Match the pattern from TherapyHub
  const handleStartSession = () => {
    console.log("Starting therapy session - opening chat");
    setIsChatOpen(true);
    // You can customize this initial prompt based on the calendar context
    setChatPromptText("Let's talk about how you're feeling today. What's on your mind?");
  };

  const handleCloseChat = () => {
    console.log("Closing chat");
    setIsChatOpen(false);
  };

  const handleCancelEvent = (eventId: string) => {
    console.log('Cancel event:', eventId);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= rating ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
          }`}
        />
      );
    }
    return stars;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - takes up 2/3 on medium+ screens */}
          <div className="md:col-span-2 space-y-6">
            <div className="pt-[3.5em] sticky top-0 z-40 ">
              <Header title="Calendar" />
            </div>

            {/* Calendar Card */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevMonth}
                  className="text-white hover:bg-white/10 h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium text-white">
                  {getMonthName(currentDate)} {getYear(currentDate)}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  className="text-white hover:bg-white/10 h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-400 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day.date, day.isCurrentMonth)}
                    disabled={!day.isCurrentMonth}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                      transition-all duration-200 relative p-1
                      ${
                        isDateSelected(day.date, day.isCurrentMonth)
                          ? 'bg-teal-600 text-white'
                          : isToday(day.date, day.isCurrentMonth)
                          ? 'bg-teal-600/20 text-teal-400 font-bold'
                          : day.isCurrentMonth
                          ? 'text-white hover:bg-white/10'
                          : 'text-gray-600 cursor-not-allowed'
                      }
                    `}
                  >
                    {day.date}
                    {hasEvents(day.date, day.isCurrentMonth) && (
                      <div className="absolute bottom-0.5 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Timezone and selected date info */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="w-3 h-3" />
                  <span className="text-xs">
                    Central European Time ({new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })})
                  </span>
                </div>
                {selectedDate && (
                  <div className="text-xs text-gray-400">
                    Selected: {selectedDate.toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                )}
              </div>

              {/* Today button */}
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    setCurrentDate(today);
                    setSelectedDate(today);
                  }}
                  className="bg-transparent border-teal-500 text-teal-500 hover:bg-teal-500/10 h-8 text-xs"
                >
                  Today
                </Button>
              </div>
            </div>

            {/* Booked Events */}
            <div>
              <h2 className="text-lg font-medium text-white mb-3">
                Booked Events {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
              </h2>
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#1a1a1a] rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={event.imageUrl}
                          alt={event.therapistName}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{event.therapistName}</h3>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {renderStars(event.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-white font-medium text-sm">{event.price}</p>
                        <p className="text-gray-400 text-xs">{event.time}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-red-500 text-red-500 hover:bg-red-500/10 h-8 text-xs"
                        onClick={() => handleCancelEvent(event.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Using onStartSession like in TherapyHub */}
          <div className="hidden md:block">
            <TherapySessionSidebar onStartSession={handleStartSession} />
          </div>
        </div>
      </div>

      {/* Chat Interface - Using the same component as TherapyHub */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialPrompt={chatPromptText}
      />
    </div>
  );
};

export default CalendarPage;