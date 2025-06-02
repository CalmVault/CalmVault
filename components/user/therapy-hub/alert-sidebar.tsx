'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface TherapySessionSidebarProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  helpText?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
  onStartSession?: () => void; // Support both prop names
  onHelpClick?: () => void;
}

const TherapySessionSidebar: React.FC<TherapySessionSidebarProps> = ({
  title = "Take a breath.",
  subtitle = "We'll walk with you.",
  buttonText = "Start a session",
  helpText = "Help & FAQs",
  imageUrl = "/meditate.png",
  onButtonClick,
  onStartSession, // Accept both prop names
  onHelpClick,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    console.log("Button clicked in sidebar");
    
    // Call whichever prop is provided
    if (onStartSession) {
      onStartSession();
    } else if (onButtonClick) {
      onButtonClick();
    } else {
      console.error("Neither onStartSession nor onButtonClick prop is defined");
    }
  };

  const handleHelpClick = () => {
    if (onHelpClick) {
      onHelpClick();
    }
    router.push('/faq');
  };

  return (
    <div className="sticky top-[120px]">
      <div className="text-white rounded-lg overflow-hidden">
        {/* Image container with text overlay */}
        <div className="relative mb-6">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              fill
              style={{ objectFit: 'cover' }}
              alt="Meditation visualization"
              priority
              className="brightness-90"
            />
            {/* Text overlay */}
            <div className="absolute w-full bottom-0 items-center flex flex-col justify-center text-center p-6">
              <h2 className="text-2xl font-bold mb-2 text-white">
                {title}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-white">
                {subtitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Call to action button */}
        <div className="px-4 pb-4 space-y-4">
          <Button
            onClick={handleButtonClick}
            className="w-full text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
            style={{
              borderColor: '#14b8a6',
              color: '#ffffff',
            }}
          >
            {buttonText}
          </Button>

          {/* Help & FAQs link */}
          <div className="text-center">
            <Button
              variant="link"
              className="text-gray-300 hover:text-white p-0 h-auto font-normal text-sm"
              onClick={handleHelpClick}
            >
              {helpText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapySessionSidebar;