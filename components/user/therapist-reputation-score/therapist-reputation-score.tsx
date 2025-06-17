"use client";
import React, { useState } from "react";
import Header from "@/components/header"
import TherapySessionSidebar from "../therapy-hub/alert-sidebar";
import TherapistReputationScoreCard, { ReputationScoreCardProps } from "./therapist-reputation-score-card";




function TherapistReputationScore() {

        const reputationScores: ReputationScoreCardProps[] = [
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
                       {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            },
            {
                title: "Reputation Score",
                rating: "4.7/5",
                text: "Based on encrypted feedback from recent sessions. Private-to-you insights only.",
            }
        ];


  return (
        <>
            <div className="min-h-screen bg-sidebar-bg">
                <div className="max-w-7xl mx-auto px-4 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-content-center">
                        <div className="md:col-span-2 space-y-8 overscroll-auto mt-[3.5em]">
                            {/* <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
                                <Header title="Reputation Score" />
                            </div> */}
                            {reputationScores.map((item, index) => (
                                <TherapistReputationScoreCard{...item} key={index} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </>
  )
}

export default TherapistReputationScore