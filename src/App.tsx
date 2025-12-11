import { useMemo, useState } from "react";
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

  const totalQuestions = currentQuestions.length;
  const progress = useMemo(() => {
    if (phase !== "quiz") return 0;
    return Math.round(((currentIndex + 1) / totalQuestions) * 100);
  }, [currentIndex, phase, totalQuestions]);

  // 1) Welcome
  if (phase === "welcome") {
    return (
      <main className="app-card fade-in">
        <p className="eyebrow">10 bite-sized questions</p>
        <h1>Crypto Jargon Quiz</h1>
        <p className="description">
          Learn the most common onchain jargon in a snackable format built for
          any screen size.
        </p>
        <ul className="feature-list">
          <li>Fresh set of questions every run</li>
          <li>Tap-friendly answer cards</li>
          <li>Instant context on every term</li>
        </ul>
        <button onClick={startQuiz}>Start quiz</button>
      </main>
    );
  }

  // 2) Quiz
  if (phase === "quiz") {
    const question = currentQuestions[currentIndex];

    return (
      <main className="app-card fade-in" aria-live="polite">
        <div className="quiz-header">
          <div className="quiz-meta">
            Question {currentIndex + 1} of {currentQuestions.length}
          </div>
          <div className="progress" role="img" aria-label={`Progress ${progress}%`}>
            <span className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <section className="question-block">
          <h2>{question.term}</h2>
          <p>What does this actually mean?</p>
        </section>

        <ul className="options-grid">
          {currentOptions.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option.isCorrect;
            const optionClasses = ["option"];

            if (isSelected && !hasAnswered) optionClasses.push("option--active");
            if (hasAnswered && isCorrect) optionClasses.push("option--correct");
            if (hasAnswered && isSelected && !isCorrect)
              optionClasses.push("option--incorrect");
            if (hasAnswered && isCorrect && !isSelected)
              optionClasses.push("option--reveal");

            return (
              <li
                key={index}
                className={optionClasses.join(" ")}
                onClick={() => handleOptionClick(option)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-disabled={hasAnswered}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOptionClick(option);
                  }
                }}
              >
                {option.text}
              </li>
            );
          })}
        </ul>

        {hasAnswered && (
          <section className="explanation-card">
            <p>
              {selectedOption?.isCorrect
                ? "Nice! That’s correct."
                : "Not quite. Here’s the idea:"}
            </p>
            <p className="explanation-text">{question.whyItMatters}</p>
          </section>
        )}

        <div className="actions">
          <button onClick={handleNext} disabled={!hasAnswered}>
            {currentIndex === currentQuestions.length - 1
              ? "See results"
              : "Next question"}
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
      <main className="app-card fade-in results-card">
        <p className="eyebrow">Quiz complete</p>
        <h1>Your results</h1>
        <div className="score-pill">
          <strong>{score}</strong>
          <span>out of {total}</span>
        </div>
        <p className="percentage">{percentage}%</p>
        <h2>{label}</h2>
        <p className="description">
          This isn’t financial advice, but it might be vocabulary therapy. 🧠
        </p>

        <div className="actions">
          <button onClick={handleRestart}>Play again</button>
        </div>
      </main>
    );
  }

  return null;
}

export default App;
