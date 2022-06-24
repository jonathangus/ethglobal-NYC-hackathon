import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { Counter } from 'web3-config';

describe('Counter', function () {
  let counter: Counter;

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const CounterContract = await ethers.getContractFactory('Counter');
    counter = (await CounterContract.deploy()) as Counter;
    await counter.deployed();
  });

  describe('deployment', async () => {
    it('should deploy', async () => {
      expect(0).to.eq(0);
    });
  });
});
