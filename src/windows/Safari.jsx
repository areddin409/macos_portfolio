import { WindowControls } from "@/components";
import { learningJourney, techRecommendations, bookmarks } from "@/constants";
import { useState } from "react";
import WindowWrapper from "@/hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Globe,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  X,
} from "lucide-react";

const Safari = () => {
  const [activeTab, setActiveTab] = useState("learning");

  const tabs = [
    { id: "learning", label: "Learning Journey", data: learningJourney },
    { id: "tech", label: "Tech Recommendations", data: techRecommendations },
    { id: "bookmarks", label: "Bookmarks", data: bookmarks },
  ];

  const currentData = tabs.find((tab) => tab.id === activeTab)?.data || [];

  return (
    <div
      className="flex flex-col h-full w-full overflow-hidden rounded-xl"
      style={{ contain: "strict" }}
    >
      <div id="window-header">
        <WindowControls target={"safari"} />

        <PanelLeft className="ml-10 icon" />
        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
        </div>

        <div className="search">
          <Search className="icon" />

          <input
            type="text"
            placeholder="Search or enter website name"
            className="flex-1"
          />
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* Safari-style Tab Bar */}
      <div className="relative z-10 flex items-center gap-1 bg-[#e8e8e8] px-2 py-1.5 border-b border-gray-300 shrink-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center gap-2 px-4 py-1.5 rounded-t-lg cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-white shadow-sm"
                : "bg-[#d4d4d4] hover:bg-[#e0e0e0]"
            }`}
            style={{
              minWidth: "180px",
              maxWidth: "240px",
            }}
          >
            {/* Favicon placeholder */}
            <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-400 to-blue-600 shrink-0" />

            {/* Tab title */}
            <span
              className={`text-sm truncate flex-1 ${
                activeTab === tab.id ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {tab.label}
            </span>

            {/* Close button - only show on hover or active tab */}
            {tabs.length > 1 && (
              <button
                className={`p-0.5 rounded hover:bg-gray-300 transition-opacity ${
                  activeTab === tab.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // You can add close tab logic here if needed
                }}
              >
                <X size={14} className="text-gray-600" />
              </button>
            )}
          </div>
        ))}

        {/* New tab button */}
        <button className="p-1.5 hover:bg-gray-300 rounded transition-colors">
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>

      <div
        className="blog overflow-y-auto overflow-x-hidden flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50"
        style={{ contain: "strict", minHeight: 0 }}
      >
        <div className="w-full px-10 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header with gradient text */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {currentData.map(
                (
                  { id, title, link, image, icon, category, description },
                  index
                ) => (
                  <div
                    key={id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative grid grid-cols-12 gap-6 p-6">
                      {/* Image section with enhanced styling */}
                      <div className="col-span-3 flex items-center justify-center">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 p-4 group-hover:scale-105 transition-transform duration-300">
                          {icon === "Globe" ? (
                            <Globe
                              className="w-full h-full text-blue-600"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <img
                              src={image}
                              alt={title}
                              className="w-full h-full object-contain drop-shadow-md"
                            />
                          )}
                          <div className="absolute inset-0 ring-1 ring-inset ring-gray-200 rounded-xl"></div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="col-span-9 flex flex-col justify-center space-y-3">
                        {/* Category badge */}
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm">
                            {category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {description}
                        </p>

                        {/* Link button */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold text-sm group/link transition-colors w-fit"
                        >
                          <span>Visit Resource</span>
                          <MoveRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
