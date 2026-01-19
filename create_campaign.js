const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./crowd_config.json");

async function main() {
    const [creator] = await ethers.getSigners();
    const factory = await ethers.getContractAt("CrowdFactory", config.FACTORY_ADDRESS, creator);

    console.log(`Creating campaign by ${creator.address}...`);

    const goal = ethers.parseEther("5"); // Goal: 5 ETH
    const days = 30; // Duration

    const tx = await factory.createCampaign(goal, days);
    await tx.wait();

    // Fetch the new campaign address from events
    // For simplicity in this script, we just grab the last one from the array
    const campaigns = await factory.getDeployedCampaigns();
    const newCampaignAddr = campaigns[campaigns.length - 1];

    console.log(`New Campaign Created at: ${newCampaignAddr}`);

    // Update config
    config.CAMPAIGN_ADDRESS = newCampaignAddr;
    fs.writeFileSync("crowd_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
