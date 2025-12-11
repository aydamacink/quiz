export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category =
  | "basics"
  | "chains"
  | "contracts"
  | "tokens"
  | "nfts"
  | "defi"
  | "culture"
  | "rwa";

export interface QuizQuestion {
  id: string;
  term: string;
  correctAnswer: string;
  wrongAnswers: string[];
  whyItMatters: string;
  category: Category;
  difficulty: Difficulty;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "wallet-1",
    term: "Wallet",
    correctAnswer: "An app or device that lets you manage your crypto keys and sign transactions.",
    wrongAnswers: [
      "A bank account that stores your euros and dollars.",
      "A website where you check crypto prices only."
    ],
    whyItMatters:
      "You need a wallet to actually interact with crypto: send, receive, and use apps.",
    category: "basics",
    difficulty: "beginner"
  },
  {
    id: "l1-1",
    term: "Layer 1",
    correctAnswer: "A base blockchain that other things can build on, like Ethereum or Bitcoin.",
    wrongAnswers: [
      "A second blockchain that helps the first one go faster.",
      "A special folder where you store NFTs."
    ],
    whyItMatters:
      "Layer 1 chains are the foundation. Everything else—tokens, NFTs, DeFi—lives on top of them.",
    category: "chains",
    difficulty: "beginner"
  }
];
