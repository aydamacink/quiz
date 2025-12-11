import type { QuizQuestion } from "../data/terms";

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickRandomQuestions(
  questions: QuizQuestion[],
  count: number
): QuizQuestion[] {
  return shuffle(questions).slice(0, count);
}

export type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export function getOptionsForQuestion(q: QuizQuestion): QuizOption[] {
  const options: QuizOption[] = [
    { text: q.correctAnswer, isCorrect: true },
    ...q.wrongAnswers.map((text) => ({ text, isCorrect: false }))
  ];

  return shuffle(options);
}
