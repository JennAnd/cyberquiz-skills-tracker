"use client";

import React, { useEffect, useState } from "react";

type Option = { optionText: string };

type Question = {
  _id: string;
  text: string;
  options: Option[];
};

// ---------- component ----------

export default function QuizPage() {
  // Store the first question only
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0); // current question index

  // Fetch once when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((r) => r.json())
      .then((qs: Question[]) => setQuestions(qs)); // save all questions
  }, []);

  if (questions.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-linen text-cocoa">
        Loading…
      </main>
    );
  }

  // ---------- read‑only view ----------
  const q = questions[idx]; // question to show
  return (
    <main className="mx-auto max-w-xl min-h-screen p-8 bg-linen text-cocoa">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-cocoa-dark">Quiz</h1>

      {/* Question text */}
      <p className="text-lg font-medium mb-4">{q.text}</p>

      {/* Options list */}
      <ul className="list-disc ml-6 space-y-2">
        {q.options.map((opt, i) => (
          <li key={i}>{opt.optionText}</li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setIdx((i) => i - 1)}
          disabled={idx === 0}
          className="px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={() => setIdx((i) => i + 1)}
          disabled={idx >= questions.length - 1}
          className="px-4 py-2 bg-butter text-cocoa-dark rounded-xl disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
