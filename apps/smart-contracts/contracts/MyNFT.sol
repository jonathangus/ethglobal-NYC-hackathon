// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Roadmap.sol';

contract MyNFT is ERC721, ERC721Enumerable, Ownable, Roadmap {
    using Counters for Counters.Counter;

    uint256 RESERVED_TREASURY_AMOUNT = 3 ether;
    bool apeSent = false;
    bool koalasSent = false;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721('MyToken', 'MTK') Roadmap(RESERVED_TREASURY_AMOUNT) {
        addStep(
            StepTypes.GONVERNANE,
            bytes4(keccak256('0x0000')),
            'Governance approval'
        );
        addStep(
            StepTypes.CALLDATA,
            bytes4(keccak256('mintedComplete()')),
            'Minting completed'
        );
        addStep(
            StepTypes.CALLDATA,
            bytes4(keccak256('apeSent()')),
            'BAYC sent to user'
        );
        addStep(
            StepTypes.CALLDATA,
            bytes4(keccak256('koalasSent()')),
            'Charity sent'
        );
    }

    function mintedComplete() public view returns (bool) {
        return true;
        // return totalSupply() == 1000;
    }

    function sendApe(address newOwner) public onlyOwner {
        // IERC721.transfer(0, newOwner)
        apeSent = true;
    }

    function helpKoalas() public onlyOwner {
        // transfer(1 ether, KOALA_ADDRESS);
        koalasSent = true;
    }

    function mint() public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
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
