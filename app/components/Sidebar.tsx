"use client";

import React, { useState } from "react";

const Sidebar: React.FC = () => {
  // State to control whether the sidebar is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out transform${
        isCollapsed ? "-translate-x-full" : "translate-x-0 w-72"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-40px] p-2 bg-blue-500 text-white rounded-lg"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">
            Welcome to Skylark's SMS Service Mockup
          </h2>
          <hr className="border-black mb-4" />
          <p className="mb-4">
            This is the prototype of the SMS service. You can ask questions
            about health, get advice, and more. This interface is designed to
            look like an actual SMS chat.
          </p>
          <p className="mb-4">
            Our messaging applies <b>behavioral science</b> principles to nudge
            users to act upon the advice given.
          </p>
          <p className="mb-4">
            Press the <b>← button</b> to collapse the sidebar.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
