// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import 'hardhat/console.sol';

contract Roadmap is Ownable {
    bool public reverted = false;
    uint256 private reservedAmount;
    uint256 private mintPrice;

    mapping(uint256 => bool) claimed;

    struct Step {
        bytes32 data;
        string message;
        bool completed;
    }

    event StepCreated(bytes32 data, string message);
    event StepExecuted(uint256 stepId);

    Step[] public steps;

    constructor(uint256 _reservedAmount, uint256 _mintPrice) {
        reservedAmount = _reservedAmount;
        mintPrice = _mintPrice;
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
        Step memory step = steps[stepId];
        require(!step.completed, 'already completed');

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
        require(success, 'call not successful');
        require(result, 'result not successful');

        steps[stepId].completed = true;
        emit StepExecuted(stepId);
    }

    function stepCount() public view returns (uint256) {
        return steps.length;
    }

    function stepsCompleted() public view returns (uint256 completed) {
        for (uint256 i = 0; i < steps.length; i++) {
            Step memory step = steps[i];
            if (step.completed) {
                completed += 1;
            }
        }
    }

    function claimableAmount(uint256[] memory tokenIds)
        public
        view
        returns (uint256)
    {
        uint256 refund = 0;
        ERC721Enumerable nft = ERC721Enumerable(address(this));
        uint256 completed = stepsCompleted();
        uint256 totalMinted = nft.totalSupply() * mintPrice;

        if (totalMinted < reservedAmount) {
            console.log('return 1');
            return 0;
        }
        uint256 available = totalMinted - reservedAmount;
        uint256 balance = address(this).balance;
        if (balance < available) {
            console.log('return 2');
            return 0;
        }

        uint256 completedPercentage = (steps.length * 1000) / completed;

        uint256 eachShare = (available / nft.totalSupply());

        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (!claimed[i]) {
                refund += (eachShare * completedPercentage) / 1000;
            }
        }

        return refund;
    }

    function claimRefund(uint256[] memory tokenIds) external {
        require(reverted, 'Reverted not active');
        IERC721 nft = IERC721(address(this));

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(nft.ownerOf(i) == msg.sender, 'Wrong owner');
            require(!claimed[i], 'Already claimed for token');

            nft.transferFrom(msg.sender, address(this), tokenIds[i]);
        }
        uint256 refund = claimableAmount(tokenIds);
        payable(msg.sender).transfer(refund);
    }

    function withdrawFunds() external onlyOwner {
        for (uint256 i = 0; i < steps.length; i++) {
            require(steps[i].completed, 'Not completed');
        }

        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
