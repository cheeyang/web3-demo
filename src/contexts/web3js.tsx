import React, { useReducer } from "react";
import Web3 from "web3";
// You can also use an ENS name for the contract address
const antAddress = "0xff10E56d8C3c1567E0c80677e26EC687B4f1D8D0";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const antAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)",

  "function mint(uint amount)",
  "function totalSupply() view returns (uint)",
];

interface IInitialState {
  provider?: any;
  signer?: any;
  signerAddress?: string;
  // signerBalance?: ethers.BigNumber;
  // antContract?: ethers.Contract;
  // antContractRW?: ethers.Contract;
}
const initialState: IInitialState = {
  provider: undefined,
  signer: undefined,
  signerAddress: undefined,
  // signerBalance: undefined,
  // antContract: undefined,
  // antContractRW: undefined,
};

export interface IWeb3Context extends IInitialState {
  connect: any;
  dispatch: any;
}
export const Web3Context = React.createContext<IWeb3Context>({} as any);

const reducer = (
  state: IInitialState,
  action: { type: string; payload: any }
) => {
  console.log("Action: ", action);
  switch (action.type) {
    case "UPDATE_PROVIDER_SIGNER":
      return {
        ...state,
        provider: action?.payload?.provider,
        signer: action?.payload?.signer,
      };
    case "UPDATE_SIGNER_ADDRESS":
      return {
        ...state,
        signerAddress: action?.payload,
      };
    case "UPDATE_SIGNER_BALANCE":
      return {
        ...state,
        signerBalance: action?.payload,
      };
    case "UPDATE_FLOKI_CONTRACT":
      return {
        ...state,
        flokiContract: action?.payload,
      };
    case "UPDATE_CONTRACT":
      return {
        ...state,
        antContract: action?.payload,
      };
    case "UPDATE_CONTRACT_RW":
      return {
        ...state,
        antContractRW: action?.payload,
      };
    case "RESET_AUTH":
      return initialState;
    default:
      return state;
  }
};

interface IProps {
  children?: JSX.Element;
}
const Web3ContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const connect = async () => {
    console.log("using Web3.js");
    const web3 = new Web3(Web3.givenProvider);
    console.log("web3: ", web3);
    console.log("Eth.givenProvider: ", (Web3 as any)?.eth?.givenProvider);
  };

  return (
    <Web3Context.Provider
      value={
        {
          ...(state as IInitialState),
          connect,
          dispatch,
        } as IWeb3Context
      }
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
