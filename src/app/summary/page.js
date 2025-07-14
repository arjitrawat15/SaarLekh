// filepath: /home/dave/Documents/SaarLekh/src/app/summary/page.js
"use client";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();

  function handleUploadMore() {
    router.push("/"); // Navigate back to the dashboard
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
          <div className="summary-box">
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </p>
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