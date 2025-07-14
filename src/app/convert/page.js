// filepath: /home/dave/Documents/SaarLekh/src/app/convert/page.js
"use client";

export default function ConvertPage() {

  const convertedText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  `; // Example text, replace with dynamic data if needed


  return (
    <div className="frame-fullpage">
      <header className="frame-header">
        <span className="frame-logo">
          Saar
          <span style={{ color: "#00ffff" }}>Lekh</span>
        </span>
        <button
          className="frame-logout"
          onClick={() => (window.location.href = "/login")}
        >
          Logout
        </button>
      </header>
      <main className="frame-main">
        <div className="convert-container">
          <h1 className="convert-title">Converted Text</h1>
          <div className="convert-box">
            <p className="converted-text">{convertedText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}