import Image from "next/image";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import StarRating from "./star-rating";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    username: string;
    text: string;
    profileImage: string;
  };
  therapistRating: number;
}

function TestimonialCard({
  testimonial,
  therapistRating,
}: TestimonialCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg">
      <div className="flex items-start p-4">
        <div className="flex flex-col items-center mr-4 bg-[#222222] px-4 pb-1.5 rounded-l-xl">
          <div className="relative w-10 h-10 mb-1  rounded-full overflow-hidden p-0.5">
            <Image
              src={testimonial.profileImage || "/placeholder.svg"}
              alt={testimonial.username}
              fill
              className="rounded-full object-cover"
              style={{
                top: "-3px",
                objectPosition: "center 25%",
              }}
            />
          </div>
          <span className="text-white text-lg font-medium">
            {testimonial.username}
          </span>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Stars and Action Icons Row */}
          <div className="flex justify-between items-center mb-3">
            <StarRating rating={therapistRating} />

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              <button>
                <ThumbsDown size={16} />
              </button>
              <button>
                <ThumbsUp size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-b border-[#2a2a2a] mb-3"></div>

          {/* Testimonial Text */}
          <p className="text-gray-300 text-lg leading-relaxed">
            {testimonial.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
