"use client";

import { MessageCircle, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Empty state component for when no therapy sessions exist
export function EmptySessionsState() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        {/* Illustration area with icons */}
        <div className="mb-8 relative">
          {/* Main circle with gradient background */}
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full flex items-center justify-center relative">
            {/* Floating icons around the main circle */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500/30 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-teal-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>

            {/* Main icon */}
            <MessageCircle className="w-16 h-16 text-teal-400" />
          </div>
        </div>

        {/* Main heading */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Welcome to Your Safe Space
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-6 leading-relaxed">
          You haven&apos;t started any therapy sessions yet. When you begin your
          journey with our anonymous therapists, your conversations will appear
          here.
        </p>

        {/* Features list */}
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
            <span className="text-sm">100% Anonymous & Secure</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
            <span className="text-sm">Professional Licensed Therapists</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
            <span className="text-sm">Text & Voice Messaging Support</span>
          </div>
        </div>

        {/* Call to action */}
        <div className="space-y-3">
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ">
            Start Your First Session
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-900 cursor-pointer hover:text-white py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Learn More About Our Platform
          </Button>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-gray-500 mt-6">
          Your privacy is our priority. All sessions are encrypted and
          completely anonymous.
        </p>
      </div>
    </div>
  );
}
