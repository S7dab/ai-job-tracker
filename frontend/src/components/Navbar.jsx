import React from "react";
import Sidebar from "./Sidebar";


export default function Navbar() {
  return (
    <div className="navbar bg-blue-300 shadow-sm">
      <div className="flex-1">
        <div href="#dashboard" className="w-25 sm:w-35">
          <img
            className="w-full h-auto object-cover"
            src="/assets/Copilot_20260914_171953.png"
            alt="logo"
          />
        </div>
      </div>
      <div className="flex-none">
        <Sidebar />
      </div>
    </div>
  );
}
