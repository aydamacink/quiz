import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useMemo, useState } from "react";

import {
  getQuizBadgeContract,
  BASE_MAINNET_CHAIN_ID,
  BASE_SEPOLIA_CHAIN_ID,
} from "./chain";
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

const ZERO_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const;

export default function App({ isMiniApp = false }: { isMiniApp?: boolean }) {
  /* -------------------- Quiz state -------------------- */
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

  /* -------------------- Farcaster ready -------------------- */
  useEffect(() => {
    if (isMiniApp && sdk?.actions?.ready) {
      sdk.actions.ready().catch(() => {});
    }
  }, [isMiniApp]);

  /* -------------------- Wallet -------------------- */
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const {
    connectors,
    connect,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();

  const contractAddress = getQuizBadgeContract(chainId);

  const isBaseMainnet = chainId === BASE_MAINNET_CHAIN_ID;
  const isBaseSepolia = chainId === BASE_SEPOLIA_CHAIN_ID;

  const expectedChainId = isMiniApp
    ? BASE_MAINNET_CHAIN_ID
    : BASE_SEPOLIA_CHAIN_ID;

  const isSupportedChain = chainId === expectedChainId;

  const isContractConfigured =
    !!contractAddress && contractAddress !== ZERO_ADDRESS;

  const basescanBase = isBaseMainnet
    ? "https://basescan.org"
    : isBaseSepolia
    ? "https://sepolia.basescan.org"
    : "https://sepolia.basescan.org";

  /* -------------------- Minting -------------------- */
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
    address: contractAddress,
    abi: QUIZ_BADGE_ABI,
    functionName: "hasMinted",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isSupportedChain && isContractConfigured,
    },
  });

  const disableMint =
    !!alreadyMinted ||
    isMinting ||
    isConfirming ||
    isConfirmed ||
    !isSupportedChain ||
    !isContractConfigured;

  const miniAppConnector = useMemo(() => {
    return connectors?.[0];
  }, [connectors]);

  function handleMiniAppConnect() {
    if (!miniAppConnector) return;
    connect({ connector: miniAppConnector });
  }

  function handleMintBadge(tokenId: bigint) {
    if (!isSupportedChain || !isContractConfigured) return;

    writeContract({
      address: contractAddress,
      abi: QUIZ_BADGE_ABI,
      functionName: "mintBadge",
      args: [tokenId],
    });
  }

  /* -------------------- Quiz flow -------------------- */
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
    if (currentIndex === currentQuestions.length - 1) {
      setPhase("results");
      return;
    }
    const next = currentIndex + 1;
    setCurrentIndex(next);
    setCurrentOptions(getOptionsForQuestion(currentQuestions[next]));
    setHasAnswered(false);
    setSelectedOption(null);
  }

  function handleRestart() {
    startQuiz();
  }

  /* -------------------- Timer -------------------- */
  useEffect(() => {
    if (phase !== "quiz") return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "quiz" && secondsLeft === 0) {
      setPhase("results");
    }
  }, [secondsLeft, phase]);

  /* -------------------- UI -------------------- */

  if (phase === "welcome") {
    return (
      <main className="fade-in welcome-screen">
        <h1>Crypto Jargon Quiz</h1>
        <p>Test your crypto vocab in 10 questions.</p>
        <button onClick={startQuiz}>Start quiz</button>
      </main>
    );
  }

  if (phase === "quiz") {
    const question = currentQuestions[currentIndex];

    return (
      <main className="fade-in">
        <h2>{question.term}</h2>

        <ul>
          {currentOptions.map((o, i) => {
            const isSelected = selectedOption?.text === o.text;

            return (
              <li
                key={i}
                onClick={() => handleOptionClick(o)}
                style={{
                  cursor: hasAnswered ? "default" : "pointer",
                  fontWeight: isSelected ? 700 : 400,
                  opacity: hasAnswered && !isSelected ? 0.6 : 1,
                  textDecoration:
                    hasAnswered && o.isCorrect ? "underline" : "none",
                }}
              >
                {o.text}
                {hasAnswered && isSelected && (o.isCorrect ? " ✅" : " ❌")}
              </li>
            );
          })}
        </ul>

        {hasAnswered && (
          <button onClick={handleNext}>
            {currentIndex === currentQuestions.length - 1
              ? "See results"
              : "Next"}
          </button>
        )}

        <p style={{ marginTop: "1rem", opacity: 0.7 }}>
          Time left: {secondsLeft}s
        </p>
      </main>
    );
  }

  /* -------------------- Results -------------------- */
  const percentage = Math.round((score / currentQuestions.length) * 100);
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
        You scored {score}/{currentQuestions.length} ({percentage}%)
      </p>
      <h2>{label}</h2>

      <button onClick={handleRestart}>Play again</button>

      <hr />

      <h2>Mint your badge</h2>

      {/* ---------- CONNECT ---------- */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {isMiniApp ? (
          <button onClick={handleMiniAppConnect} disabled={isConnecting}>
            {isConnected ? "Wallet connected ✅" : "Connect wallet"}
          </button>
        ) : (
          <>
            <ConnectButton />
            {isConnected && (
              <button onClick={() => disconnect()}>Disconnect</button>
            )}
          </>
        )}
      </div>

      {connectError && (
        <p style={{ color: "#fca5a5" }}>
          {connectError.message.split("\n")[0]}
        </p>
      )}

      {isConnected && (
        <>
          {chainId !== expectedChainId && (
            <p style={{ color: "#fbbf24" }}>
              Switch to{" "}
              {isMiniApp ? "Base Mainnet (8453)" : "Base Sepolia (84532)"}
            </p>
          )}

          <button
            onClick={() => handleMintBadge(tokenId)}
            disabled={disableMint}
          >
            {alreadyMinted
              ? "Badge already minted ✅"
              : isConfirmed
              ? "Confirmed ✅"
              : isConfirming
              ? "Confirming…"
              : isMinting
              ? "Minting…"
              : "Mint badge"}
          </button>

          {mintTxHash && (
            <a
              href={`${basescanBase}/tx/${mintTxHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on BaseScan ↗
            </a>
          )}

          {mintError && (
            <p style={{ color: "#fca5a5" }}>
              {mintError.message.split("\n")[0]}
            </p>
          )}
        </>
      )}
    </main>
  );
}
