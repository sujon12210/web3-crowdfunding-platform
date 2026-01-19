# Web3 Crowdfunding Platform

![Solidity](https://img.shields.io/badge/solidity-^0.8.19-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## Overview

**Web3 Crowdfunding Platform** eliminates the middleman fees of traditional platforms. It uses a "Factory" pattern to let anyone deploy their own fundraising smart contract. Contributors can trust the code: if the goal isn't reached, the money is locked for refunds only.

## Features

-   **Campaign Factory**: A master contract that spawns individual campaigns.
-   **Goal-Based Logic**: Funds cannot be withdrawn by the creator unless the target is hit.
-   **Refund Protection**: If the deadline passes without success, contributors can claim their ETH back.
-   **Request System**: (Optional advanced feature) Creators can be forced to ask for approval before spending funds.

## Workflow

1.  **Launch**: User calls `createCampaign(goal, deadline)`.
2.  **Pledge**: Supporters send ETH to the campaign address.
3.  **Finalize**:
    * **Success**: Creator calls `withdrawFunds()`.
    * **Fail**: Contributors call `claimRefund()`.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Factory
npx hardhat run deploy.js --network localhost

# 3. Create a Campaign (Target: 10 ETH)
node create_campaign.js

# 4. Contribute ETH
node contribute.js

# 5. Withdraw (if successful)
node withdraw_funds.js
