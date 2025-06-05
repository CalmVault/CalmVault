"use client";

import { DollarSign, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EarningsData {
  id: string;
  type: "Per Session" | "Per Subscription";
  totalPayout: number;
  daoCredits: number;
  isActive: boolean;
}

export default function EarningsDashboard() {
  const [earnings, setEarnings] = useState<EarningsData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchEarnings = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy data based on the screenshot
        const dummyData: EarningsData[] = [
          {
            id: "1",
            type: "Per Session",
            totalPayout: 400,
            daoCredits: 85,
            isActive: true,
          },
          {
            id: "2",
            type: "Per Subscription",
            totalPayout: 420,
            daoCredits: 115,
            isActive: true,
          },
          {
            id: "3",
            type: "Per Session",
            totalPayout: 500,
            daoCredits: 105,
            isActive: true,
          },
        ];

        setEarnings(dummyData);
        setError(null);
      } catch (err) {
        setError("Failed to load earnings data. Please try again later.");
        console.error("Error fetching earnings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <>
      {/* Loading State */}
      {isLoading && (
        <div className="text-center h-screen flex justify-center items-center  text-white p-6">
          <p>Loading earnings data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center h-screen flex justify-center items-center text-red-500 p-6">
          <p>{error}</p>
        </div>
      )}

      {/* Earnings Display */}
      {!isLoading && !error && (earnings?.length ?? 0) > 0 && (
        <div className="min-h-screen bg-[#12121280] p-6">
          <div className="max-w-[700px] mx-auto space-y-4">
            {earnings?.map((earning) => (
              <div
                key={earning.id}
                className="bg-[#EDEDED1A] rounded-2xl p-4 border-gray-700 hover:ring-purple-700/30 hover:ring"
              >
                <div className="pb-3">
                  <h1 className="flex items-center gap-2 text-[#FFFFFF] text-xl font-medium">
                    <Image
                      src="/earnings.png"
                      alt="Earnings Icon"
                      width={32}
                      height={32}
                      className="inline-block w-4 h-4"
                    />
                    Earnings ({earning.type})
                  </h1>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">
                      Total Payouts (via zk - money): ${earning.totalPayout}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">
                      DAO Credits & Staking: {earning.daoCredits} DAO credits
                      (Active)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Image
                      src="/Anonymous.png"
                      alt="Anonymous Icon"
                      width={32}
                      height={32}
                      className="inline-block w-4 h-4"
                    />
                    <span className="text-gray-300">Withdraw Anonymously</span>
                  </div>

                  <button className="w-full mt-4 bg-[#6A57D0] rounded-sm hover:bg-purple-700 text-white">
                    Withdraw Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
