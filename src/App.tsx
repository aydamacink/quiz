import { useState } from "react";
import { QUESTIONS } from "./data/terms";
import {
  pickRandomQuestions,
  getOptionsForQuestion,
  type QuizOption,
} from "./quiz/utils";

type Phase = "welcome" | "quiz" | "results";

function App() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentQuestions, setCurrentQuestions] = useState(() =>
    pickRandomQuestions(QUESTIONS, 10)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<QuizOption[]>(() =>
    getOptionsForQuestion(currentQuestions[0])
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [score, setScore] = useState(0);

  function startQuiz() {
    const qs = pickRandomQuestions(QUESTIONS, 10);
    setCurrentQuestions(qs);
    setCurrentIndex(0);
    setCurrentOptions(getOptionsForQuestion(qs[0]));
    setScore(0);
    setHasAnswered(false);
    setSelectedOption(null);
    setPhase("quiz");
  }

  function handleOptionClick(option: QuizOption) {
    if (hasAnswered) return;

    setSelectedOption(option);
    setHasAnswered(true);
    if (option.isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    const isLast = currentIndex === currentQuestions.length - 1;
    if (isLast) {
      setPhase("results");
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCurrentOptions(getOptionsForQuestion(currentQuestions[nextIndex]));
    setHasAnswered(false);
    setSelectedOption(null);
  }

  function handleRestart() {
    startQuiz();
  }

  // 1) Welcome
  if (phase === "welcome") {
    return (
      <main className="fade-in">
        <h1>Crypto Jargon Quiz</h1>
        <p>
          Test your crypto vocab in 10 questions. No coins, no charts, just vibes
          and learning.
        </p>
        <button onClick={startQuiz}>Start quiz</button>
      </main>
    );
  }

  // 2) Quiz
  if (phase === "quiz") {
    const question = currentQuestions[currentIndex];
    const totalQuestions = currentQuestions.length;

    // progress from 0–100 (%)
    const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

    return (
      <main className="fade-in">
        <div className="quiz-meta" style={{ marginBottom: "0.5rem" }}>
          Question {currentIndex + 1} of {totalQuestions}
        </div>

        {/* Progress bar */}
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h2>{question.term}</h2>
        <p>What does this actually mean?</p>

        <ul>
          {currentOptions.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option.isCorrect;

            let background: string | undefined = undefined;
            if (hasAnswered) {
              if (isSelected && isCorrect) background = "#166534";
              else if (isSelected && !isCorrect) background = "#7f1d1d";
              else if (isCorrect) background = "#14532d";
            }

            return (
              <li
                key={index}
                style={{
                  cursor: hasAnswered ? "default" : "pointer",
                  background,
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </li>
            );
          })}
        </ul>

        {hasAnswered && (
          <div style={{ marginTop: "1rem" }}>
            <p>
              {selectedOption?.isCorrect
                ? "Nice! That’s correct."
                : "Not quite. Here’s the idea:"}
            </p>
            <p style={{ fontStyle: "italic" }}>{question.whyItMatters}</p>
          </div>
        )}

        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handleNext} disabled={!hasAnswered}>
            {currentIndex === currentQuestions.length - 1
              ? "See results"
              : "Next"}
          </button>
        </div>
      </main>
    );
  }

  // 3) Results
  if (phase === "results") {
    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    let label = "Crypto Curious";
    if (percentage >= 80) label = "On-Chain Adult";
    else if (percentage >= 50) label = "DeFi Teen";

    return (
      <main className="fade-in">
        <h1>Your results</h1>
        <p>
          You scored {score} out of {total} ({percentage}%)
        </p>
        <h2>{label}</h2>
        <p>This isn’t financial advice, but it might be vocabulary therapy. 🧠</p>

        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handleRestart}>Play again</button>
        </div>
      </main>
    );
  }

  return null;
}

export default App;
