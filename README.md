# NFT Safe Launch

Extend your ERC-721 smart contract with an on-chain roadmap and invite your minters to governance. No more empty promises and rugg pulls a win win for everyone!


## Problem Statement:

The NFT minting process today is built on trust. 

NFT projects are one of the few cases where projects instantly get a hold on the full treasure specifically the primary sales of the NFTs. We see a gap in the market where where projects and minters can benefit from more accountability, transparency and clarity in the NFT launch. The NFT space is full of big commitments and promises. We want to push for a change in narrative of the mint process and make it safer! At the same time we give the opportunity for projects to increase their legitimacy and credibility. 

You're usually told to DYOR, check the team, real social engagement why if trust is already embedded in the NFT smart contract? Gaining a free and uncontrolled access to the primary sale is wrongfully incentivising NFT projects. Extend your mint contract with an on-chain roadmap with set milestones and conditions. Use off-chain data like snapshot votes to vote on the milestones by utilising our UMA oracle integration.

NFT Safe Launch - get your roadmap on-chain. Trust to the projects, trust to the minters by being trust-less.

## Solution


The projects now need to meet certain conditions before gaining access to the treasury. As a holder you’ll get to be part of the minting process by active governance.  A win-win situation if you ask us

 No more empty promises of donations/airdrops. Extend your ERC-721 smart contract and lock the primary sales funds until specific conditions are met. We believe in changing the narrative of automatic access to the treasury and that holder should be allowed to partake in the governance in the minting process. 

We want to remove trust-based roadmaps for NFT projects by incorporating conditions before unlocking the treasury and a governance vote for the minters at 50% mint supply to see if they still believe in the project or if they want to abandon it. 


## Example

In our example we have a project with 4 steps in their roadmap:
Step 1: promise of sending donations to a charity:
Step 2: sending a BAYC to one of the minters after 100% minted out.
Step 3: 50% governance vote, do the minters want to abandon the project or continue!
Step 4: 

## Tech Stacks



It should be either fuck roadmaps or it should be on-chain. No more empty promises of donations/airdrops. Create a smart contract that locks the funds of an ERC-721 until some condition is met. Until the condition is met the owner of the contract can only call abort that will return 80% of the ETH to the minters to claim. A condition could be totalSupply=100% or a governance proposal approved. We want to remove trust-based roadmaps for NFT projects. The projects now need to meet certain conditions before gaining access to the treasury. As a holder, you’ll get to be part of the minting process by active governance. A win-win situation if you ask us

### Core packages
- `ethers`
- `wagmi`
- `hardhat`
- `next.js`
- `typechain`
- `zustand`

### Features?
- built on top of wagmi (❤️) with recognisable api
- write and read hooks are typesafe
- when doing a read transaction it executes and store the arguments
- refetches all data on each new block with multicalls
- when doing write transactions you can set a read method that you want to be executed on success for faster ui changes. ex {method: 'increment', onSuccess: 'getCount'}
- sync deployments to frontend so you dont manually have to update addresses
- no theming or css 
- zustand for state


### Apps and Packages
- `web`: another [Next.js](https://nextjs.org) app
- `smart-contracts`: smart contracts with hardhat
- `web3-config`: deployments, generated types from contract and common web3 config
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup
Install dependencies by running `yarn`

### Development
To run local development run:
```
yarn dev
```

### Build

To build all apps and packages, run the following command:

```
yarn build
```
