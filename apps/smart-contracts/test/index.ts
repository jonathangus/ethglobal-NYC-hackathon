import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MyNFT } from 'web3-config';

describe('Roadmap', function () {
  let nftContract: MyNFT;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const NFTContract = await ethers.getContractFactory('MyNFT');
    nftContract = (await NFTContract.deploy()) as MyNFT;
    await nftContract.deployed();
  });

  describe('execute', async () => {
    it('should execute', async () => {
      // await nftContract.executeStep(1);
      let error = false;
      let completed = await nftContract.stepsCompleted();
      expect(+completed).to.eq(0);
      try {
        await nftContract.executeStep(2);
      } catch (e) {
        error = true;
      }

      expect(error).to.eq(true);
      // await nftContract.executeStep(3);
      await nftContract.sendApe(owner.address);
      await nftContract.executeStep(2);

      completed = await nftContract.stepsCompleted();
      expect(+completed).to.eq(1);
    });

    it('should be reclaimable', async () => {
      const mintPrice = await nftContract.MINT_PRICE();
      await nftContract.mint(owner.address, 9, { value: mintPrice.mul(9) });
      const balance = await nftContract.balanceOf(owner.address);
      expect(+balance).to.eq(9);
      let claimableAmount = await nftContract.claimableAmount([1, 2, 3]);

      expect(+claimableAmount).to.eq(0);

      await nftContract.mint(owner.address, 31, {
        value: mintPrice.mul(31),
      });
      claimableAmount = await nftContract.claimableAmount([1]);

      expect(ethers.utils.parseEther('0.00075').toString()).to.eq(
        claimableAmount.toString()
      );

      await nftContract.sendApe(owner.address);
      await nftContract.executeStep(2);

      claimableAmount = await nftContract.claimableAmount([1]);

      expect(ethers.utils.parseEther('0.0005625').toString()).to.eq(
        claimableAmount.toString()
      );
      await nftContract.abort();
      await nftContract.setApprovalForAll(nftContract.address, true);
      await nftContract.claimRefund([1]);
    });
  });
});
