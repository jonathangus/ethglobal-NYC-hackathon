// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Roadmap is Ownable {
    bool public reverted = false;
    uint256 private reservedAmount;

    enum StepTypes {
        GONVERNANE,
        CALLDATA
    }

    struct Step {
        StepTypes stepType;
        bytes4 data;
        string message;
        bool completed;
    }

    event StepCreated(StepTypes stepType, bytes4 data, string message);
    event StepExecuted(uint256 stepId);

    Step[] public steps;

    constructor(uint256 _reservedAmount) {
        reservedAmount = _reservedAmount;
    }

    function addStep(
        StepTypes stepType,
        bytes4 data,
        string memory message
    ) internal {
        steps.push(Step(stepType, data, message, false));
        emit StepCreated(stepType, data, message);
    }

    function abort() external onlyOwner {
        reverted = true;
    }

    function executeStep(uint256 stepId) public {
        //check if passed
        Step memory step = steps[stepId];

        // if(step.claimed) {
        //     // revert
        // }
        // if(step.StepTypes == )

        steps[stepId].completed = true;
        emit StepExecuted(stepId);
    }

    function claimAbort(uint256[] memory tokenIds) external {
        require(reverted, 'Reverted not active');
    }

    function withdrawFunds() external onlyOwner {
        for (uint256 i = 0; i < steps.length; i++) {
            require(steps[i].completed, 'Not completed');
        }

        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
