import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { Roadmap } from 'web3-config';

describe('Roadmap', function () {
  let roadmap: Roadmap;

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const RoadmapContract = await ethers.getContractFactory('Roadmap');
    roadmap = (await RoadmapContract.deploy()) as Roadmap;
    await roadmap.deployed();
  });

  describe('deployment', async () => {
    it('should deploy', async () => {
      expect(0).to.eq(0);
    });
  });
});
