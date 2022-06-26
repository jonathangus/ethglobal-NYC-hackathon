// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@uma/core/contracts/oracle/interfaces/OptimisticOracleInterface.sol';

contract GovernanceOracle {
    bool public governanceApproved = false;
    bool public callbackError = false;
    string private s1 =
        'q:title: Have the snapshot vote containing [ROADMAP_ACCPECTED] completed with more than 50 percentage';
    string private s2 =
        ' of the votes are YES?,https://demo.snapshot.org/#/devdevdev.eth';
    bytes public ancillaryData = abi.encodePacked(s1, s2);
    // '0x713a486176652074686520736e617073686f7420766f746520636f6e7461696e696e67205b524f41444d41505f4143435045435445445d20636f6d706c657465642077697468206d6f7265207468656e2035302070657263656e74616765206f662074686520766f74657320617265205945533f2c68747470733a2f2f64656d6f2e736e617073686f742e6f72672f232f6465766465766465762e657468';
    bytes32 private priceIdentifier = 'YES_OR_NO_QUERY';

    address DAI = 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99;
    uint256 creationTimestamp;

    function oracleAddress() private view returns (address) {
        address finderAddress = 0xeD0169a88d267063184b0853BaAAAe66c3c154B2;
        FinderInterface finder = FinderInterface(finderAddress);

        return finder.getImplementationAddress('OptimisticOracle');
    }

    function getOptimisticOracle()
        internal
        view
        returns (OptimisticOracleInterface)
    {
        return OptimisticOracleInterface(oracleAddress());
    }

    function requestGovernanceCheck() public {
        OptimisticOracleInterface optimisticOracle = getOptimisticOracle();
        //rinkeby address USDC_ADDRESS = 0xeb8f08a975Ab53E34D8a0330E0D34de942C95926;
        address DAI_KOVAN = 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99;

        optimisticOracle.requestPrice(
            priceIdentifier,
            creationTimestamp,
            ancillaryData,
            IERC20(DAI_KOVAN),
            2e18
        );

        optimisticOracle.setCustomLiveness(
            priceIdentifier,
            creationTimestamp,
            ancillaryData,
            60 * 3
        );
    }

    function priceSettled(
        bytes32 identifier,
        uint256 timestamp,
        bytes memory _ancillaryData,
        int256 price
    ) external {
        OptimisticOracleInterface optimisticOracle = getOptimisticOracle();
        require(msg.sender == address(optimisticOracle), 'not authorized');
        require(timestamp == creationTimestamp, 'different timestamps');
        require(identifier == priceIdentifier, 'same identifier');
        require(
            keccak256(ancillaryData) == keccak256(_ancillaryData),
            'same ancillary data'
        );

        // Calculate the value of settlementPrice using either 0, 0.5e18, or 1e18 as the expiryPrice.
        if (price == 1e18) {
            // true
            governanceApproved = true;
        } else {
            callbackError = true;
            // false
        }
    }
}
