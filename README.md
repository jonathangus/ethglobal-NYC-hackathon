# NFT Safe Launch


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
