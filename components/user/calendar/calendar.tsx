import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
  eventDates?: number[]; // Optional array of dates that have events
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  onTodayClick,
  eventDates = [10, 15, 24, 27] // Default event dates
}) => {
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
    return eventDates.includes(day);
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(newDate);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-[#2a2a2a] rounded-3xl p-8">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onMonthChange('prev')}
          className="text-white hover:bg-white/10 h-10 w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-normal text-white">
          {getMonthName(currentDate)} {getYear(currentDate)}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onMonthChange('next')}
          className="text-teal-400 hover:bg-teal-400/10 h-10 w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-0 mb-4">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="aspect-auto p-1"
          >
            <button
              onClick={() => handleDateClick(day.date, day.isCurrentMonth)}
              disabled={!day.isCurrentMonth}
              className={`
                 h-full flex items-center justify-center text-lg py-4 px-5 rounded-full
                transition-all duration-200 relative
                ${
                  isDateSelected(day.date, day.isCurrentMonth)
                    ? 'bg-teal-500 text-white'
                    : isToday(day.date, day.isCurrentMonth)
                    ? 'bg-teal-500/20 text-white'
                    : day.isCurrentMonth && hasEvents(day.date, day.isCurrentMonth)
                    ? 'text-teal-400 hover:bg-teal-400/10'
                    : day.isCurrentMonth
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 cursor-not-allowed'
                }
              `}
            >
              <span className="relative">
                {day.date}
                {hasEvents(day.date, day.isCurrentMonth) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full" />
                )}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Time zone */}
      <div className="mt-8">
        <h3 className="text-white text-lg font-normal mb-2">Time zone</h3>
        <div className="text-gray-400 text-sm">
          Central European Time ({new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })})
        </div>
      </div>

      {/* Today button */}
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onTodayClick}
          className="bg-transparent border-teal-500 text-teal-500 hover:bg-teal-500/10 h-8 text-xs"
        >
          Today
        </Button>
      </div>
    </div>
  );
};

export default Calendar;