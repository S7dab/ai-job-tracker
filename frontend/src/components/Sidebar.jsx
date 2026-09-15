import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const {logout} = useContext(AuthContext);
  return (
    <div>
      
      {/* side bar */}
      <div className="drawer">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-1" className="btn drawer-button">Menu </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
   <aside className="w-64 min-h-screen bg-base-200 border-r border-base-300 p-4">
        {/* Logo */}
        <div className="mb-8 space-y-3">
          <h1 className="text-2xl font-bold">🤖 JobTrack</h1>
          <p className="text-sm text-base-content/60">AI Job Tracker</p>
        </div>

        {/* Navigation */}
        <ul className="menu gap-2">
          <li>
            <a href="#ChartBoard" className="active">
              📊 Dashboard
            </a>
          </li>

          <li>
            <a href="#job">💼 Jobs</a>
          </li>

          <li>
            <a href="#analytics">📈 Analytics</a>
          </li>

          <li>
             <details>
            <summary>
              {" "}
              <a>🤖 AI Tools</a>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2 space-y-2 mt-2">
              <li>
                <Link to={"/ai-analyzer"}>Ai Job Analyze</Link>
              </li>
               <li>
                <Link to={"/cv-analyze"}>Ai CV Analyze</Link>
              </li>
            </ul>
          </details>
          </li>
        </ul>

        {/* Bottom */}
        <div className="mt-auto pt-8">
          <details>
            <summary className=" btn">
              {" "}
              <a>⚙️ Settings</a>
            </summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li>
                <a onClick={logout}>🚪 Logout</a>
              </li>
            </ul>
          </details>
        </div>
      </aside>
  </div>
</div>
    </div>
  );
}

export default Sidebar;
