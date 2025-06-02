"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type FaqAnswer = string[];
type FaqQuestion = {
  question: string;
  answer: FaqAnswer;
};
type FaqTopic = {
  topic: string;
  questions: FaqQuestion[];
};

interface FaqProps {
  onBackClick?: () => void;
}

export default function Faq({ onBackClick }: FaqProps) {
  const [faqData, setFaqData] = useState<FaqTopic[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFaqData = async () => {
      setLoading(true);
      const response = await new Promise<FaqTopic[]>((resolve) =>
        setTimeout(() => {
          resolve([
            {
              topic: "About CamVault",
              questions: [
                {
                  question: "What is Camvault?",
                  answer: [
                    "Camvault is a decentralized platform that allows users to securely store and manage their digital assets.",
                  ],
                },
                {
                  question: "How does Camvault ensure security?",
                  answer: [
                    "Camvault uses advanced encryption techniques and blockchain technology to ensure the security of your assets.",
                  ],
                },
              ],
            },
            {
              topic: "Therapists & AI Companions",
              questions: [
                {
                  question: "How do I find a therapist on Camvault?",
                  answer: [
                    "At CalmVault, all therapists undergo a thorough verification process before joining the platform. This includes confirming professional licenses, certifications, and credentials based on their region",
                    "We also assess their experience, areas of specialization, and commitment to client privacy. Every therapist agrees to uphold CalmVault’s strict confidentiality standards and ethical guidelines — so you can feel confident, safe, and supported throughout your journey"
                  ],
                },
                {
                  question: "What is an AI Companion?",
                  answer: [
                    "CalmVault is a privacy-first mental wellness platform that connects you with either a human therapist or an AI companion — without requiring personal information. Built on Web3 principles, CalmVault ensures end-to-end encrypted conversations, no data tracking, and full anonymity",
                    "Whether you're seeking support from a licensed professional or a judgment-free space to reflect with AI, CalmVault is your secure, private vault for mental health."
                  ],
                },
              ],
            },
            {
              topic: "Privacy & Security",
              questions: [
                {
                  question: "Do I need to share personal information to use CalmVault?",
                  answer: [
                    "No, you don’t. CalmVault is designed to protect your identity from the start. You can access sessions without providing your name, email, or any personally identifiable information. ",
                    "Whether you're speaking with a therapist or the AI companion, your privacy is our priority — no tracking, no storing, no selling of your data.",
                  ],
                },
                {
                  question: "How does CalmVault ensure my conversations are private?",
                  answer: [
                    "Yes, you have full control over your data and can choose who has access to it at any time.",
                  ],
                },
                {
                  question: "Is anything I say stored or tracked?",
                  answer: [
                    "Yes, you have full control over your data and can choose who has access to it at any time.",
                  ],
                },
                {
                  question: "How does end-to-end encryption work here?",
                  answer: [
                    "Yes, you have full control over your data and can choose who has access to it at any time.",
                  ],
                },
              ],
            },
            {
              topic: "Using The Platform",
              questions: [
                {
                  question: "How do I create an account on Camvault?",
                  answer: [
                    "No, you don’t. CalmVault is designed to protect your identity from the start. You can access sessions without providing your name, email, or any personally identifiable information.",
                    "Whether you're speaking with a therapist or the AI companion, your privacy is our priority — no tracking, no storing, no selling of your data.",
                  ],
                },
                {
                  question: "What features does Camvault offer?",
                  answer: [
                    "Camvault offers features like asset management, therapist booking, AI companionship, and secure data storage.",
                  ],
                },
              ],
            },
            {
              topic: "Pricing & Access",
              questions: [
                {
                  question: "Is Camvault free to use?",
                  answer: [
                    "Camvault offers both free and premium features. Basic access is free, while premium features require a subscription.",
                  ],
                },
                {
                  question: "How do I upgrade to a premium account?",
                  answer: [
                    "You can upgrade to a premium account through your account settings by selecting the subscription plan that suits you.",
                  ],
                },
              ],
            },
            {
              topic: "Support & Emmergencies",
              questions: [
                {
                  question: "How do I contact Camvault support?",
                  answer: [
                    "You can contact Camvault support through the help center on our website or via email.",
                  ],
                },
                {
                  question: "What should I do in case of an emergency?",
                  answer: [
                    "In case of an emergency, please contact local authorities and inform your therapist immediately if you are in a session.",
                  ],
                },
              ],
            },
          ]);
        }, 500)
      );

      setFaqData(response);
      if (response.length > 0) {
        setActiveTopic(response[0].topic);
        if (response[0].questions.length > 0) {
          setActiveQuestion(response[0].questions[0].question);
        }
      }
      setLoading(false);
    };

    fetchFaqData();
  }, []);

  const toggleTopic = (topic: string) => {
    const newActiveTopic = activeTopic === topic ? null : topic;
    setActiveTopic(newActiveTopic);

    if (newActiveTopic) {
      const topicData = faqData.find((item) => item.topic === newActiveTopic);
      if (topicData && topicData.questions.length > 0) {
        setActiveQuestion(topicData.questions[0].question);
      }
    } else {
      setActiveQuestion(null);
    }
  };

  const toggleQuestion = (question: string) => {
    setActiveQuestion(activeQuestion === question ? null : question);
  };

  const selectedTopicData = faqData.find((item) => item.topic === activeTopic);
  const selectedQuestion = selectedTopicData?.questions.find(
    (q) => q.question === activeQuestion
  );

    const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#320157] via-[#051109] to-[#032c0f] px-[150px] py-[150px]">
      <div className="flex justify-center items-center mb-10">
        <Image src="/logos.svg" alt="CamVault Logo" width={100} height={100} />
      </div>
      <div className="relative">
        <h1 className="text-[36px] font-[700] px-[20px] text-[#EDEDED] text-center">
          <button 
            className="absolute left-0 top-0"
            onClick={handleBackClick}
          >
            <ChevronLeft size={28} color="white" />
          </button>
          <div className="w-full text-center">Frequently Asked Questions</div>
        </h1>

        {/* Rest of your component remains the same */}
        {loading ? (
          <div className="text-white text-center mt-10 text-[18px] font-[500]">
            Loading FAQs...
          </div>
        ) : faqData.length === 0 ? (
          <div className="text-white text-center mt-10 text-[18px] font-[500]">
            No FAQ topics found.
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-[20px] flex-wrap gap-4 mt-6">
              {faqData.map((item, index) => (
                <button
                  className={`${
                    activeTopic === item.topic
                      ? "bg-[#00A6A61A] border-b border-[#00A6A6]"
                      : "bg-transparent"
                  } text-white outline-none text-[16px] font-[600] px-[20px] py-[10px] transition-all duration-300 hover:bg-[#00A6A61A]/10`}
                  key={index}
                  onClick={() => toggleTopic(item.topic)}
                >
                  {item.topic}
                </button>
              ))}
            </div>

            {activeTopic && selectedTopicData && (
              <div className="flex w-full px-20 mt-30">
                <div className="flex flex-col w-full border-r-[5px] border-[#2A2A2A] pr-10">
                  {selectedTopicData.questions.map((q, qIndex) => (
                    <button
                      key={qIndex}
                      className={`${
                        activeQuestion === q.question
                          ? "bg-[#6A57D01A]/10"
                          : "bg-transparent"
                      } text-white text-start outline-none text-[16px] font-[400] p-[20px] transition-all duration-300`}
                      onClick={() => toggleQuestion(q.question)}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>

                {selectedQuestion && (
                  <div className="w-full text-white px-20 mt-10 max-h-390 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {selectedQuestion.answer.map((ans, i) => (
                      <p key={i} className="max-w-[500px] text-start mb-8 ">
                        {ans}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
