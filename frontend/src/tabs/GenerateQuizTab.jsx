import React, { useState } from "react";
import { postGenerateQuiz, previewUrl } from "../services/api";
import QuizDisplay from "../components/QuizDisplay";
import Spinner from "../components/Spinner";

export default function GenerateQuizTab() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const validateUrl = (u) => {
    try {
      const parsed = new URL(u);
      return parsed.protocol.startsWith("http") && parsed.hostname.includes("wikipedia.org");
    } catch {
      return false;
    }
  };

  const handlePreview = async () => {
    if (!validateUrl(url)) {
      setError("Please enter a valid Wikipedia URL (e.g. https://en.wikipedia.org/wiki/Alan_Turing)");
      return;
    }

    setError(null);
    setPreviewLoading(true);

    try {
      const data = await previewUrl(url);
      setPreview(data);
    } catch {
      setPreview(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      setError("Please enter a valid Wikipedia URL");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await postGenerateQuiz(url);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* INPUT CARD */}
      <div className="bg-white rounded-xl p-6 shadow border">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* LABEL + INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wikipedia URL
            </label>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            {/* PREVIEW OUTPUT */}
            {previewLoading && (
              <div className="mt-2 flex items-center gap-2 text-gray-600 text-sm">
                <Spinner size={18} />
                Fetching preview...
              </div>
            )}

            {preview && (
              <div className="mt-2 text-sm text-gray-700">
                <strong>Preview:</strong> {preview.title}
                {preview.summary && (
                  <div className="text-gray-500 mt-1">
                    {preview.summary.slice(0, 200)}...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BUTTON ROW */}
          <div className="flex flex-col md:flex-row gap-3">

            {/* PREVIEW BUTTON */}
            <button
              type="button"
              onClick={handlePreview}
              className="px-5 py-3 rounded-lg bg-gray-100 border border-gray-300 
                         hover:bg-gray-200 text-gray-700 w-full md:w-auto"
            >
              Preview
            </button>

            {/* GENERATE BUTTON (NO SPINNER INSIDE) */}
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-lg bg-blue-600 text-white 
                         hover:bg-blue-700 disabled:opacity-60 w-full md:w-auto"
            >
              Generate Quiz
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {error && <div className="text-red-600 text-sm">{error}</div>}

        </form>
      </div>

      {/* LOADING BOX (OUTSIDE BUTTON) */}
      {loading && !result && (
        <div className="bg-white p-6 rounded-xl shadow text-gray-600 flex items-center gap-3">
          <Spinner size={22} />
          Generating quiz — this may take a few seconds...
        </div>
      )}

      {/* QUIZ RESULT */}
      {result && (
        <div>
          <div className="mb-4 text-sm text-gray-500">
            Generated from:{" "}
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {result.url}
            </a>
          </div>

          <QuizDisplay data={result} takeModeEnabled={true} />
        </div>
      )}
    </div>
  );
}
