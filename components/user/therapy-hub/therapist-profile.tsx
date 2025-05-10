'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { therapists } from '@/data/mock-data';
import Image from 'next/image';

interface TherapistProfileProps {
  therapistId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const TherapistProfile: React.FC<TherapistProfileProps> = ({ therapistId, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('about');
  
  if (!therapistId) return null;
  
  const therapist = therapists.find(t => t.id.toString() === therapistId.toString());
  
  if (!therapist) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Profile Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-sidebar-bg text-white z-50 overflow-y-auto"
          >

            {/* Content */}
            <div className="p-8">
              {/* Profile Card */}
              <div className="bg-[#1a1a1a] rounded-[2rem] p-8 mb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={therapist.imageUrl}
                      alt={therapist.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-medium mb-3">{therapist.name}</h2>
                  <p className="text-gray-400 mb-4">
                    I can be the babe you never had...
                  </p>
                  
                  {/* Price and Rating */}
                  <div className="w-full">
                    <div className="text-right mb-2">
                      <p className="text-xl font-semibold">$5 per hour</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Avg. Rating</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{therapist.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <span key={star} className="text-orange-500">★</span>
                          ))}
                          <span className="text-gray-400">☆</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Button */}
              <Button className="w-full bg-[#00E6E633] border-[1px] border-[#00A6A6] hover:bg-teal-700 text-white py-8 rounded-2xl mb-12 text-lg font-medium">
                Schedule a Session
              </Button>

              {/* Tabs */}
              <div className="border-b border-gray-700 mb-8">
                <div className="flex justify-center">
                  <button 
                    onClick={() => setActiveTab('about')}
                    className={`py-3 px-4 text-lg font-medium ${
                      activeTab === 'about' 
                        ? 'text-white border-b-2 border-[#00A6A6] bg-[#00a6a63e]' 
                        : 'text-gray-400'
                    }`}
                  >
                    About
                  </button>
                  <button 
                    onClick={() => setActiveTab('testimonials')}
                    className={`py-3 px-4 text-lg font-medium ${
                      activeTab === 'testimonials' 
                        ? 'text-white border-b-2 border-[#00A6A6] bg-[#00a6a63e]' 
                        : 'text-gray-400'
                    }`}
                  >
                    Testimonials
                  </button>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Bio</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    I can be the babe you never had, someone who would just listen without devaluating your opinons and make you feel at home
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Years of Experience</h3>
                  <p className="text-gray-300 text-lg">16</p>
                </div>

                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Area of Specialization</h3>
                  <p className="text-gray-300 text-lg mb-2">Anxiety & Depression</p>
                  <p className="text-gray-300 text-lg">Relationships & Family</p>
                </div>

                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Therapy modes offered</h3>
                  <p className="text-gray-300 text-lg mb-2">Anonymous Chat</p>
                  <p className="text-gray-300 text-lg mb-2">Secure Voice Chat</p>
                  <p className="text-gray-300 text-lg">Privacy-Protected Video Call</p>
                </div>

                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Availability</h3>
                  <p className="text-gray-300 text-lg">Mon - Fri</p>
                </div>

                <div>
                  <h3 className="text-white font-normal mb-8 bg-[#6A57D01A] p-5">Number of Clients</h3>
                  <p className="text-gray-300 text-lg">15</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TherapistProfile;