import React from 'react';
import { journalEntries } from '@/data/mock-data';
import Image from 'next/image';

interface JournalCardProps {
  id: number | string;
  onClick?: (id: number | string) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({
  id,
  onClick = null
}) => {
  // Find the journal entry data by id from the imported data
  const entryData = journalEntries.find(entry => entry.id === id);
  
  if (!entryData) {
    return null; // Return nothing if entry not found
  }
  
  const { title, imageUrl } = entryData;
  
  return (
    <div
      className="relative h-48 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
      onClick={() => {
        if (onClick) {
          onClick(id);
        }
      }}
    >
      {/* Using Next.js Image component */}
      <Image
        src={imageUrl}
        fill
        style={{ objectFit: 'cover' }}
        alt={title}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      
      {/* Title text */}
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default JournalCard;