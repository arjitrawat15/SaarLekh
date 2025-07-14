// filepath: /home/dave/Documents/SaarLekh/src/app/convert/page.js
"use client";

import { useState } from "react";

export default function ConvertPage() {
  const [convertedText, setConvertedText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/image-to-text", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setConvertedText(data.text);
    } catch (err) {
      setConvertedText("Error: Could not convert image.");
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Convert Image</button>
          </form>
          <div className="convert-box">
            <p className="converted-text">{convertedText}</p>
          </div>
        </div>
      </main>
    </div>
  );
}