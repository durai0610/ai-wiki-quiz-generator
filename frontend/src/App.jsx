import React, { useState } from "react";
import GenerateQuizTab from "./tabs/GenerateQuizTab";
import HistoryTab from "./tabs/HistoryTab";

export default function App() {
  const [active, setActive] = useState("generate");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Wiki Quiz Generator</h1>
          </div>
          <p className="text-gray-600 mt-2">Paste a Wikipedia article URL and generate a quiz automatically. View past quizzes in history.</p>
        </header>

        <nav className="bg-white rounded-xl shadow p-3 mb-6">
          <div className="flex gap-3">
            <TabButton active={active==="generate"} onClick={() => setActive("generate")}>Generate Quiz</TabButton>
            <TabButton active={active==="history"} onClick={() => setActive("history")}>Past Quizzes</TabButton>
          </div>
        </nav>

        <main>
          {active === "generate" && <GenerateQuizTab />}
          {active === "history" && <HistoryTab />}
        </main>
      </div>
    </div>
  );
}

/* TabButton component */
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${active ? "bg-blue-600 text-white" : " bg-gray-100 border border-gray-300  hover:bg-gray-200 text-gray-700"}`}
    >
      {children}
    </button>
  );
}
