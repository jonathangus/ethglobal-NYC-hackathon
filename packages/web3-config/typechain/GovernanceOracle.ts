/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface GovernanceOracleInterface extends utils.Interface {
  contractName: "GovernanceOracle";
  functions: {
    "ancillaryData()": FunctionFragment;
    "callbackError()": FunctionFragment;
    "governanceApproved()": FunctionFragment;
    "priceSettled(bytes32,uint256,bytes,int256)": FunctionFragment;
    "requestGovernanceCheck()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ancillaryData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "callbackError",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "governanceApproved",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceSettled",
    values: [BytesLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestGovernanceCheck",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ancillaryData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "callbackError",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceSettled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestGovernanceCheck",
    data: BytesLike
  ): Result;

  events: {};
}

export interface GovernanceOracle extends BaseContract {
  contractName: "GovernanceOracle";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GovernanceOracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ancillaryData(overrides?: CallOverrides): Promise<[string]>;

    "ancillaryData()"(overrides?: CallOverrides): Promise<[string]>;

    callbackError(overrides?: CallOverrides): Promise<[boolean]>;

    "callbackError()"(overrides?: CallOverrides): Promise<[boolean]>;

    governanceApproved(overrides?: CallOverrides): Promise<[boolean]>;

    "governanceApproved()"(overrides?: CallOverrides): Promise<[boolean]>;

    priceSettled(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "priceSettled(bytes32,uint256,bytes,int256)"(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestGovernanceCheck(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "requestGovernanceCheck()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  ancillaryData(overrides?: CallOverrides): Promise<string>;

  "ancillaryData()"(overrides?: CallOverrides): Promise<string>;

  callbackError(overrides?: CallOverrides): Promise<boolean>;

  "callbackError()"(overrides?: CallOverrides): Promise<boolean>;

  governanceApproved(overrides?: CallOverrides): Promise<boolean>;

  "governanceApproved()"(overrides?: CallOverrides): Promise<boolean>;

  priceSettled(
    identifier: BytesLike,
    timestamp: BigNumberish,
    _ancillaryData: BytesLike,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "priceSettled(bytes32,uint256,bytes,int256)"(
    identifier: BytesLike,
    timestamp: BigNumberish,
    _ancillaryData: BytesLike,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestGovernanceCheck(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "requestGovernanceCheck()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ancillaryData(overrides?: CallOverrides): Promise<string>;

    "ancillaryData()"(overrides?: CallOverrides): Promise<string>;

    callbackError(overrides?: CallOverrides): Promise<boolean>;

    "callbackError()"(overrides?: CallOverrides): Promise<boolean>;

    governanceApproved(overrides?: CallOverrides): Promise<boolean>;

    "governanceApproved()"(overrides?: CallOverrides): Promise<boolean>;

    priceSettled(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "priceSettled(bytes32,uint256,bytes,int256)"(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    requestGovernanceCheck(overrides?: CallOverrides): Promise<void>;

    "requestGovernanceCheck()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    ancillaryData(overrides?: CallOverrides): Promise<BigNumber>;

    "ancillaryData()"(overrides?: CallOverrides): Promise<BigNumber>;

    callbackError(overrides?: CallOverrides): Promise<BigNumber>;

    "callbackError()"(overrides?: CallOverrides): Promise<BigNumber>;

    governanceApproved(overrides?: CallOverrides): Promise<BigNumber>;

    "governanceApproved()"(overrides?: CallOverrides): Promise<BigNumber>;

    priceSettled(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "priceSettled(bytes32,uint256,bytes,int256)"(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestGovernanceCheck(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "requestGovernanceCheck()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ancillaryData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ancillaryData()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    callbackError(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "callbackError()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    governanceApproved(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "governanceApproved()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceSettled(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "priceSettled(bytes32,uint256,bytes,int256)"(
      identifier: BytesLike,
      timestamp: BigNumberish,
      _ancillaryData: BytesLike,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestGovernanceCheck(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "requestGovernanceCheck()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
