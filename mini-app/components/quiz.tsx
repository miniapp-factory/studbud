"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Question = {
  text: string;
  options: string[];
};

type Result = {
  method: string;
  score: number;
  image: string;
  example: string;
};

const questions: Question[] = [
  {
    text: "I prefer short, focused study sessions with breaks in between.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I like to explain concepts in my own words to ensure I understand them.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I review material multiple times over spaced intervals.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I write down everything I learn in a structured notebook.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I create mind maps to visualize relationships between ideas.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I test myself frequently to check my recall.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I use flashcards to drill information.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I mix different subjects while studying to keep things fresh.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I read a summary after studying to reinforce learning.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    text: "I write a brief summary of what I learned immediately after studying.",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
];

const methodMap: Record<number, Result> = {
  0: {
    method: "Pomodoro Technique",
    score: 0,
    image: "/pomodoro.png",
    example: "Study for 25 minutes, then take a 5‑minute break. Repeat four times, then take a longer break.",
  },
  1: {
    method: "Feynman Technique",
    score: 0,
    image: "/feynman.png",
    example: "Explain a concept in simple terms, identify gaps, review, and simplify again.",
  },
  2: {
    method: "Spaced Repetition",
    score: 0,
    image: "/spaced-repetition.png",
    example: "Review material at increasing intervals to strengthen memory.",
  },
  3: {
    method: "Cornell Note‑Taking",
    score: 0,
    image: "/cornell.png",
    example: "Divide paper into cues, notes, and summary sections for organized review.",
  },
  4: {
    method: "Mind Mapping",
    score: 0,
    image: "/mind-mapping.png",
    example: "Create a visual diagram linking main ideas and sub‑ideas.",
  },
  5: {
    method: "Active Recall",
    score: 0,
    image: "/active-recall.png",
    example: "Test yourself on material without looking at notes.",
  },
  6: {
    method: "Leitner System",
    score: 0,
    image: "/leitner.png",
    example: "Use spaced flashcards with a box system to track mastery.",
  },
  7: {
    method: "Interleaving Technique",
    score: 0,
    image: "/interleaving.png",
    example: "Mix different topics or skills during practice sessions.",
  },
  8: {
    method: "SQ3R Method",
    score: 0,
    image: "/sq3r.png",
    example: "Survey, Question, Read, Recite, Review – a structured reading strategy.",
  },
  9: {
    method: "Blurting Method",
    score: 0,
    image: "/blurting.png",
    example: "Write down everything you remember immediately after studying.",
  },
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<Result[] | null>(null);

  const handleAnswer = (score: number) => {
    setAnswers((prev) => [...prev, score]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      computeResults([...answers, score]);
    }
  };

  const computeResults = (allAnswers: number[]) => {
    const scores: Record<number, number> = {};
    allAnswers.forEach((score, idx) => {
      scores[idx] = score;
    });
    const finalResults: Result[] = Object.entries(methodMap).map(
      ([key, method]) => ({
        ...method,
        score: scores[Number(key)] ?? 0,
      })
    );
    setResults(finalResults);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setResults(null);
  };

  if (results) {
    const best = results.reduce((prev, curr) =>
      curr.score > prev.score ? curr : prev
    );
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">Your Best Study Method</h2>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <img
            src={best.image}
            alt={best.method}
            width={256}
            height={256}
            className="rounded-md"
          />
          <h3 className="text-lg font-medium">{best.method}</h3>
          <p className="text-center">{best.example}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetQuiz}>Retake Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  const question = questions[current];
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          Question {current + 1} of {questions.length}
        </h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{question.text}</p>
        <div className="grid grid-cols-1 gap-2">
          {shuffledOptions.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleAnswer(5 - idx)}
              className="w-full justify-start"
            >
              {opt}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
