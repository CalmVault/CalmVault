"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Background from "@/public/background.svg";
import Logo from "@/public/logo.svg";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import MobileAppImage from "@/public/calmvault-ui.svg";

const IconComponents = {
  shield: () => (
    <svg
      className="w-6 h-6 text-[#00A6A6]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  brain: () => (
    <svg
      className="w-6 h-6 text-[#00A6A6]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  data: () => (
    <svg
      className="w-6 h-6 text-[#00A6A6]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

const GrainPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.6"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

interface CarouselSlide {
  id: number;
  title: string;
  type?: "image";
  icon?: keyof typeof IconComponents;
  features?: string[];
  imageAlt?: string;
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    icon: "shield" as keyof typeof IconComponents,
    title: "Encrypted Chat, Calls, and Sessions",
    features: [
      "All text, voice, and video therapy sessions are end-to-end encrypted.",
      "Private rollups ensure metadata protection, preventing even platform administrators from accessing session logs.",
    ],
  },
  {
    id: 2,
    icon: "brain" as keyof typeof IconComponents,
    title: "AI-Powered Therapy",
    features: [
      "An AI-powered chatbot provides an initial layer of mental health assistance.",
      "AI responses and progress tracking remain encrypted and private.",
      "Users can transition to human therapists seamlessly if they need deeper support.",
    ],
  },
  {
    id: 3,
    type: "image",
    title: "Mobile Application Preview",
    imageAlt: "CalmVault Mobile App",
  },
];

const Waitlist = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const defaultPosition = React.useMemo(() => ({ x: 0.5, y: 0.5 }), []);
  const [position, setPosition] = useState(defaultPosition);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cardPositions, setCardPositions] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // State for API integration
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // Ref for timeout to clear status message
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const validateEmail = (input: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(input);
  };

  useEffect(() => {
    setIsValidEmail(validateEmail(email));
  }, [email]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Function to handle form submission with timeout for status message
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!isValidEmail) return;
    
    // Clear any existing timeout
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }
    
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thanks for joining our waitlist! Check your email for confirmation.' 
        });
        setEmail(''); // Clear the form
        
        // Set timeout to clear the message after 2 seconds
        statusTimeoutRef.current = setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 2000);
      } else {
        setStatus({ type: 'error', message: data.message });
        
        // Also set timeout for error messages
        statusTimeoutRef.current = setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 2000);
      }
    } catch {
      setStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again.' 
      });
      
      // Set timeout for error messages too
      statusTimeoutRef.current = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!leftSideRef.current || prefersReducedMotion) return;

    const rect = leftSideRef.current.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (isHovering) {
      setPosition({ x, y });
    }
  };

  // Mouse handlers for hover effect on cards
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (prefersReducedMotion) return;

    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCardPositions((prev) => ({
      ...prev,
      [index]: { x, y },
    }));
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition(defaultPosition);
  }, [defaultPosition]);

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen w-full">
      {/* Mobile header with hamburger menu */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-[#0A1A19] w-full">
        <div className="flex items-center">
          <Image src={Logo} alt="CalmVault Logo" width={60} height={300} />
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay - now with just social icons */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#153634] flex flex-col  justify-between py-[1em] items-center">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-4 text-white focus:outline-none"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>

          {/* Social icons */}
          <div className="flex space-x-10 mt-[24em]">
            <Link href="#" aria-label="Instagram" className="p-3">
              <FaInstagram
                size={28}
                className="text-gray-300 hover:text-white transition-colors"
              />
            </Link>
            <Link href="#" aria-label="Twitter" className="p-3">
              <FaTwitter
                size={28}
                className="text-gray-300 hover:text-white transition-colors"
              />
            </Link>
            <Link href="#" aria-label="Facebook" className="p-3">
              <FaFacebook
                size={28}
                className="text-gray-300 hover:text-white transition-colors"
              />
            </Link>
          </div>
          <div className="items-emd text-white">
            <p className="text-white">Copyright CalmVault ® 2025</p>
          </div>
        </div>
      )}

      <div
        ref={leftSideRef}
        className="flex-1 bg-[#0A1A19] px-6 py-10 lg:p-10 flex flex-col justify-between relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300 z-0"
          style={{
            opacity: isHovering ? 0.25 : 0.1,
            background: prefersReducedMotion
              ? `radial-gradient(circle at 50% 50%, rgba(0, 166, 166, 0.5), transparent 70%)`
              : `radial-gradient(circle at ${position.x * 100}% ${
                  position.y * 100
                }%, rgba(0, 166, 166, 0.5), transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          {/* Logo - only visible on desktop */}
          <div className="hidden lg:flex items-start mb-12">
            <Image src={Logo} alt="CalmVault Logo" width={100} height={80} />
          </div>

          <div className="mt-4 lg:mt-[24%]">
            <h1 className="text-4xl lg:text-6xl font-poly italic text-white leading-tight mb-6 lg:mb-8">
              Get Early Access to a <br />
              Healthier You
            </h1>

            <p className="text-white opacity-50 mb-6 lg:mb-8 max-w-xl text-base lg:text-lg">
              Join our waitlist today to be among the first to get early access
              to our platform, receive helpful mental health resources tailored
              to your needs, and stay in the loop with exclusive updates, tips,
              and tools designed to support your well-being every step of the
              way.
            </p>

            {/* Email form - Updated with API integration */}
            <div className="flex flex-col lg:flex-row mt-8 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className={`p-3 bg-transparent border rounded-lg text-white w-full lg:max-w-sm focus:outline-none ${
                  email
                    ? isValidEmail
                      ? "border-[#01FDFD]"
                      : "border-[#01FDFD]"
                    : "border-gray-600"
                }`}
                value={email}
                onChange={handleEmailChange}
              />
              <button
                onClick={handleSubmit}
                disabled={!isValidEmail || loading}
                className={`px-6 py-3 rounded-lg flex items-center justify-center mt-2 lg:mt-0 ${
                  isValidEmail && !loading
                    ? "bg-[#00FFFF] hover:bg-[#008C8C] text-black cursor-pointer"
                    : "bg-[#008C8C] text-black cursor-not-allowed"
                }`}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    Join waitlist
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            {/* Status message - success or error - now with automatic timeout */}
            {status.message && (
              <div
                className={`mt-4 p-3 rounded-lg transition-opacity duration-300 ${
                  status.type === 'success'
                    ? 'bg-[#004D4D] text-[#00FFFF]'
                    : 'bg-red-900/50 text-red-200'
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>

        {/* Footer - desktop only */}
        <div className="relative z-10 mt-auto">
          {/* Desktop footer */}
          <div className="hidden lg:flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Copyright CalmVault © 2025
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Instagram">
                <FaInstagram
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </Link>
              <Link href="#" aria-label="Facebook">
                <FaFacebook
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </Link>
            </div>
          </div>

          {/* Mobile copyright */}
        </div>
      </div>

      {/* Right section with teal background and carousel - hidden on mobile */}
      <div className="lg:w-1/2 bg-gradient-to-b h-[50em] lg:h-screen  from-[#00A6A6] to-[#005956] flex flex-col items-center justify-center relative overflow-hidden ">
        {/* Stars background effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={Background}
            alt="Stars Background"
            fill
            className="object-cover w-full opacity-50"
          />
        </div>

        {/* Fixed carousel container with consistent height */}
        <div className="relative z-10 w-full max-w-md mx-auto px-8">
          {/* Carousel slides container with fixed height */}
          <div className="relative h-[27em]">
            {carouselSlides.map((slide, index) => {
              // Check if this is an image slide
              if (slide.type === "image") {
                // Image slide - mobile app preview
                return (
                  <div
                    key={slide.id}
                    className={`absolute top-0 w-full rounded-xl transition-all duration-500 ease-in-out h-full flex items-center justify-center ${
                      index === currentSlide
                        ? "opacity-100 transform translate-x-0"
                        : index < currentSlide
                        ? "opacity-0 transform -translate-x-full"
                        : "opacity-0 transform translate-x-full"
                    }`}
                    style={{
                      transitionDelay: index === currentSlide ? "0ms" : "0ms",
                    }}
                  >
                    {/* Mobile app preview image */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={MobileAppImage}
                        alt={slide.imageAlt || "Mobile App Preview"}
                        className="object-contain lg:h-[700px]"
                        width={330}
                        height={300}
                        priority
                      />
                    </div>
                  </div>
                );
              } else {
                // Regular feature slide with icon
                const IconComponent =
                  IconComponents[slide.icon as keyof typeof IconComponents];
                return (
                  <div
                    key={slide.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`absolute top-0 w-full rounded-xl p-8 transition-all duration-500 ease-in-out h-full cursor-pointer ${
                      index === currentSlide
                        ? "opacity-100 transform translate-x-0"
                        : index < currentSlide
                        ? "opacity-0 transform -translate-x-full"
                        : "opacity-0 transform translate-x-full"
                    }`}
                    style={{
                      transitionDelay: index === currentSlide ? "0ms" : "0ms",
                    }}
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card background with dark teal gradient and grain */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                      {/* Base dark background */}
                      <div className="absolute inset-0 bg-[#010e0e]/90"></div>

                      {/* Grain texture with SVG */}
                      <GrainPattern />

                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 30, 30, 0.4) 80%, rgba(0, 40, 40, 0.6) 100%)",
                          mixBlendMode: "overlay",
                        }}
                      ></div>

                    
                      <div
                        className="absolute inset-0 transition-opacity duration-300 ease-in-out z-0"
                        style={{
                          opacity: hoveredCard === index ? 0.25 : 0,
                          background: prefersReducedMotion
                            ? "radial-gradient(circle at 50% 50%, rgba(0, 166, 166, 0.8), transparent 70%)"
                            : `radial-gradient(circle at ${
                                cardPositions[index]?.x * 100 || 50
                              }% ${
                                cardPositions[index]?.y * 100 || 50
                              }%, rgba(0, 166, 166, 0.8), transparent 70%)`,
                          mixBlendMode: "overlay",
                        }}
                      ></div>

                      <div
                        className="absolute inset-0"
                        style={{
                          background: `
                           
                           
                            radial-gradient(circle at 95% 5%, rgba(0, 166, 166, 0.1) 0%, transparent 20%),
                            radial-gradient(circle at 5% 95%, rgba(0, 166, 166, 0.1) 0%, transparent 20%)
                          `,
                          mixBlendMode: "screen",
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 30% 20%, white 0%, transparent 0.5%),
                            radial-gradient(circle at 70% 40%, white 0%, transparent 0.5%),
                            radial-gradient(circle at 25% 60%, white 0%, transparent 0.5%),
                            radial-gradient(circle at 60% 85%, white 0%, transparent 0.5%),
                            radial-gradient(circle at 85% 15%, white 0%, transparent 0.5%)
                          `,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          mixBlendMode: "screen",
                        }}
                      ></div>
                    </div>

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="border border-[#00A6A6] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <IconComponent />
                      </div>

                      <h2 className="text-2xl font-medium text-white mb-4">
                        {slide.title}
                      </h2>

                      <ul className="space-y-4 text-gray-300">
                        {slide.features &&
                          slide.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* active tab dots */}
        <div className="flex justify-center mt-8 space-x-2 absolute lg:bottom-10 bottom-5">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentSlide
                  ? "bg-white"
                  : "bg-gray-500 hover:bg-gray-400"
              } transition-colors duration-300 focus:outline-none`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Waitlist;