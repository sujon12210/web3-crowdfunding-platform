const { ethers } = require("hardhat");
const config = require("./crowd_config.json");

async function main() {
    const [_, contributor] = await ethers.getSigners();
    const campaign = await ethers.getContractAt("Campaign", config.CAMPAIGN_ADDRESS, contributor);

    console.log("Attempting to claim refund...");

    try {
        const tx = await campaign.claimRefund();
        await tx.wait();
        console.log("Refund Processed Successfully!");
    } catch (e) {
        console.error("Refund Failed (Campaign active or goal met?):", e.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
