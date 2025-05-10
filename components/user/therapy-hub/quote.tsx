import React from 'react';
import { quotes } from '@/data/mock-data';

interface QuoteCardProps {
  id: number | string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  id
}) => {
  // Find the quote data by id from the imported data
  const quoteData = quotes.find(quote => quote.id === id);
  
  if (!quoteData) {
    return null; // Return nothing if quote not found
  }
  
  const { quote, author, authorDescription, gradientClass, gradientStyle } = quoteData;
  
  return (
    <div
      className={`rounded-xl p-6 text-white ${gradientClass}`}
      style={gradientStyle}
    >
      <blockquote className="text-xl font-medium mb-2">&ldquo;{quote}&rdquo;</blockquote>
      <cite className="text-right text-sm italic block">
        {author} ({authorDescription})
      </cite>
    </div>
  );
};

export default QuoteCard;