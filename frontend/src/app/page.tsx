// Home page – pulls questions and styles them

import React from "react";

// Server‑side fetch. The HTML is re‑generated at most
// once every 60 seconds when a request comes in.

async function getQuestions() {
  const res = await fetch("http://localhost:5000/api/questions", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
}

export default async function HomePage() {
  // Wait for the questions server‑side
  const questions = await getQuestions();

  return (
    <main className="mx-auto max-w-2xl min-h-screen p-6 bg-linen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-cocoa">Cyber Quiz Bank</h1>

      {/* Empty state */}
      {questions.length === 0 && (
        <p className="text-cocoa/60">
          No questions found. Seed the database first.
        </p>
      )}

      {/* List all questions */}
      <ul className="space-y-6">
        {questions.map((q: any) => (
          <li
            key={q._id}
            className="rounded-2xl border border-cocoa/20 bg-butter/10 p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Question text */}
            <p className="font-medium mb-3 text-cocoa-dark">{q.text}</p>

            {/* Options */}
            <ul className="list-disc ml-6 text-sm text-cocoa">
              {q.options.map((opt: any, idx: number) => (
                <li key={idx}>{opt.optionText}</li>
              ))}
            </ul>
            {/* Category + level */}
            <p className="mt-3 text-xs uppercase tracking-wide text-cocoa/70">
              {q.category} • {q.level}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
