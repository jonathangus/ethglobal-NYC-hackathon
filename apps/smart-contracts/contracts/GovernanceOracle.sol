// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@uma/core/contracts/oracle/interfaces/OptimisticOracleInterface.sol';

contract GovernanceOracle {
    bool public governanceApproved = false;
    bool public callbackError = false;

    string private snapshot = 'https://demo.snapshot.org/#/devdevdev.eth';
    string private s1 =
        'q:title: Have the snapshot vote containing [ROADMAP_ACCPECTED] completed with more than 50 percentage';
    string private s2 = ' of the votes are YES?,';
    bytes public ancillaryData =
        '0x713a486176652074686520736e617073686f7420766f746520636f6e7461696e696e67205b524f41444d41505f4143435045435445445d20636f6d706c657465642077697468206d6f7265207468656e2035302070657263656e74616765206f662074686520766f74657320617265205945533f2c68747470733a2f2f64656d6f2e736e617073686f742e6f72672f232f6465766465766465762e657468';
    bytes32 private priceIdentifier = 'YES_OR_NO_QUERY';

    uint256 private creationTimestamp = block.timestamp;
    address DAI = 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99;

    OptimisticOracleInterface optimisticOracle;

    constructor() {
        address finderAddress = 0xeD0169a88d267063184b0853BaAAAe66c3c154B2;
        FinderInterface finder = FinderInterface(finderAddress);
        optimisticOracle = OptimisticOracleInterface(
            finder.getImplementationAddress('OptimisticOracle')
        );

        IERC20(DAI).approve(address(optimisticOracle), 200e18);
    }

    function requestGovernanceCheck() public {
        address DAI_KOVAN = 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99;

        optimisticOracle.requestPrice(
            priceIdentifier,
            creationTimestamp,
            ancillaryData,
            IERC20(DAI_KOVAN),
            1e18
        );

        optimisticOracle.setCustomLiveness(
            priceIdentifier,
            creationTimestamp,
            ancillaryData,
            60 * 2
        );
    }

    function priceSettled(
        bytes32 identifier,
        uint256 timestamp,
        bytes memory _ancillaryData,
        int256 price
    ) external {
        require(msg.sender == address(optimisticOracle), 'not authorized');
        require(timestamp == creationTimestamp, 'different timestamps');
        require(identifier == priceIdentifier, 'same identifier');
        require(
            keccak256(ancillaryData) == keccak256(_ancillaryData),
            'same ancillary data'
        );

        if (price == 1e18) {
            governanceApproved = true;
        } else {
            callbackError = true;
        }
    }
}
