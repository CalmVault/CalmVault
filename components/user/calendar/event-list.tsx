import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Event {
  id: string;
  therapistName: string;
  imageUrl: string;
  rating: number;
  price: string;
  time: string;
}

interface EventsListProps {
  events: Event[];
  selectedDate: Date | null;
  onCancelEvent: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, selectedDate, onCancelEvent }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
        }`}
      />
    ));
  };

  const formatDateDisplay = () => {
    if (!selectedDate) return '';
    return `for ${selectedDate.toLocaleDateString()}`;
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-white mb-3">
        Booked Events {formatDateDisplay()}
      </h2>
      <div className="space-y-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onCancel={() => onCancelEvent(event.id)}
            renderStars={renderStars}
          />
        ))}
      </div>
    </div>
  );
};

interface EventCardProps {
  event: Event;
  onCancel: () => void;
  renderStars: (rating: number) => React.ReactNode;
}

const EventCard: React.FC<EventCardProps> = ({ event, onCancel, renderStars }) => (
  <div className="bg-[#1a1a1a] rounded-xl p-8 flex items-center justify-between">
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
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  </div>
);

export default EventsList;