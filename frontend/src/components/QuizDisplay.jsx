import React, { useState } from "react";

export default function QuizDisplay({ data, takeModeEnabled = true }) {
  const quiz = data?.quiz || [];
  const [answers, setAnswers] = useState(() => quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = option;
    setAnswers(next);
  };

  const submit = () => setSubmitted(true);

  const score = () => {
    let s = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) s += 1;
    });
    return s;
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
          {data.title || data.url}
        </h2>

        {data.summary && (
          <p className="text-gray-600 mt-2 leading-relaxed break-words">
            {data.summary}
          </p>
        )}

        {/* Sections + Related Topics*/}
        <div className="mt-4 text-xs md:text-sm text-gray-500 flex flex-col gap-3">
          {/* SECTIONS → pill tags */}
          <div>
            <span className="font-semibold text-gray-700">Sections:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {(data.sections || []).slice(0, 5).map((sec, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                >
                  {sec}
                </span>
              ))}

              {(!data.sections || data.sections.length === 0) && (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>

          {/* RELATED → pill tags */}
          <div>
            <span className="font-semibold text-gray-700">Related:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {(data.related_topics || []).slice(0, 5).map((topic, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                >
                  {topic}
                </span>
              ))}

              {(!data.related_topics || data.related_topics.length === 0) && (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-8">
        {quiz.length === 0 && (
          <div className="bg-white rounded-xl p-5 shadow text-gray-600">
            No questions generated.
          </div>
        )}

        {quiz.map((q, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100"
          >
            {/* QUESTION HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
              <div className="break-words">
                <div className="text-lg md:text-xl font-semibold text-gray-900">
                  Q{idx + 1}. {q.question}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Difficulty:{" "}
                  <span className="capitalize font-medium">{q.difficulty}</span>
                </div>
              </div>

              {q.explanation && (
                <span className="text-blue-600 text-xs md:text-sm font-medium">
                  Explanation Available
                </span>
              )}
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {q.options.map((opt, i) => {
                const selected = answers[idx] === opt;
                const correct = submitted && opt === q.answer;
                const wrong = submitted && selected && opt !== q.answer;

                return (
                  <div
                    key={i}
                    onClick={() => handleSelect(idx, opt)}
                    className={`
                      p-4 rounded-xl border cursor-pointer shadow-sm
                      transition-all duration-200 hover:shadow-md active:scale-[0.98]
                      text-center font-medium break-words

                      ${
                        correct
                          ? "bg-green-50 border-green-500 text-green-700"
                          : wrong
                          ? "bg-red-50 border-red-500 text-red-700"
                          : selected
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-200 text-gray-800"
                      }
                    `}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>

            {/* EXPLANATION */}
            {submitted && (
              <div className="mt-4 text-sm bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div>
                  <strong>Correct answer:</strong> {q.answer}
                </div>
                {q.explanation && (
                  <div className="text-gray-600 mt-1 break-words">
                    {q.explanation}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      {takeModeEnabled && quiz.length > 0 && (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-8">
          {!submitted ? (
            <button
              onClick={submit}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold 
              hover:bg-blue-700 shadow-md transition-all w-full md:w-auto"
            >
              Submit Answers
            </button>
          ) : (
            <>
              <div className="text-lg font-medium text-gray-800">
                Score:{" "}
                <span className="font-bold text-blue-600">{score()}</span> / {quiz.length}
              </div>

              <button
                onClick={() => {
                  setAnswers(quiz.map(() => null));
                  setSubmitted(false);
                }}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition w-full md:w-auto"
              >
                Retake
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
