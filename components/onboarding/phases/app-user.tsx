import React from 'react'
import Image from 'next/image'

type AppUserProps = {
  selectedOption: 'client' | 'therapist' | null;
  handleOptionSelect: (option: 'client' | 'therapist') => void;
  getOptionClasses: (option: 'client' | 'therapist') => string;
  onContinue: () => void;
}

function AppUser({ 
  selectedOption, 
  handleOptionSelect, 
  getOptionClasses,
  onContinue
}: AppUserProps) {
  return (
    <div className="w-full max-w-[45.43rem] mx-auto p-8 bg-[#EDEDED1A] rounded-3xl text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={129} height={85.75}/>
        </div>

        {/* Heading */}
        <h1 className="text-[#ffffff] text-3xl font-bold mt-6">How do you want to use CalmVault</h1>

        {/* Subtext */}
        <p className="text-[#ededed] text-center max-w-xl">
          Join as a therapist or as a client looking for a therapist
        </p>

        {/* Authentication Options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">
          {/* Client Option */}
          <div 
            className={getOptionClasses('client')}
            onClick={() => handleOptionSelect('client')}
          >
            <div className="w-20 h-20 mb-2">
              <Image src="/client.svg" alt="Client" width={80} height={80} />
            </div>
            <span className="text-[#ffffff] text-sm">Client</span>
          </div>

          {/* Therapist Option */}
          <div 
            className={getOptionClasses('therapist')}
            onClick={() => handleOptionSelect('therapist')}
          >
            <div className="w-20 h-20 mb-2">
              <Image src="/therapist.svg" alt="Therapist" width={80} height={80} />
            </div>
            <span className="text-[#ffffff] text-sm">Therapist</span>
          </div>
        </div>

        {/* Continue Button */}
        <button 
          className={`w-full max-w-lg mt-8 py-4 px-6 transition-colors duration-300 text-[#ffffff] font-medium rounded-lg ${
            selectedOption 
              ? "bg-[#00E6E633] hover:bg-[#00E4E633] border border-[#00A6A6] cursor-pointer shadow-[-4px_-4px_10px_0px_rgba(0,230,230,0.1)] " 
              : "bg-[#00a6a6]/50 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
          onClick={onContinue}
        >
          {selectedOption ? "Continue" : "Select an option"}
        </button>
      </div>
    </div>
  )
}

export default AppUser