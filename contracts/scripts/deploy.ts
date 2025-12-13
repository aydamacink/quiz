import { ethers } from "hardhat";

async function main() {
  const uri = "https://cryptoquiz-omega.vercel.app/metadata/{id}.json";

  const QuizBadge = await ethers.getContractFactory("QuizBadge");
  const quizBadge = await QuizBadge.deploy(uri);

  await quizBadge.waitForDeployment();

  const address = await quizBadge.getAddress();
  console.log("✅ QuizBadge deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
