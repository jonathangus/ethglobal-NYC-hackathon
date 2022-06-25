// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract Roadmap is Ownable {
    bool public reverted = false;
    uint256 private reservedAmount;

    struct Step {
        bytes32 data;
        string message;
        bool completed;
    }

    event StepCreated(bytes32 data, string message);
    event StepExecuted(uint256 stepId);

    Step[] public steps;

    constructor(uint256 _reservedAmount) {
        reservedAmount = _reservedAmount;
    }

    function addStep(string memory call, string memory message) internal {
        bytes32 data = bytes32(keccak256(abi.encodePacked(call)));
        steps.push(Step(data, message, false));
        emit StepCreated(data, message);
    }

    function abort() external onlyOwner {
        reverted = true;
    }

    function executeStep(uint256 stepId) public {
        //check if passed
        Step memory step = steps[stepId];

        (bool success, bytes memory ret) = address(this).call(
            abi.encodePacked(step.data)
        );

        bool result;
        assembly {
            // Load the length of data (first 32 bytes)
            let len := mload(ret)
            // Load the data after 32 bytes, so add 0x20
            result := mload(add(ret, 0x20))
        }

        if (!success) {
            require(success, 'call not successful');
        }

        if (!result) {
            require(result, 'result not successful');
        }

        // if(step.claimed) {
        //     // revert
        // }
        // if(step.StepTypes == )

        steps[stepId].completed = true;
        emit StepExecuted(stepId);
    }

    function claimAbort(uint256[] memory tokenIds) external {
        require(reverted, 'Reverted not active');

        uint256 refund = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            IERC721(address(this)).safeTransferFrom(
                msg.sender,
                address(this),
                tokenIds[i]
            );
            refund += 10000;
        }
    }

    function withdrawFunds() external onlyOwner {
        for (uint256 i = 0; i < steps.length; i++) {
            require(steps[i].completed, 'Not completed');
        }

        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
