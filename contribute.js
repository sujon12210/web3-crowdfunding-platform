const { ethers } = require("hardhat");
const config = require("./crowd_config.json");

async function main() {
    const [_, contributor] = await ethers.getSigners(); // Use 2nd account
    const campaign = await ethers.getContractAt("Campaign", config.CAMPAIGN_ADDRESS, contributor);

    const amount = ethers.parseEther("1.0");

    console.log(`Contributing 1 ETH from ${contributor.address}...`);

    const tx = await campaign.pledge({ value: amount });
    await tx.wait();

    console.log("Pledge Successful!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
