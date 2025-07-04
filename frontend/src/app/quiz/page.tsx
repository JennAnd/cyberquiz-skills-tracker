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
  const [firstQuestion, setFirstQuestion] = useState<Question | null>(null);

  // Fetch once when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((r) => r.json())
      .then((qs) => setFirstQuestion(qs[0] ?? null));
  }, []);

  if (!firstQuestion) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-linen text-cocoa">
        Loading…
      </main>
    );
  }

  // ---------- read‑only view ----------
  return (
    <main className="mx-auto max-w-xl min-h-screen p-8 bg-linen text-cocoa">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-cocoa-dark">Quiz</h1>

      {/* Question text */}
      <p className="text-lg font-medium mb-4">{firstQuestion.text}</p>

      {/* Options list */}
      <ul className="list-disc ml-6 space-y-2">
        {firstQuestion.options.map((opt, i) => (
          <li key={i}>{opt.optionText}</li>
        ))}
      </ul>
    </main>
  );
}
