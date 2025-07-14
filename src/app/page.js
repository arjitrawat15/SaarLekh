"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import "./dashboard.css";

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const router = useRouter(); // Initialize the router

  function handleUploadClick() {
    document.getElementById("uploadInput").click();
  }

  function handleCaptureClick() {
    document.getElementById("captureInput").click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  }

  function handleGetSummary() {
    router.push("/summary"); // Navigate to /summary
  }

  function handleConvertToText() {
    router.push("/convert"); // Navigate to /convert
  }

  return (
    <div className="frame-fullpage">
      <Image
        src="/images/1355218.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />
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
        {!uploadedImage ? (
          <div className="frame-actions">
            <div className="frame-action" onClick={handleUploadClick}>
              Upload a
              <br />
              picture
              <input
                id="uploadInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="frame-action" onClick={handleCaptureClick}>
              Capture a
              <br />
              picture
              <input
                id="captureInput"
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        ) : (
          <div className="uploaded-image-container">
            <Image
              width={720}
              height={480}
              src={uploadedImage}
              alt="Uploaded Preview"
              className="uploaded-image"
            />
            <div className="frame-actions mt-10">
              
              <button className="frame-action-button" onClick={handleGetSummary}>
                Get Summary
              </button>
              <button className="frame-action-button" onClick={handleConvertToText}>
                Convert to Text
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}