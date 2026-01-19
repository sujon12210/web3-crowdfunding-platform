const { ethers } = require("hardhat");
const config = require("./crowd_config.json");

async function main() {
    const [creator] = await ethers.getSigners();
    const campaign = await ethers.getContractAt("Campaign", config.CAMPAIGN_ADDRESS, creator);

    console.log("Attempting to withdraw funds...");

    try {
        const tx = await campaign.withdrawFunds();
        await tx.wait();
        console.log("Funds Withdrawn to Creator Wallet!");
    } catch (e) {
        console.error("Withdraw Failed (Goal not met?):", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
