// filepath: /home/dave/Documents/SaarLekh/src/app/summary/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/image-to-summary", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  function handleUploadMore() {
    router.push("/dashboard"); // Navigate back to the dashboard
  }

  function handleGenerateQuestions() {
    router.push("/questions"); // Navigate to the question generation page
    // Add logic for generating questions
  }

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
        <div className="summary-container">
          <h1 className="summary-title">Summary</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Summarize Image</button>
          </form>
          <div className="summary-box">
            <p>{summary}</p>
          </div>
          <div className="frame-actions mt-10">
            <button className="frame-action-button" onClick={handleUploadMore}>
              Upload More
            </button>
            <button
              className="frame-action-button"
              onClick={handleGenerateQuestions}
            >
              Generate Questions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}