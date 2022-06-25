import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { MyNFT, Roadmap } from 'web3-config';

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

      try {
        await nftContract.executeStep(2);
      } catch (e) {
        error = true;
      }
      expect(error).to.eq(true);
      // await nftContract.executeStep(3);
      await nftContract.sendApe(owner.address);
      await nftContract.executeStep(2);
    });
  });
});
