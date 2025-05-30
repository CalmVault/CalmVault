import React from "react";
import { therapists } from "@/data/mock-data";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TherapistCardProps {
  id: number | string;
  onClick?: (id: number | string) => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({
  id,
  onClick = null,
}) => {
  // Find the therapist data by id from the imported data
  const therapistData = therapists.find((therapist) => therapist.id === id);

  if (!therapistData) {
    return null; // Return nothing if therapist not found
  }

  const { name, rating, imageUrl } = therapistData;

  // Generate star rating display (filled and empty stars)
  const renderStars = () => {
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">
            ☆
          </span>
        );
      }
    }

    return <div className="flex justify-center mt-1">{stars}</div>;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="bg-zinc-900 rounded-lg p-4 text-center transition-transform hover:scale-105 cursor-pointer"
            onClick={() => {
              if (onClick) {
                onClick(id);
              }
            }}
          >
            <div className="flex justify-center mb-2">
              <div className="rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={imageUrl}
                  width={70}
                  height={70}
                  alt={`${name} profile`}
                />
              </div>
            </div>
            <p className="text-white font-medium">{name}</p>
            {renderStars()}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TherapistCard;
