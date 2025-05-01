"use client"
import { useState } from "react";
import WalletConnection from "./phases/wallet-connection";
import AppUser from "./phases/app-user";
import WhatBringsYouHere from "./phases/what-brings-you-here";
import OnComplete from "./phases/on-complete-screen";

type OnboardingPhase = 
  | "wallet-connection" 
  | "app-user" 
  | "what-brings-you-here" 
  | "complete";
type AuthOption = 'aztec' | 'metamask' | 'anonymous';
type UserType = 'client' | 'therapist';

const Onboarding = () => {
  // Wallet connection state
  const [selectedWalletOption, setSelectedWalletOption] = useState<AuthOption | null>(null);
  
  // User type state
  const [userType, setUserType] = useState<UserType | null>(null);
  
  // Current phase state
  const [currentPhase, setCurrentPhase] = useState<OnboardingPhase>("wallet-connection");

  // Wallet connection handlers
  const handleWalletOptionSelect = (option: AuthOption) => {
    setSelectedWalletOption(option);
  };

  const getWalletOptionClasses = (option: AuthOption) => {
    const baseClasses = "flex flex-col items-center p-6 rounded-lg cursor-pointer transition-all duration-300";
    const selectedClasses = "border-[0.3px] border-[#00E6E6] bg-[#00A6A61A]";
    const unselectedClasses = "hover:bg-[#EDEDED1A]/70";
    
    return `${baseClasses} ${selectedWalletOption === option ? selectedClasses : unselectedClasses}`;
  };

  // User type handlers
  const handleUserTypeSelect = (option: UserType) => {
    setUserType(option);
  };

  const getUserTypeClasses = (option: UserType) => {
    const baseClasses = "flex flex-col items-center p-6 rounded-lg cursor-pointer transition-all duration-300";
    const selectedClasses = "border-[0.3px] border-[#00E6E6] bg-[#00A6A61A]";
    const unselectedClasses = "hover:bg-[#EDEDED1A]/70";
    
    return `${baseClasses} ${userType === option ? selectedClasses : unselectedClasses}`;
  };

  // Phase navigation
  const goToNextPhase = () => {
    switch(currentPhase) {
      case "wallet-connection":
        if (selectedWalletOption) setCurrentPhase("app-user");
        break;
      case "app-user":
        if (userType) setCurrentPhase("what-brings-you-here");
        break;
      case "what-brings-you-here":
        setCurrentPhase("complete");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/onboarding.svg')] bg-cover bg-center">
      {currentPhase === "wallet-connection" && (
        <WalletConnection 
          selectedOption={selectedWalletOption}
          handleOptionSelect={handleWalletOptionSelect}
          getOptionClasses={getWalletOptionClasses}
          onContinue={goToNextPhase}
        />
      )}
      
      {currentPhase === "app-user" && (
        <AppUser 
          selectedOption={userType}
          handleOptionSelect={handleUserTypeSelect}
          getOptionClasses={getUserTypeClasses}
          onContinue={goToNextPhase}
        />
      )}
      
      {currentPhase === "what-brings-you-here" && (
        <WhatBringsYouHere onContinue={goToNextPhase} />
      )}
      
      {currentPhase === "complete" && (
        <OnComplete />
      )}
    </div>
  );
}

export default Onboarding;