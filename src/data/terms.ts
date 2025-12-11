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
    category: "nfts",
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
  },

  // -------------------------
  // NEW QUESTIONS (10 MORE)
  // -------------------------

  {
    id: "token-1",
    term: "Token",
    correctAnswer: "A digital asset created on a blockchain, often representing value or utility.",
    wrongAnswers: [
      "A physical coin used in crypto arcades.",
      "A password for unlocking special wallet features."
    ],
    whyItMatters:
      "Tokens power nearly everything on-chain: payments, governance, rewards, and access.",
    category: "tokens",
    difficulty: "beginner"
  },
  {
    id: "dex-1",
    term: "DEX",
    correctAnswer: "A decentralized exchange where users trade crypto directly from their wallets.",
    wrongAnswers: [
      "A database for storing NFT images.",
      "A government site for reporting crypto taxes."
    ],
    whyItMatters:
      "DEXs let you swap tokens without banks, sign-ups, or custodians — a core part of DeFi.",
    category: "defi",
    difficulty: "beginner"
  },
  {
    id: "mint-1",
    term: "Minting",
    correctAnswer: "The process of creating a new NFT or token on a blockchain.",
    wrongAnswers: [
      "Cleaning old tokens from your wallet.",
      "Copying an NFT to make a backup."
    ],
    whyItMatters:
      "Minting is how new digital assets come into existence, from NFTs to game items to membership passes.",
    category: "nfts",
    difficulty: "beginner"
  },
  {
    id: "publickey-1",
    term: "Public Key",
    correctAnswer: "An address you can share so people can send you crypto.",
    wrongAnswers: [
      "A secret phrase that unlocks your wallet.",
      "A receipt showing all your past transactions."
    ],
    whyItMatters:
      "You need a public key to receive tokens safely while keeping your private key hidden.",
    category: "security",
    difficulty: "beginner"
  },
  {
    id: "stablecoin-1",
    term: "Stablecoin",
    correctAnswer: "A cryptocurrency designed to keep a stable value, usually pegged to a currency like USD.",
    wrongAnswers: [
      "A token that never changes price because it has no trading volume.",
      "A coin that gives higher rewards the longer you hold it."
    ],
    whyItMatters:
      "Stablecoins make crypto easier to use for payments, savings, and trading without volatility.",
    category: "tokens",
    difficulty: "beginner"
  },
  {
    id: "block-1",
    term: "Block",
    correctAnswer: "A batch of transactions bundled together and added to the blockchain.",
    wrongAnswers: [
      "A folder in your wallet for organizing coins.",
      "A tool miners use to slow down fast transactions."
    ],
    whyItMatters:
      "Blocks form the blockchain itself. Understanding them helps you grasp how networks stay secure.",
    category: "infrastructure",
    difficulty: "beginner"
  },
  {
    id: "address-1",
    term: "Wallet Address",
    correctAnswer: "A string of characters that identifies where crypto can be sent.",
    wrongAnswers: [
      "Your home address linked to your wallet.",
      "A location where your physical coins are stored."
    ],
    whyItMatters:
      "Knowing how to use addresses safely prevents loss of funds and ensures successful transactions.",
    category: "basics",
    difficulty: "beginner"
  },
  {
    id: "airdrop-1",
    term: "Airdrop",
    correctAnswer: "A distribution of tokens to users, often as a reward or incentive.",
    wrongAnswers: [
      "A fee charged when your wallet is empty.",
      "A tool for sending NFTs through Bluetooth."
    ],
    whyItMatters:
      "Airdrops encourage participation and help new users explore ecosystems like Base.",
    category: "culture",
    difficulty: "beginner"
  },
  {
    id: "bridgefee-1",
    term: "Bridge Fee",
    correctAnswer: "A fee you pay when moving tokens between networks, often covering gas on both chains.",
    wrongAnswers: [
      "A penalty for using too many wallets.",
      "A subscription for keeping tokens synced."
    ],
    whyItMatters:
      "When bridging to Base or other L2s, knowing fees helps users avoid surprises.",
    category: "transactions",
    difficulty: "intermediate"
  },
  {
    id: "l2-1",
    term: "Layer 2",
    correctAnswer: "A network built on top of a Layer 1 to make transactions faster and cheaper.",
    wrongAnswers: [
      "A blockchain that replaces Layer 1 entirely.",
      "A mining tool used to speed up block creation."
    ],
    whyItMatters:
      "Base is a Layer 2. Understanding L2s explains why crypto can scale while staying secure.",
    category: "chains",
    difficulty: "beginner"
  },
  {
  id: "aa-1",
  term: "Account Abstraction",
  correctAnswer: "A way to make wallets behave like smart contracts, enabling features like gasless transactions and social recovery.",
  wrongAnswers: [
    "A process that hides your wallet balance from apps.",
    "A new type of blockchain that removes the need for addresses."
  ],
  whyItMatters:
    "Account abstraction makes crypto easier and safer for everyday users. Smart wallets on Base use it.",
  category: "contracts",
  difficulty: "intermediate"
},
{
  id: "rollup-1",
  term: "Rollup",
  correctAnswer: "A Layer 2 system that batches many transactions and posts them to a Layer 1 for security.",
  wrongAnswers: [
    "A new token standard for creating lightweight NFTs.",
    "A tool that compresses blockchain data into a PDF."
  ],
  whyItMatters:
    "Rollups make Ethereum scalable. Base is an optimistic rollup built with the OP Stack.",
  category: "chains",
  difficulty: "intermediate"
},
{
  id: "slippage-1",
  term: "Slippage",
  correctAnswer: "The difference between the expected price of a trade and the price it actually executes at.",
  wrongAnswers: [
    "A fee charged when your wallet disconnects.",
    "A penalty for swapping tokens too quickly."
  ],
  whyItMatters:
    "Understanding slippage is important when swapping on DEXs so you don’t lose money unexpectedly.",
  category: "defi",
  difficulty: "intermediate"
},
{
  id: "liquiditypool-1",
  term: "Liquidity Pool",
  correctAnswer: "A pool of tokens locked in a smart contract that enables decentralized trading.",
  wrongAnswers: [
    "A list of wallets that own more than 1,000 tokens.",
    "A graphic showing how much water is in your crypto wallet."
  ],
  whyItMatters:
    "Liquidity pools power DEXs. Without them, trading would be slow or impossible.",
  category: "defi",
  difficulty: "intermediate"
},
{
  id: "gaslimit-1",
  term: "Gas Limit",
  correctAnswer: "The maximum amount of gas a user is willing to spend on a transaction.",
  wrongAnswers: [
    "A monthly allowance of free transactions.",
    "A cap on how many wallets you can connect."
  ],
  whyItMatters:
    "Setting a proper gas limit helps ensure your transactions don’t fail due to running out of gas.",
  category: "transactions",
  difficulty: "intermediate"
},
{
  id: "governance-1",
  term: "Governance Token",
  correctAnswer: "A token that gives holders voting power in a protocol’s decisions.",
  wrongAnswers: [
    "A token that automatically blocks scam transactions.",
    "A coin used only to pay protocol fees."
  ],
  whyItMatters:
    "Governance tokens allow communities to influence how DeFi protocols evolve.",
  category: "tokens",
  difficulty: "intermediate"
},
{
  id: "multisig-1",
  term: "Multisig Wallet",
  correctAnswer: "A wallet that requires approval from multiple keys to sign a transaction.",
  wrongAnswers: [
    "A wallet that splits your private key into three parts.",
    "A device that automatically signs your transactions while offline."
  ],
  whyItMatters:
    "Multisig increases security for teams, DAOs, and shared treasuries.",
  category: "security",
  difficulty: "intermediate"
},
{
  id: "rugpull-1",
  term: "Rug Pull",
  correctAnswer: "A scam where developers drain liquidity or disappear with user funds.",
  wrongAnswers: [
    "A bug that temporarily freezes your wallet.",
    "A penalty for swapping low-market-cap tokens."
  ],
  whyItMatters:
    "Recognizing red flags can help users avoid scams in DeFi and NFT projects.",
  category: "culture",
  difficulty: "intermediate"
},
{
  id: "whitelist-1",
  term: "Whitelist",
  correctAnswer: "A list of addresses approved to mint or access something before the public.",
  wrongAnswers: [
    "A list of banned wallets in a protocol.",
    "A setting that hides your transaction history."
  ],
  whyItMatters:
    "Many NFT drops and early-access apps use whitelists to manage demand and reward early supporters.",
  category: "nfts",
  difficulty: "beginner"
},
{
  id: "hash-1",
  term: "Hash",
  correctAnswer: "A fixed-length output created from data using a cryptographic function.",
  wrongAnswers: [
    "A backup file of your wallet.",
    "A secret phrase used to reset your private key."
  ],
  whyItMatters:
    "Hashes secure blockchains, protect data integrity, and form the basis of blocks and addresses.",
  category: "infrastructure",
  difficulty: "intermediate"
},
{
  id: "seedphrase-1",
  term: "Seed Phrase",
  correctAnswer: "A list of words that can restore your wallet and all its funds.",
  wrongAnswers: [
    "A passcode you share so others can send you crypto.",
    "A phrase that boosts your mining rewards."
  ],
  whyItMatters:
    "Your seed phrase controls your entire wallet. If you lose it—or someone steals it—you lose everything.",
  category: "security",
  difficulty: "beginner"
},
{
  id: "dapp-1",
  term: "dApp",
  correctAnswer: "A decentralized application that runs on a blockchain instead of a central server.",
  wrongAnswers: [
    "A premium version of a crypto app.",
    "A program that cleans spam transactions."
  ],
  whyItMatters:
    "dApps are how users interact with DeFi, NFTs, games, and on-chain tools like Base miniapps.",
  category: "contracts",
  difficulty: "beginner"
},
{
  id: "bridge-tokens-1",
  term: "Bridged Token",
  correctAnswer: "A token that represents an asset moved from another chain.",
  wrongAnswers: [
    "A token used only to pay bridge fees.",
    "A token created when your wallet splits into two."
  ],
  whyItMatters:
    "Bridged tokens let users take assets from one chain, like Ethereum, and use them on Base.",
  category: "tokens",
  difficulty: "beginner"
},
{
  id: "explorer-1",
  term: "Blockchain Explorer",
  correctAnswer: "A website where you can view addresses, transactions, and blocks.",
  wrongAnswers: [
    "A crypto browser that hides your identity.",
    "A tool for automatically approving your transactions."
  ],
  whyItMatters:
    "Explorers like Basescan help you verify activity, track history, and troubleshoot transactions.",
  category: "infrastructure",
  difficulty: "beginner"
},
{
  id: "swap-1",
  term: "Swap",
  correctAnswer: "Exchanging one token for another using a decentralized exchange.",
  wrongAnswers: [
    "A feature that resets your wallet balance.",
    "A tool for trading NFTs into tokens automatically."
  ],
  whyItMatters:
    "Swapping is one of the most common actions in DeFi and is required to get the tokens you need.",
  category: "defi",
  difficulty: "beginner"
},
{
  id: "oracle-1",
  term: "Oracle",
  correctAnswer: "A service that provides real-world or off-chain data to smart contracts.",
  wrongAnswers: [
    "A prediction game built into most wallets.",
    "A tool that accelerates block production."
  ],
  whyItMatters:
    "DeFi relies on oracles for price feeds and external data. Without them, protocols can't function safely.",
  category: "infrastructure",
  difficulty: "intermediate"
},
{
  id: "amm-1",
  term: "AMM",
  correctAnswer: "An automated market maker — a system that sets token prices using liquidity pools.",
  wrongAnswers: [
    "A miner that automatically approves transactions.",
    "An algorithm that scans for NFT deals."
  ],
  whyItMatters:
    "AMMs make decentralized trading possible without traditional order books.",
  category: "defi",
  difficulty: "intermediate"
},
{
  id: "sequencer-1",
  term: "Sequencer",
  correctAnswer: "A system that orders and submits Layer 2 transactions to the Layer 1 chain.",
  wrongAnswers: [
    "A bot that organizes your NFTs by rarity.",
    "A wallet tool that increases your gas fees automatically."
  ],
  whyItMatters:
    "Layer 2s like Base rely on sequencers to process transactions fast before finalizing them on Ethereum.",
  category: "infrastructure",
  difficulty: "intermediate"
},
{
  id: "flashloan-1",
  term: "Flash Loan",
  correctAnswer: "A loan taken and repaid within one transaction using a smart contract.",
  wrongAnswers: [
    "A short-term loan your wallet gives you every month.",
    "A trick for doubling your tokens instantly."
  ],
  whyItMatters:
    "Flash loans enable advanced DeFi strategies but can also be exploited in attacks.",
  category: "defi",
  difficulty: "intermediate"
},
{
  id: "poap-1",
  term: "POAP",
  correctAnswer: "A digital badge that proves you attended an event, stored as an NFT.",
  wrongAnswers: [
    "A token that boosts your on-chain reputation score.",
    "A certification required to use DeFi apps."
  ],
  whyItMatters:
    "POAPs are widely used in crypto culture to reward participation and build community identity.",
  category: "culture",
  difficulty: "intermediate"
},
{
  id: "mev-1",
  term: "MEV",
  correctAnswer: "The profit that can be made by reordering, inserting, or censoring transactions in a block.",
  wrongAnswers: [
    "A metric that shows how many validators are online.",
    "A special fee users pay to speed up swaps."
  ],
  whyItMatters:
    "MEV affects fairness and transaction outcomes. Understanding it helps users grasp risks like sandwich attacks.",
  category: "infrastructure",
  difficulty: "advanced"
},
{
  id: "zk-proof-1",
  term: "Zero-Knowledge Proof",
  correctAnswer: "A cryptographic method that proves something is true without revealing the underlying information.",
  wrongAnswers: [
    "A blockchain that hides all transaction fees.",
    "A backup system that automatically restores your wallet."
  ],
  whyItMatters:
    "ZK proofs enable privacy, scalability, and trustless verification in modern blockchain systems.",
  category: "security",
  difficulty: "advanced"
},
{
  id: "optimistic-rollup-1",
  term: "Optimistic Rollup",
  correctAnswer: "A Layer 2 scaling solution that assumes transactions are valid unless proven otherwise via fraud proofs.",
  wrongAnswers: [
    "A blockchain that only runs optimistic transactions.",
    "A smart contract that guarantees 0% slippage."
  ],
  whyItMatters:
    "Base is an optimistic rollup. Understanding this helps users grasp fraud proofs, security assumptions, and L2 trust models.",
  category: "chains",
  difficulty: "advanced"
},
{
  id: "reentrancy-1",
  term: "Reentrancy Attack",
  correctAnswer: "An exploit where a contract is called repeatedly before it updates its state, draining funds.",
  wrongAnswers: [
    "A network attack that forces your wallet to reconnect.",
    "An issue caused by entering the wrong seed phrase multiple times."
  ],
  whyItMatters:
    "Reentrancy was behind major DeFi hacks. Advanced users should understand contract risk.",
  category: "security",
  difficulty: "advanced"
},
{
  id: "slashing-1",
  term: "Slashing",
  correctAnswer: "A penalty that removes part of a validator’s stake for misbehavior or going offline.",
  wrongAnswers: [
    "A feature that lowers gas fees during network congestion.",
    "A tax applied when selling staked tokens early."
  ],
  whyItMatters:
    "Slashing protects proof-of-stake networks by incentivizing honest behavior and uptime.",
  category: "infrastructure",
  difficulty: "advanced"
},
{
  id: "impermanentloss-1",
  term: "Impermanent Loss",
  correctAnswer: "The temporary loss LPs experience when token prices diverge from when they entered a liquidity pool.",
  wrongAnswers: [
    "A penalty you pay for withdrawing liquidity early.",
    "A type of wallet loss that happens if you forget your public key."
  ],
  whyItMatters:
    "DeFi users providing liquidity must understand impermanent loss to avoid unexpected losses.",
  category: "defi",
  difficulty: "advanced"
},
{
  id: "eip4844-1",
  term: "EIP-4844 (Proto-Danksharding)",
  correctAnswer: "An Ethereum upgrade introducing blob transactions to drastically reduce L2 costs.",
  wrongAnswers: [
    "A privacy feature that hides validator identities.",
    "A new NFT metadata format on IPFS."
  ],
  whyItMatters:
    "Base and other L2s rely on blob space for cheaper data availability, making crypto more scalable.",
  category: "infrastructure",
  difficulty: "advanced"
},
{
  id: "yieldfarming-1",
  term: "Yield Farming",
  correctAnswer: "A DeFi strategy where users move capital between protocols to earn rewards or maximize yield.",
  wrongAnswers: [
    "Planting tokens that grow into new coins over time.",
    "A staking method used only by validators."
  ],
  whyItMatters:
    "Advanced DeFi users often optimize yield but face risks like liquidation, volatility, and protocol exploits.",
  category: "defi",
  difficulty: "advanced"
},
{
  id: "dao-1",
  term: "DAO",
  correctAnswer: "A decentralized autonomous organization where governance is executed transparently through smart contracts.",
  wrongAnswers: [
    "A marketplace for trading digital organizations.",
    "A private club that manages crypto wallets for members."
  ],
  whyItMatters:
    "DAOs coordinate people and capital at scale, influencing funding, protocol direction, and public goods.",
  category: "culture",
  difficulty: "advanced"
},
{
  id: "sequencer-failure-1",
  term: "Sequencer Failure",
  correctAnswer: "A situation where a Layer 2 sequencer stops producing blocks, causing delays until users fall back to L1.",
  wrongAnswers: [
    "A wallet bug that prevents you from swapping tokens.",
    "A mining error that resets the gas price."
  ],
  whyItMatters:
    "Knowing how L2 sequencer downtime works helps users understand liveness assumptions and fallback security.",
  category: "infrastructure",
  difficulty: "advanced"
}
];

