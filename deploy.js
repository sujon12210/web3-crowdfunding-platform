const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("Deploying Factory...");

    const Factory = await ethers.getContractFactory("CrowdFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();
    
    const address = await factory.getAddress();
    console.log("CrowdFactory deployed at:", address);

    // Save Config
    const config = { FACTORY_ADDRESS: address, CAMPAIGN_ADDRESS: "" };
    fs.writeFileSync("crowd_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
