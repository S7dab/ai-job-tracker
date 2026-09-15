import React from "react";

function Footer() {
  return (
   <footer className="footer footer-center bg-base-200 text-base-content p-6 mt-10">
  <aside>
    <p className="font-semibold">
      AI Job Tracker
    </p>

    <p className="text-sm opacity-70">
      Developed by Shadab Ahmad
    </p>

    <div className="text-sm opacity-70 space-y-1">
      <p>Email: s7dab1998@gmail.com</p>
      <p>Phone: +91 75185544496</p>
    </div>

    <p className="text-sm opacity-60">
      © {new Date().getFullYear()} AI Job Tracker. All rights reserved.
    </p>
  </aside>
</footer>
  );
}

export default Footer;