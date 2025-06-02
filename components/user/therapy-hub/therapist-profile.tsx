"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { therapists } from "@/data/mock-data";
import ProfileCard from "./profile-card";
import TabNavigation from "./tab-navigation";
import AboutSection from "./about-section";
import TestimonialsSection from "./testimonials-section";

interface TherapistProfileProps {
  therapistId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function TherapistProfile({
  therapistId,
  isOpen,
  onClose,
}: TherapistProfileProps) {
  const [activeTab, setActiveTab] = useState("about");

  if (!therapistId) return null;

  const therapist = therapists.find(
    (t) => t.id.toString() === therapistId.toString()
  );

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-sidebar-bg text-white z-50 overflow-y-auto"
          >
            {/* Content */}
            <div className="p-8">
              {/* Profile Card */}
              <ProfileCard therapist={therapist} />

              {/* Schedule Button */}
              <Button className="w-full bg-[#00E6E633] border-[1px] border-[#00A6A6] hover:bg-teal-700 text-white py-8 rounded-2xl mb-12 text-lg font-medium">
                Schedule a Session
              </Button>

              {/* Tabs */}
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Conditional Content Rendering */}
              {activeTab === "about" && <AboutSection />}
              {activeTab === "testimonials" && (
                <TestimonialsSection therapistRating={therapist.rating} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TherapistProfile;
