"use client";
import { useState } from "react";
import SelectOptionsGroup from "../../ui/select-option-group";
import {
  languageOptions,
  countryOptions,
  culturalPreferenceOptions,
} from "@/data/select-options";
import Image from "next/image";

type SupportOption = string;

interface QuestionOption {
  id: string;
  label: string;
}

interface QuestionStep {
  id: number;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  selectionType: "single" | "multiple" | "select";
  bottomText?: string;
}

interface WhatBringsYouHereProps {
  onContinue: () => void;
}

const WhatBringsYouHere = ({ onContinue }: WhatBringsYouHereProps) => {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string[]>
  >({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  // State for select values
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [culturalPreference, setCulturalPreference] = useState("");

  // Defines all questions and their options
  const questionSteps: QuestionStep[] = [
    {
      id: 1,
      title: "What brings you here today?",
      subtitle: "Your needs are our primary concern",
      selectionType: "multiple",
      options: [
        { id: "anxiety", label: "Anxiety or overthinking" },
        { id: "sadness", label: "Sadness or low motivation" },
        { id: "relationships", label: "Relationship/family issues" },
        { id: "trauma", label: "Trauma or past experiences" },
        { id: "work", label: "Work or school stress" },
        { id: "general", label: "General emotional support" },
        { id: "talk", label: "Just need someone to talk to" },
      ],
    },
    {
      id: 2,
      title: "Preferred Therapist",
      subtitle: "Would you want a human touch or our AI touch",
      selectionType: "single",
      options: [
        { id: "human", label: "Human Touch" },
        { id: "ai", label: "CalmVault AI" },
      ],
    },
    {
      id: 3,
      title: "Preferred Therapy Approach",
      subtitle: "Do you prefer a particular approach to therapy?",
      selectionType: "single",
      options: [
        { id: "cbt", label: "Cognitive Behavioral Therapy (CBT)" },
        { id: "mindful_based", label: "Mindfulness-based" },
        { id: "trauma_informed", label: "Trauma-informed" },
        { id: "solution_focused", label: "Solution-focused" },
        { id: "spiritual", label: "Spiritual or faith-based" },
        { id: "no_preference", label: "No preference" },
      ],
    },
    {
      id: 4,
      title: "Language or Cultural Preferences",
      subtitle:
        "Do you have any language or cultural preferences for your therapist?",
      selectionType: "select",
      options: [
        { id: "select_lang", label: "Select Language" },
        { id: "select_country", label: "Select Country" },
        { id: "select_pref", label: "Cultural Preference" },
      ],
    },
    {
      id: 5,
      title: "Availability",
      subtitle: "When are you generally available for a session?",
      selectionType: "single",
      options: [
        { id: "morning", label: "Mornings" },
        { id: "afternoon", label: "Afternoons " },
        { id: "evening", label: "Evenings" },
        { id: "weekend", label: "Weekends" },
      ],
      bottomText:
        "Great for matching therapists efficiently and reducing drop-offs.",
    },
    {
      id: 6,
      title: "Therapist Preferences",
      subtitle: "Do you have a preference for the therapist’s gender or identity?",
      selectionType: "single",
      options: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "non_binary", label: "Non-binary" },
        { id: "no_preference", label: "No preference" }
      ],
    },
    {
        id: 7,
        title: "Comfort Level",
        subtitle: "What are you most comfortable with for your first session?",
        selectionType: "single",
        options: [
          { id: "anonymous_ai_support", label: "Anonymous AI support" },
          { id: "one_time_human_session", label: "One-time human session" },
          { id: "regular_session", label: "Regular sessions with a therapist" },
          { id: "unsure", label: "Not sure yet – I’d like to explore options" }
        ],
      },
  ];

  const toggleOption = (stepId: number, optionId: string) => {
    const currentStep = questionSteps.find((step) => step.id === stepId);
    const currentSelected = selectedOptions[stepId] || [];

    if (currentStep?.selectionType === "single") {
      // For radio buttons, replace the selection
      setSelectedOptions({
        ...selectedOptions,
        [stepId]: [optionId],
      });
    } else {
      // For checkboxes, toggle selection
      if (currentSelected.includes(optionId)) {
        setSelectedOptions({
          ...selectedOptions,
          [stepId]: currentSelected.filter((id) => id !== optionId),
        });
      } else {
        setSelectedOptions({
          ...selectedOptions,
          [stepId]: [...currentSelected, optionId],
        });
      }
    }
  };

  const handleContinue = () => {
    if (currentStepId === 7) {
      // Save all selections including dropdowns
      if (currentStepId === (4 as number)) {
        // Save dropdown selections to the selectedOptions state
        setSelectedOptions({
          ...selectedOptions,
          4: [language, country, culturalPreference].filter(Boolean),
        });
      }
      onContinue();
    } else {
      // If we're on step 4, save the dropdown selections
      if (currentStepId === 4) {
        setSelectedOptions({
          ...selectedOptions,
          4: [language, country, culturalPreference].filter(Boolean),
        });
      }
      setCurrentStepId(currentStepId + 1);
    }
  };

  const currentStep =
    questionSteps.find((step) => step.id === currentStepId) || questionSteps[0];

  // Check if current step has valid selections
  const hasValidSelections = () => {
    if (currentStep.selectionType === "select") {
      return language !== "" || country !== "" || culturalPreference !== "";
    }
    return selectedOptions[currentStepId]?.length > 0;
  };

  return (
    <div className="w-full max-w-[45.43rem] mx-auto p-8 bg-[#EDEDED1A] rounded-3xl text-center">
      {/* Progress bar */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={129} height={85.75} />
        </div>
        <div className="flex w-full justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-[4.375rem] h-[0.625rem] rounded-full ${
                step === currentStepId
                  ? "border border-[#EDEDEDB2] bg-[#EDEDED33]"
                  : step < currentStepId
                    ? "bg-[#EDEDEDCC]"
                    : "bg-[#EDEDED33]"
              }`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white text-center mb-2">
        {currentStep.title}
      </h2>
      <p className="text-gray-400 text-center text-sm mb-6">
        {currentStep.subtitle}
      </p>

      {currentStep.selectionType === "select" ? (
        <SelectOptionsGroup
          options={[
            {
              id: "language",
              options: languageOptions,
              placeholder: "Select Language",
              value: language,
              onChange: setLanguage,
            },
            {
              id: "country",
              options: countryOptions,
              placeholder: "Select Country",
              value: country,
              onChange: setCountry,
            },
            {
              id: "culturalPreference",
              options: culturalPreferenceOptions,
              placeholder: "Cultural Preference",
              value: culturalPreference,
              onChange: setCulturalPreference,
            },
          ]}
        />
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {currentStep.options.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleOption(currentStepId, option.id)}
              className={`w-full h-[4.375rem] px-6 py-3 rounded-md flex items-center justify-between transition-all duration-300 ${
                selectedOptions[currentStepId]?.includes(option.id)
                  ? "bg-[#EDEDED80] text-white border border-[#EDEDEDB2]"
                  : "bg-[#EDEDED33] text-[#EDEDED33] hover:bg-[#EDEDED33]/70 border border-[#EDEDEDB2]"
              }`}
            >
              <span className="flex items-center">
                {currentStep.selectionType === "single" && (
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center mr-3 border ${
                      selectedOptions[currentStepId]?.includes(option.id)
                        ? "border-[#00E6E6]"
                        : "border-[#EDEDED33]"
                    }`}
                  >
                    {selectedOptions[currentStepId]?.includes(option.id) && (
                      <div className="w-3 h-3 rounded-full bg-[#00A6A6] shadow-[inset_0_4px_4px_0_var(--tw-shadow-color)] shadow-[#5DE9E9]"></div>
                    )}
                  </div>
                )}
                <span className="text-left">{option.label}</span>
              </span>
              {currentStep.selectionType === "multiple" && (
                // Checkbox for multiple selection
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selectedOptions[currentStepId]?.includes(option.id)
                      ? "border-[#FFFFFF]"
                      : "border-[#EDEDED33]"
                  }`}
                >
                  {selectedOptions[currentStepId]?.includes(option.id) && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <p className="text-white text-xs text-center my-4">
        {currentStep.bottomText}
      </p>
      <button
        onClick={handleContinue}
        disabled={!hasValidSelections()}
        className={`w-full max-w-[21.2rem] mt-8 mx-auto text-white py-3 px-6 rounded-md transition-all duration-300 ${
          !hasValidSelections()
            ? "bg-[#00E6E633] opacity-50 cursor-not-allowed"
            : "bg-[#00E6E633] hover:bg-[#00E4E680] border border-[#00A6A6] cursor-pointer shadow-[-4px_-4px_10px_0px_rgba(0,230,230,0.1)]"
        }`}
      >
        {currentStepId === 6 ? "Complete" : "Continue"}
      </button>
    </div>
  );
};

export default WhatBringsYouHere;
