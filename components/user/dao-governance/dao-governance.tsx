"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const DaoGovernance = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center bg-sidebar-bg">
      <div className="mx-auto px-4 pb-6 max-w-6xl">
        <div className="flex flex-col space-y-8 bg-[#3b3b3b] w-5xl p-4 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
                <img src="/vector.png" alt="DAO Governance" width={30} height={30} />
              <h1 className="text-white text-3xl font-bold">DAO Governance</h1>
            </div>
            
            <p className="text-gray-300 text-sm">
              Participate in votes, suggest improvements and moderate disputes (if eligible)
            </p>
          </div>
          <Button
            onClick={handleOpenPanel}
            className="bg-[#7C3AED] border border-white hover:bg-[#6D28D9] text-white px-8 py-3 rounded-lg text-base font-medium min-w-[200px]"
          >
            Open DAO Panel
          </Button>
          {isPanelOpen && (
            <div className="w-full space-y-4 animate-in fade-in duration-300">
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-white text-sm">
                    You are eligible to vote in the next round of proposals
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-red-400 flex-shrink-0" size={20} />
                  <span className="text-white text-sm">
                    Submit a feature suggestion or improvements for therapist tools
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock className="text-orange-400 flex-shrink-0" size={20} />
                  <span className="text-white text-sm">
                    You've been invited to moderate a pending dispute (optional)
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DaoGovernance; 