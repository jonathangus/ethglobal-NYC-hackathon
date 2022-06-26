// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import './SafeLaunch.sol';

// import './GovernanceOracle.sol';

contract MyNFT is ERC721, ERC721Enumerable, Ownable, SafeLaunch {
    uint256 private constant RESERVED_TREASURY_AMOUNT = 0.01 ether;
    uint256 public constant MINT_PRICE = 0.001 ether;
    uint256 private constant MAX_SUPPLY = 100;

    bool private apeSent = false;
    bool private charitySent = false;

    constructor()
        ERC721('MyToken', 'MTK')
        SafeLaunch(RESERVED_TREASURY_AMOUNT, MINT_PRICE)
    {
        addStep('governanceIsApproved()', 'Governance approval');
        addStep('mintProgress()', 'Half minted');
        addStep('apeIsSent()', 'BAYC sent to user');
        addStep('charityIsSent()', 'Charity sent');
    }

    function mintProgress() public view returns (bool) {
        return MAX_SUPPLY / 2 < totalSupply();
    }

    function charityIsSent() public view returns (bool) {
        return charitySent;
    }

    function governanceIsApproved() public view returns (bool) {
        return true;
    }

    function apeIsSent() public view returns (bool) {
        return apeSent;
    }

    function sendApe(address newOwner) public onlyOwner {
        // IERC721.transfer(0, newOwner)
        // Make transfer of that BAYC we promised
        apeSent = true;
    }

    function sendToCharity() public onlyOwner {
        // Send eth to our fantastic charity that we promised
        address CHARITY_ADDRESS = 0x9AA48Bb538206d5D7329aafd17B63562e7c98457;
        payable(CHARITY_ADDRESS).transfer(0.1 ether);
        charitySent = true;
    }

    function mint(address to, uint256 quantity) public payable {
        uint256 totalPrice = MINT_PRICE * quantity;
        require(totalPrice == msg.value, 'Value is wrong for mint');
        require(totalSupply() + quantity < MAX_SUPPLY, 'Not enough supply');

        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, totalSupply());
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
