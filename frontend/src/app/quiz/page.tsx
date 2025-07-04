"use client";

// QuizPage – client-side page that fetches all questions,
// shows one at a time with Prev/Next navigation, stores the
// user’s answers, and displays a score summary when finished.

import React, { useEffect, useState } from "react";

type Option = { optionText: string; isCorrect: boolean };

type Question = {
  _id: string;
  text: string;
  options: Option[];
  correctAnswerIndex: number;
};

// ---------- component ----------

export default function QuizPage() {
  // Store the first question only
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0); // current question index
  const [answers, setAnswers] = useState<number[]>([]); // -1 = unanswered
  const [finished, setFinished] = useState(false);

  // Fetch all questions once
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((r) => r.json())
      .then((qs: Question[]) => {
        setQuestions(qs);
        setAnswers(Array(qs.length).fill(-1)); // start with “unanswered”
      });
  }, []);

  // loading view
  if (questions.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-linen text-cocoa">
        Loading…
      </main>
    );
  }

  // result view

  if (finished) {
    // count how many answers are correct
    const score = answers.reduce(
      (sum, ans, i) =>
        ans === questions[i].correctAnswerIndex ? sum + 1 : sum,
      0
    );
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-linen p-8 text-cocoa">
        <h1 className="text-4xl font-bold mb-4 text-cocoa-dark">
          Quiz finished!
        </h1>
        <p className="text-xl mb-8">
          You scored {score} / {questions.length}
        </p>
        <button
          onClick={() => {
            setIdx(0);
            setAnswers(Array(questions.length).fill(-1));
            setFinished(false);
          }}
          className="bg-butter text-cocoa-dark px-6 py-3 rounded-xl hover:shadow-md"
        >
          Restart
        </button>
      </main>
    );
  }

  // current question
  const q = questions[idx];

  // store chosen radio index for the current question
  const choose = (choice: number) => {
    const next = [...answers];
    next[idx] = choice;
    setAnswers(next);
  };

  return (
    <main className="mx-auto max-w-xl min-h-screen p-8 bg-linen text-cocoa">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-cocoa-dark">
        Question {idx + 1} / {questions.length}
      </h1>

      {/* Question text */}
      <p className="text-lg font-medium mb-4">{q.text}</p>

      {/* Answer options */}
      <ul className="space-y-3 mb-8">
        {q.options.map((opt, i) => (
          <li key={i} className="flex items-center gap-3">
            <input
              type="radio"
              name="option"
              id={`opt-${i}`}
              className="h-4 w-4 text-butter focus:ring-cocoa"
              checked={answers[idx] === i}
              onChange={() => choose(i)}
            />
            <label htmlFor={`opt-${i}`} className="text-sm">
              {opt.optionText}
            </label>
          </li>
        ))}
      </ul>

      {/* Prev / Next / Finish */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setIdx((i) => i - 1)}
          disabled={idx === 0}
          className="px-4 py-2 border rounded-xl disabled:opacity-40"
        >
          Prev
        </button>

        {idx < questions.length - 1 ? (
          <button
            onClick={() => setIdx((i) => i + 1)}
            disabled={answers[idx] === -1}
            className="px-6 py-2 rounded-xl bg-butter text-cocoa-dark hover:shadow-md disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setFinished(true)}
            disabled={answers[idx] === -1}
            className="px-6 py-2 rounded-xl bg-butter text-cocoa-dark hover:shadow-md disabled:opacity-40"
          >
            Finish
          </button>
        )}
      </div>
    </main>
  );
}
