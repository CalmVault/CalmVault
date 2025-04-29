import React from 'react'
import Image from 'next/image'

type WalletConnectionProps = {
  selectedOption: 'aztec' | 'metamask' | 'anonymous' | null;
  handleOptionSelect: (option: 'aztec' | 'metamask' | 'anonymous') => void;
  getOptionClasses: (option: 'aztec' | 'metamask' | 'anonymous') => string;
  onContinue: () => void;
}

function WalletConnection({ 
  selectedOption, 
  handleOptionSelect, 
  getOptionClasses,
  onContinue
}: WalletConnectionProps) {
  return (
    <div className="w-full max-w-[45.43rem] mx-auto p-8 bg-[#EDEDED1A] rounded-3xl text-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={129} height={85.75}/>
        </div>

        {/* Heading */}
        <h1 className="text-[#ffffff] text-3xl font-bold mt-6">Step into a safer, calmer space</h1>

        {/* Subtext */}
        <p className="text-[#ededed] text-center max-w-xl">
          Join anonymously and access private, judgment-free therapy — your way.
        </p>

        {/* Authentication Options */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-8">
          {/* Aztec Option */}
          <div 
            className={getOptionClasses('aztec')}
            onClick={() => handleOptionSelect('aztec')}
          >
            <div className="w-12 h-12 mb-2">
              <Image src="/aztec.svg" alt="Aztec logo" width={48} height={48} />
            </div>
            <span className="text-[#ffffff] text-sm">Aztec zk-money</span>
          </div>

          {/* Metamask Option */}
          <div 
            className={getOptionClasses('metamask')}
            onClick={() => handleOptionSelect('metamask')}
          >
            <div className="w-12 h-12 mb-2">
              <Image src="/metamask.svg" alt="Metamask logo" width={48} height={48} />
            </div>
            <span className="text-[#ffffff] text-sm">Metamask</span>
          </div>

          {/* Anonymous Option */}
          <div 
            className={getOptionClasses('anonymous')}
            onClick={() => handleOptionSelect('anonymous')}
          >
            <div className="w-12 h-12 mb-2">
              <Image src="/anonymous.svg" alt="Anonymous logo" width={48} height={48} />
            </div>
            <span className="text-[#ffffff] text-sm">Anonymous</span>
          </div>
        </div>

        {/* Enter Button - Disabled if no option selected */}
        <button 
          className={`w-full max-w-lg mt-8 py-4 px-6 transition-colors duration-300 text-[#ffffff] font-medium rounded-lg ${
            selectedOption 
              ? "bg-[#00E6E633] hover:bg-[#00E4E633] border border-[#00A6A6] cursor-pointer shadow-[-4px_-4px_10px_0px_rgba(0,230,230,0.1)] " 
              : "bg-[#00a6a6]/50 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
          onClick={onContinue}
        >
          {selectedOption ? "Enter CalmVault" : "Select an option"}
        </button>
      </div>
    </div>
  )
}

export default WalletConnection