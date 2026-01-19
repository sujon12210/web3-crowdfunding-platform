// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Campaign.sol";

contract CrowdFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(address campaignAddress, address creator, uint256 goal, uint256 deadline);

    function createCampaign(uint256 _goal, uint256 _durationInDays) public {
        uint256 deadline = block.timestamp + (_durationInDays * 1 days);
        Campaign newCampaign = new Campaign(_goal, deadline, msg.sender);
        deployedCampaigns.push(address(newCampaign));
        
        emit CampaignCreated(address(newCampaign), msg.sender, _goal, deadline);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
