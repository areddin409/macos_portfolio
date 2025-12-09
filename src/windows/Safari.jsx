import { WindowControls } from "@/components";
import { learningJourney, techRecommendations, bookmarks } from "@/constants";
import { useState } from "react";
import WindowWrapper from "@/hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
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
    <div className="flex flex-col h-full">
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
      <div className="flex items-center gap-1 bg-[#e8e8e8] px-2 py-1.5 border-b border-gray-300 flex-shrink-0">
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
            <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />

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

      <div className="blog overflow-y-auto flex-1">
        <div className="max-w-3xl mx-auto px-10 py-10">
          <h2 className="text-xl font-bold text-pink-600 mb-10">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>

          <div className="space-y-8">
            {currentData.map(
              ({ id, title, link, image, category, description }) => (
                <div key={id} className="blog-post">
                  <div className="col-span-2 shadow-sm p-2 rounded bg-white flex items-center justify-center">
                    <img src={image} alt={title} className="object-contain" />
                  </div>
                  <div className="content">
                    <p>{category}</p>
                    <h3>{title}</h3>
                    <p className="text-gray-600 mb-3">{description}</p>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Visit Resource <MoveRight className="icon-hover" />
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
