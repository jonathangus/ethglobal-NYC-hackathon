// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Roadmap.sol';
import 'hardhat/console.sol';
import '@uma/core/contracts/oracle/interfaces/OptimisticOracleInterface.sol';

contract MyNFT is ERC721, ERC721Enumerable, Ownable, Roadmap {
    using Counters for Counters.Counter;

    uint256 private constant RESERVED_TREASURY_AMOUNT = 3 ether;
    uint256 public constant MINT_PRICE = 0.001 ether;
    uint256 private constant MAX_SUPPLY = 100;

    bool private apeSent = false;
    bool private charitySent = false;
    bool private governanceApproved = false;
    bool public callbackError = false;
    // string private s1 =
    //     'q:Have the snapshot vote containing [ROADMAP_ACCPECTED] completed with more then 50 percentage';
    // string private s2 =
    //     ' of the votes are YES?,https://demo.snapshot.org/#/devdevdev.eth';
    bytes private ancillaryData =
        '0x713a486176652074686520736e617073686f7420766f746520636f6e7461696e696e67205b524f41444d41505f4143435045435445445d20636f6d706c657465642077697468206d6f7265207468656e2035302070657263656e74616765206f662074686520766f74657320617265205945533f2c68747470733a2f2f64656d6f2e736e617073686f742e6f72672f232f6465766465766465762e657468';

    bytes32 private priceIdentifier = 'YES_OR_NO_QUERY';

    address DAI = 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99;

    uint256 creationTimestamp;

    Counters.Counter private _tokenIdCounter;

    constructor()
        ERC721('MyToken', 'MTK')
        Roadmap(RESERVED_TREASURY_AMOUNT, MINT_PRICE)
    {
        addStep('governanceIsApproved()', 'Governance approval');
        addStep('mintProgress()', 'Half minted');
        addStep('apeIsSent()', 'BAYC sent to user');
        addStep('charityIsSent()', 'Charity sent');

        address oracle = oracleAddress();
        IERC20(DAI).approve(oracle, 200e18);
        creationTimestamp = block.timestamp;
    }

    function mintProgress() public view returns (bool) {
        return MAX_SUPPLY / 2 > totalSupply();
    }

    function charityIsSent() public view returns (bool) {
        return charitySent;
    }

    function governanceIsApproved() public view returns (bool) {
        return governanceApproved;
    }

    function apeIsSent() public view returns (bool) {
        return apeSent;
    }

    function sendApe(address newOwner) public onlyOwner {
        // IERC721.transfer(0, newOwner)
        apeSent = true;
    }

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

        // Make the request an event-based request.
        // optimisticOracle.setEventBased(priceIdentifier, 123, ancillaryData);

        // Enable the priceDisputed and priceSettled callback
        // optimisticOracle.setCallbacks(
        //     priceIdentifier,
        //     123,
        //     ancillaryData,
        //     false,
        //     true,
        //     true
        // );
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

    function sendToCharity() public onlyOwner {
        address CHARITY_ADDRESS = 0x9AA48Bb538206d5D7329aafd17B63562e7c98457;
        payable(CHARITY_ADDRESS).transfer(0.1 ether);
        charitySent = true;
    }

    function mint(address to, uint256 quantity) public payable {
        uint256 totalPrice = MINT_PRICE * quantity;
        require(totalPrice == msg.value, 'Value is wrong for mint');

        require(totalSupply() + quantity < MAX_SUPPLY, 'Not enough supply');

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
