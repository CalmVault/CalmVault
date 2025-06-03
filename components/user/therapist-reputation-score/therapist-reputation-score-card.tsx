"use client"
import React from 'react'



export interface ReputationScoreCardProps {
    title: string;
   rating: string;
   text: string;
}



function TherapistReputationScoreCard({ title, rating, text}: ReputationScoreCardProps) {
  return (
    <div className="w-full flex-col justify-center gap-y-7 h-[130px] rounded-2xl bg-[#EDEDED1A] py-5 px-12 mb-5">
        <div className="flex space-x-[19px] mb-3">
            <img src="/star-box.png" alt="logo" />
            <p className='text-[22px] text-white'>{title}</p>
        </div>
        <div className="flex space-x-[6px] py-1.5">
            <img src="/thumbs-up.svg" alt="logo" />
            <p className='text-[12px] text-white'>{rating}</p>
        </div>
        <div className="text-[10px] text-white py-1.5">{text}</div>
    </div>
  )
}



export default TherapistReputationScoreCard