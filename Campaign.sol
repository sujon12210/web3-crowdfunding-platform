// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Campaign {
    address public creator;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalPledged;
    bool public finalized;

    mapping(address => uint256) public pledges;

    event Pledged(address indexed contributor, uint256 amount);
    event Refunded(address indexed contributor, uint256 amount);
    event FundsWithdrawn(address indexed creator, uint256 amount);

    constructor(uint256 _goal, uint256 _deadline, address _creator) {
        goal = _goal;
        deadline = _deadline;
        creator = _creator;
    }

    function pledge() public payable {
        require(block.timestamp < deadline, "Campaign ended");
        require(msg.value > 0, "Amount must be > 0");

        pledges[msg.sender] += msg.value;
        totalPledged += msg.value;
        
        emit Pledged(msg.sender, msg.value);
    }

    function withdrawFunds() public {
        require(msg.sender == creator, "Not creator");
        require(address(this).balance >= goal, "Goal not met");
        require(!finalized, "Already finalized");

        finalized = true;
        (bool success, ) = creator.call{value: address(this).balance}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(creator, totalPledged);
    }

    function claimRefund() public {
        require(block.timestamp > deadline, "Campaign still active");
        require(address(this).balance < goal, "Goal was met, cannot refund");

        uint256 amount = pledges[msg.sender];
        require(amount > 0, "No pledge found");

        pledges[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");

        emit Refunded(msg.sender, amount);
    }
}
