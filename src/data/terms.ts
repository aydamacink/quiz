export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category =
  | "basics"
  | "chains"
  | "contracts"
  | "tokens"
  | "nfts"
  | "defi"
  | "culture"
  | "transactions"
  | "security"
  | "infrastructure"
  | "assets";

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
  },
  {
  id: "gas-1",
  term: "Gas Fee",
  correctAnswer: "A small cost you pay to process a transaction on a blockchain.",
  wrongAnswers: [
    "A payment you make to refill your crypto wallet with tokens.",
    "A monthly subscription for using blockchain apps."
  ],
  whyItMatters:
    "Every action on-chain requires gas. Understanding gas helps you avoid failed or expensive transactions.",
  category: "transactions",
  difficulty: "beginner"
},
{
  id: "signature-1",
  term: "Signature",
  correctAnswer: "A cryptographic approval that lets your wallet confirm a transaction or message.",
  wrongAnswers: [
    "Your handwritten name scanned into your wallet.",
    "A stamp that guarantees a token is valuable."
  ],
  whyItMatters:
    "Signing proves it's *you* taking the action without revealing your private keys. It’s core to using any crypto app.",
  category: "security",
  difficulty: "beginner"
},
{
  id: "rpc-1",
  term: "RPC",
  correctAnswer: "A connection point your wallet or app uses to read and send data to a blockchain.",
  wrongAnswers: [
    "A type of crypto tax form.",
    "A robot that automates your crypto trades."
  ],
  whyItMatters:
    "Without an RPC, your wallet can’t talk to the network — no balances, no transactions, no app interactions.",
  category: "infrastructure",
  difficulty: "beginner"
},
{
  id: "bridge-1",
  term: "Bridge",
  correctAnswer: "A tool that lets you move tokens from one blockchain or network to another.",
  wrongAnswers: [
    "A place to store tokens you don’t use often.",
    "A feature that upgrades your wallet automatically."
  ],
  whyItMatters:
    "Bridges help you access different ecosystems. On Base, many users bridge ETH from Ethereum to start.",
  category: "chains",
  difficulty: "beginner"
},
{
  id: "faucet-1",
  term: "Faucet",
  correctAnswer: "A service that gives you a small amount of testnet tokens for free.",
  wrongAnswers: [
    "A tool that multiplies your crypto overnight.",
    "A setting in your wallet that speeds up transactions."
  ],
  whyItMatters:
    "You need testnet tokens to experiment safely without risking real money. Faucets let beginners try out blockchain actions on testnets.",
  category: "basics",
  difficulty: "beginner"
},
{
  id: "nft-1",
  term: "NFT",
  correctAnswer: "A unique digital asset stored on a blockchain, often representing art, items, or identity.",
  wrongAnswers: [
    "A file that must be saved on your computer to be valuable.",
    "A type of cryptocurrency that always increases in price."
  ],
  whyItMatters:
    "NFTs unlock on-chain identity, membership, digital ownership, and fun app experiences.",
  category: "assets",
  difficulty: "beginner"
},
{
  id: "smartcontract-1",
  term: "Smart Contract",
  correctAnswer: "Code on a blockchain that runs automatically when conditions are met.",
  wrongAnswers: [
    "A digital contract you must sign manually every time.",
    "A long legal document stored in your wallet."
  ],
  whyItMatters:
    "Smart contracts power apps on Base. They enable trustless actions like swaps, mints, and staking.",
  category: "contracts",
  difficulty: "beginner"
},
{
  id: "privatekey-1",
  term: "Private Key",
  correctAnswer: "A secret code that proves ownership of your wallet and allows access to your funds.",
  wrongAnswers: [
    "A password used only to unlock staking rewards.",
    "A public link you can share to get paid in crypto."
  ],
  whyItMatters:
    "If someone gets your private key, they have full control of your wallet. Keeping it safe is critical.",
  category: "security",
  difficulty: "beginner"
}

];
