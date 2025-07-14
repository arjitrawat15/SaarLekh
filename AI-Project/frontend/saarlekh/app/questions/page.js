"use client";
import { useState } from "react";

export default function QuestionsPage() {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: passage }),
    });
    const data = await res.json();
    setQuestions(data.questions);
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
        <div className="questions-container">
          <h1 className="questions-title">Generated Questions</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              rows={6}
              cols={60}
              placeholder="Enter your passage here"
            />
            <br />
            <button type="submit">Generate Questions</button>
          </form>
          <div className="questions-box">
            {questions.map((question, index) => (
              <p key={index} className="question-item">
                {index + 1}. {question}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}