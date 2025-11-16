// api.js - service functions to communicate with FastAPI backend
export const API_BASE = import.meta.env.VITE_API_BASE || (import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://your-backend.onrender.com");

async function postGenerateQuiz(url) {
  const resp = await fetch(`${API_BASE}/generate_quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Failed to generate quiz");
  }
  return resp.json();
}

async function getHistory() {
  const resp = await fetch(`${API_BASE}/history`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Failed to fetch history");
  }
  return resp.json();
}

async function getQuizById(id) {
  const resp = await fetch(`${API_BASE}/quiz/${id}`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Failed to fetch quiz");
  }
  return resp.json();
}

/**
 * Optional preview endpoint - many backends implement a simple preview to fetch title.
 * If backend doesn't support, this will likely 404 and should be handled by caller.
 */
async function previewUrl(url) {
  const resp = await fetch(`${API_BASE}/preview?url=${encodeURIComponent(url)}`);
  if (!resp.ok) {
    throw new Error("No preview available");
  }
  return resp.json(); // expects { title, summary? }
}

export { postGenerateQuiz, getHistory, getQuizById, previewUrl };
