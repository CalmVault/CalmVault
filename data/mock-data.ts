// Quotes data
export const quotes = [
    {
      id: 1,
      quote: "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.",
      author: "Brené Brown",
      authorDescription: "Researcher, author, vulnerability expert",
      gradientClass: "", // Will use custom style with exact gradient values
      gradientStyle: {
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
      }
    },
    {
      id: 2,
      quote: "Feelings are just visitors. Let them come and go.",
      author: "Mooji",
      authorDescription: "Spiritual teacher",
      gradientClass: "", // Will use custom style with exact gradient values
      gradientStyle: {
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
      }
    },
    {
      id: 3,
      quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      authorDescription: "Former president, civil rights advocate",
      gradientClass: "", // Will use custom style with exact gradient values
      gradientStyle: {
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
      }
    },
    {
      id: 4,
      quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman",
      authorDescription: "Author, way of the peaceful warrior",
      gradientClass: "", // Will use custom style with exact gradient values
      gradientStyle: {
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
      }
    }
  ];
  
  // Chat prompts data with exact colors from the design
  export const chatPrompts = [
    {
      id: 1,
      question: "What emotion are you avoiding today?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        backgroundColor: "#9747FF" // The purple color from your design
      }
    },
    {
      id: 2,
      question: "What would it mean to feel safe right now?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)" 
      }
    },
    {
      id: 3,
      question: "What would it mean to feel safe?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        backgroundColor: "#00E6E6" // The teal color from your design
      }
    },
    {
      id: 4,
      question: "When did you last feel truly at peace?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        backgroundColor: "#9747FF"
      }
    },
    {
      id: 5,
      question: "What kindness can you show yourself today?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
      }
    },
    {
      id: 6,
      question: "What are you grateful for in this moment?",
      bgColor: "", // Will use custom style
      bgStyle: { 
        backgroundColor: "#00E6E6"
      }
    }
  ];
  
  // Therapists data
  export const therapists = [
    {
      id: 1,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Anxiety", "Depression", "Trauma"],
      availability: "Mon, Wed, Fri"
    },
    {
      id: 2,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Relationships", "Self-esteem", "Career"],
      availability: "Tue, Thu, Sat"
    },
    {
      id: 3,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Stress", "Work-life balance", "Burnout"],
      availability: "Mon, Thu, Sat"
    },
    {
      id: 4,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Family issues", "Grief", "Personal growth"],
      availability: "Wed, Fri, Sun"
    },
    {
      id: 5,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Mindfulness", "Anxiety", "Depression"],
      availability: "Tue, Wed, Sun"
    },
    {
      id: 6,
      name: "Amazing Listener",
      rating: 4,
      imageUrl: "/therapist.svg",
      specialties: ["Trauma", "PTSD", "Childhood wounds"],
      availability: "Mon, Thu, Fri"
    }
  ];
  
  // Journal entries data
  export const journalEntries = [
    {
      id: 1,
      title: "Relationship Boundaries",
      imageUrl: "/smiley.png",
      summary: "Explore healthy boundaries in relationships and how to maintain them",
      publishedDate: "2025-04-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Dealing with Burnout",
      imageUrl: "/burntout.png",
      summary: "Strategies for identifying, managing, and recovering from burnout",
      publishedDate: "2025-04-12",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Mindfulness Practices",
      imageUrl: "/smiley.png",
      summary: "Simple mindfulness techniques you can incorporate into your daily routine",
      publishedDate: "2025-04-08",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Finding Your Purpose",
      imageUrl: "/smiley.png",
      summary: "Reflective exercises to help discover meaning and purpose in your life",
      publishedDate: "2025-04-05",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Building Resilience",
      imageUrl: "/smiley.png",
      summary: "Tools to strengthen your ability to bounce back from life's challenges",
      publishedDate: "2025-04-01",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Self-Compassion",
      imageUrl: "/smiley.png",
      summary: "Learning to treat yourself with the kindness you extend to others",
      publishedDate: "2025-03-29",
      readTime: "5 min read"
    }
  ];
  
  // Calendar data
  export const calendarDays = [
    { date: 1, day: 'MON' },
    { date: 2, day: 'TUE' },
    { date: 3, day: 'WED' },
    { date: 4, day: 'THU' },
    { date: 5, day: 'FRI' },
    { date: 6, day: 'SAT' },
    { date: 7, day: 'SUN' },
    { date: 8, day: 'MON' },
    { date: 9, day: 'TUE' },
    { date: 10, day: 'WED' },
    { date: 11, day: 'THU' },
    { date: 12, day: 'FRI' },
    { date: 13, day: 'SAT' },
    { date: 14, day: 'SUN' },
    { date: 15, day: 'MON' },
    { date: 16, day: 'TUE' },
    { date: 17, day: 'WED' },
    { date: 18, day: 'THU' },
    { date: 19, day: 'FRI' },
    { date: 20, day: 'SAT' },
    { date: 21, day: 'SUN' },
    { date: 22, day: 'MON' },
    { date: 23, day: 'TUE', isHighlighted: true },
    { date: 24, day: 'WED', isSelected: true },
    { date: 25, day: 'THU', isHighlighted: true },
    { date: 26, day: 'FRI', isHighlighted: true },
    { date: 27, day: 'SAT' },
    { date: 28, day: 'SUN' },
    { date: 29, day: 'MON', isHighlighted: true },
    { date: 30, day: 'TUE', isHighlighted: true },
  ];
  
  export const bookedEvents = [
    {
      id: '1',
      therapistName: 'Amazing Listener',
      price: '$5 Per Hour',
      time: '3pm - 4pm',
      date: '2024-04-24',
      rating: 4,
      imageUrl: '/therapist.svg',
    },
    {
      id: '2',
      therapistName: 'Amazing Listener',
      price: '$5 Per Hour',
      time: '3pm - 4pm',
      date: '2024-04-24',
      rating: 4,
      imageUrl: '/therapist.svg',
    },
    {
      id: '3',
      therapistName: 'Amazing Listener',
      price: '$5 Per Hour',
      time: '3pm - 4pm',
      date: '2024-04-24',
      rating: 4,
      imageUrl: '/therapist.svg',
    },
  ];
  
  // Sidebar content with specific colors from design
  export const sidebarContent = {
    title: "Take a breath.",
    subtitle: "We'll walk with you.",
    imageUrl: "/meditiate.png",
    buttonText: "Start a session",
    helpText: "Help & FAQs",
    buttonStyle: {
      backgroundColor: "#00E6E6",
      color: "#FFFFFF",
      hover: {
        backgroundColor: "#00B3B3"
      }
    },
    gradientStyle: {
      background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
    }
  };
  
  // Calendar sidebar content
  export const calendarSidebarContent = {
    title: "Your safe space",
    subtitle: "starts here.",
    imageUrl: "/door.png",
    buttonText: "Book a session",
    helpText: "Help & FAQs",
    buttonStyle: {
      backgroundColor: "#00E6E6",
      color: "#FFFFFF",
      hover: {
        backgroundColor: "#00B3B3"
      }
    },
    gradientStyle: {
      background: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
    }
  };
  
  // Common gradient style that can be reused throughout the app
  export const commonGradients = {
    primaryGradient: "linear-gradient(to right, #9747FF 29%, #00E6E6 100%)"
  };

  // Chat messages data (extracted from ChatUI component)
  export const chatMessages = [
    {
      id: "1",
      text: "So from what you are saying, you do not have babe?",
      sender: "ai",
      timestamp: "6:11 pm",
    },
    {
      id: "2",
      text: "So from what you are saying, you do not have...",
      sender: "user",
      timestamp: "",
    },
    {
      id: "3",
      text: "I think that my bad attitude might just be the problem in all of this.",
      sender: "user",
      timestamp: "6:11 pm",
    },
    {
      id: "4",
      text: "You are saying a lot oo and it makes sense",
      sender: "user",
      timestamp: "6:11 pm",
    },
    {
      id: "5",
      text: "I would definitely get a babe if I follow this format you just gave to me",
      sender: "user",
      timestamp: "6:11 pm",
    },
  ];
  
  // Chat details data (extracted from ChatUI component)
  export const chatDetailsData = {
    photos: [
      {
        id: "1",
        url: "/photo1.jpg",
        type: "photo",
      },
      {
        id: "2",
        url: "/video1.jpg",
        type: "video",
        duration: "11:38",
      },
    ],
    files: [
      {
        id: "1",
        name: "Contract for the provision of printing services...",
        type: "document",
      },
      {
        id: "2",
        name: "Contract for the provision of printing services...",
        type: "document",
      },
      {
        id: "3",
        name: "Contract for the provision of printing services...",
        type: "document",
      },
    ],
    links: [
      {
        id: "1",
        title: "All new types of laptops for relationships...",
        url: "https://neutheferfe",
        gradient: { from: "#9747FF", to: "#FF47E0" },
      },
      {
        id: "2",
        title: "All new types of laptops for relationships...",
        url: "https://neutheferfe",
        gradient: { from: "#9747FF", to: "#FF47E0" },
      },
    ],
  };
  
  // Chat user data (extracted from ChatUI component)
  export const chatUserData = {
    name: "Amazing Listener",
    status: "Online",
    avatar: {
      gradient: "linear-gradient(to br, #9747FF, #00E6E6)",
      emoji: "👤",
    },
  };

  // Calendar configuration constants
export const CALENDAR_CONFIG = {
    defaultPrompt: "Let's talk about how you're feeling today. What's on your mind?",
    dateFormat: {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
    },
    timeFormat: {
      hour: '2-digit' as const,
      minute: '2-digit' as const,
    },
  };
  
  // Event status types
  export enum EventStatus {
    SCHEDULED = 'scheduled',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
  }
  
  // Calendar view types
  export enum CalendarView {
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day',
  }