import React from 'react';
import { chatPrompts } from '@/data/mock-data';

interface ChatPromptProps {
  id: number | string;
  onClick?: (id: number | string) => void;
}

const ChatPrompt: React.FC<ChatPromptProps> = ({
  id,
  onClick = null
}) => {
  // Find the prompt data by id from the imported data
  const promptData = chatPrompts.find(prompt => prompt.id === id);
  
  if (!promptData) {
    return null; // Return nothing if prompt not found
  }
  
  const { question, bgColor, bgStyle } = promptData;
  
  return (
    <div
      className={`rounded-xl p-4 text-white text-center cursor-pointer transition-transform hover:scale-105 w-full h-full min-h-[100px] flex items-center justify-center ${bgColor}`}
      style={bgStyle}
      onClick={() => {
        if (onClick) {
          onClick(id);
        }
      }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (onClick) {
            onClick(id);
          }
        }
      }}
    >
      <p className="text-lg font-medium break-words">&ldquo;{question}&rdquo;</p>
    </div>
  );
};

export default ChatPrompt;