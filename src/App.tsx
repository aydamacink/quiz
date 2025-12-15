import {
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useMemo, useState } from "react";

import { QUIZ_BADGE_CONTRACT } from "./chain";
import { QUESTIONS } from "./data/terms";
import {
  getOptionsForQuestion,
  pickRandomQuestions,
  type QuizOption,
} from "./quiz/utils";

type Phase = "welcome" | "quiz" | "results";
const QUIZ_LENGTH = 10;
const QUIZ_DURATION_SECONDS = 50;

const QUIZ_BADGE_ABI = [
  {
    name: "mintBadge",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [],
  },
  {
    name: "hasMinted",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export default function App({ isMiniApp }: { isMiniApp?: boolean }) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentQuestions, setCurrentQuestions] = useState(() =>
    pickRandomQuestions(QUESTIONS, QUIZ_LENGTH)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<QuizOption[]>(() =>
    getOptionsForQuestion(currentQuestions[0])
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_DURATION_SECONDS);

  // Farcaster Mini App: tell the host we're ready (safe no-op in normal browsers)
  useEffect(() => {
    if (!sdk?.actions?.ready) return;
    sdk.actions.ready().catch(() => {});
  }, []);

  // --- Wallet + mint badge ---
  const { address, isConnected, chainId } = useAccount();
  const isOnBaseSepolia = chainId === 84532;

  const {
    connectors,
    connect,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();

  const {
    data: mintTxHash,
    writeContract,
    isPending: isMinting,
    error: mintError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: mintTxHash,
    });

  const { data: alreadyMinted } = useReadContract({
    address: QUIZ_BADGE_CONTRACT,
    abi: QUIZ_BADGE_ABI,
    functionName: "hasMinted",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const disableMint = !!alreadyMinted || isMinting || isConfirming || isConfirmed;

  const basescanBase =
    chainId === 8453 ? "https://basescan.org" : "https://sepolia.basescan.org";

  const miniAppConnector = useMemo(() => {
    // In Mini App mode you should have exactly one connector from farcasterMiniApp()
    return connectors?.[0];
  }, [connectors]);

  function handleMiniAppConnect() {
    if (!miniAppConnector) return;
    connect({ connector: miniAppConnector });
  }

  function handleMintBadge(tokenId: bigint) {
    writeContract({
      address: QUIZ_BADGE_CONTRACT,
      abi: QUIZ_BADGE_ABI,
      functionName: "mintBadge",
      args: [tokenId],
    });
  }

  // --- Quiz flow ---
  function startQuiz() {
    const qs = pickRandomQuestions(QUESTIONS, QUIZ_LENGTH);
    setCurrentQuestions(qs);
    setCurrentIndex(0);
    setCurrentOptions(getOptionsForQuestion(qs[0]));
    setScore(0);
    setHasAnswered(false);
    setSelectedOption(null);
    setSecondsLeft(QUIZ_DURATION_SECONDS);
    setPhase("quiz");
  }

  function handleOptionClick(option: QuizOption) {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);
    if (option.isCorrect) setScore((prev) => prev + 1);
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

  // Timer
  useEffect(() => {
    if (phase !== "quiz") return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "quiz" && secondsLeft === 0) {
      setPhase("results");
    }
  }, [phase, secondsLeft]);

  // 1) Welcome
  if (phase === "welcome") {
    return (
      <main className="fade-in welcome-screen">
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

    const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    const isTimeLow = secondsLeft <= 15;

    return (
      <main className="fade-in">
        <div className="quiz-status">
          <div className="quiz-meta">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
          <div
            className={`timer-pill${isTimeLow ? " timer-pill--danger" : ""}`}
            aria-live="polite"
          >
            ⏱ {formattedTime}
          </div>
        </div>

        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <section
          key={`${question.term}-${currentIndex}`}
          className="question-block question-step"
        >
          <h2>{question.term}</h2>
          <p>What does this actually mean on-chain?</p>
        </section>

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
          <section className="explanation-card" aria-live="polite">
            <div className="explanation-card__icon" aria-hidden="true">
              💡
            </div>
            <div className="explanation-card__content">
              <p className="explanation-card__title">
                {selectedOption?.isCorrect
                  ? "Nailed it 🔥"
                  : "🤕 Let’s break it down:"}
              </p>
              <p className="explanation-text">{question.whyItMatters}</p>
            </div>
          </section>
        )}

        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handleNext} disabled={!hasAnswered}>
            {currentIndex === currentQuestions.length - 1 ? "See results" : "Next"}
          </button>
        </div>
      </main>
    );
  }

  // 3) Results + badge mint
  if (phase === "results") {
    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);

    let label = "Crypto Curious";
    let tokenId = 1n;

    if (percentage >= 80) {
      label = "On-Chain Adult";
      tokenId = 3n;
    } else if (percentage >= 50) {
      label = "DeFi Teen";
      tokenId = 2n;
    }

    return (
      <main className="fade-in">
        <h1>Your results</h1>
        <p>
          You scored {score} out of {total} ({percentage}%)
        </p>
        <h2>{label}</h2>
        <p>This isn’t financial advice, but it might be vocabulary therapy. 🧠</p>

        <div style={{ marginTop: "1.25rem" }}>
          <button onClick={handleRestart}>Play again</button>
        </div>

        <hr
          style={{
            margin: "1.75rem 0",
            borderColor: "rgba(148,163,184,0.3)",
          }}
        />

        <h2 style={{ marginTop: 0 }}>Mint your badge</h2>
        <p style={{ marginTop: "0.25rem" }}>
          Claim a completion badge on <strong>Base Sepolia</strong>.
        </p>

        <div style={{ marginTop: "0.75rem" }}>
          {isMiniApp ? (
            <button onClick={handleMiniAppConnect} disabled={isConnecting}>
              {isConnected
                ? "Wallet connected ✅"
                : isConnecting
                ? "Connecting…"
                : "Connect wallet"}
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>

        {isMiniApp && connectError && (
          <p style={{ marginTop: "0.75rem", color: "#fca5a5" }}>
            {connectError.message.split("\n")[0]}
          </p>
        )}

        {isConnected && (
          <>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#9ca3af",
                marginTop: "0.75rem",
              }}
            >
              Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
            </p>

            {!isOnBaseSepolia ? (
              <p style={{ marginTop: "0.75rem", color: "#fbbf24" }}>
                Your wallet is on the wrong network. Please switch to{" "}
                <strong>Base Sepolia</strong> (chain ID 84532) and try again.
              </p>
            ) : (
              <>
                <button
                  onClick={() => handleMintBadge(tokenId)}
                  disabled={disableMint}
                  style={{ marginTop: "0.75rem" }}
                >
                  {alreadyMinted
                    ? "Badge already minted ✅"
                    : isConfirmed
                    ? "Confirmed ✅"
                    : isConfirming
                    ? "Confirming…"
                    : isMinting
                    ? "Minting…"
                    : "Mint completion badge"}
                </button>

                {alreadyMinted && (
                  <p style={{ marginTop: "0.75rem", color: "#fbbf24" }}>
                    You already minted a badge with this wallet.
                  </p>
                )}

                {mintError && (
                  <p style={{ marginTop: "0.75rem", color: "#fca5a5" }}>
                    {mintError.message.split("\n")[0]}
                  </p>
                )}

                {mintTxHash && (
                  <p style={{ marginTop: "0.75rem" }}>
                    <a
                      href={`${basescanBase}/tx/${mintTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View transaction on BaseScan ↗
                    </a>
                  </p>
                )}

                {isConfirming && (
                  <p style={{ marginTop: "0.5rem" }}>⏳ Confirming on-chain…</p>
                )}

                {isConfirmed && (
                  <p style={{ marginTop: "0.5rem" }}>✅ Confirmed on-chain!</p>
                )}
              </>
            )}
          </>
        )}
      </main>
    );
  }

  return null;
}
