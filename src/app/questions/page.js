"use client";

export default function QuestionsPage() {

  const questions = [
    "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "lorem ipsum dolor sit amet, consectetur adipiscing elit?",
  ]; // Example questions, replace with dynamic data if needed


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