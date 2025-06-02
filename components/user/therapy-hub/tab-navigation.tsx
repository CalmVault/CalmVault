"use client";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-700 mb-8">
      <div className="flex justify-center">
        <button
          onClick={() => setActiveTab("about")}
          className={`py-3 px-4 text-lg font-medium ${
            activeTab === "about"
              ? "text-white border-b-2 border-[#00A6A6] bg-[#00a6a63e]"
              : "text-gray-400"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`py-3 px-4 text-lg font-medium ${
            activeTab === "testimonials"
              ? "text-white border-b-2 border-[#00A6A6] bg-[#00a6a63e]"
              : "text-gray-400"
          }`}
        >
          Testimonials
        </button>
      </div>
    </div>
  );
}

export default TabNavigation;
