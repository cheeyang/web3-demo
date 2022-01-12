import React, { useReducer } from "react";
import { ethers } from "ethers";

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
  signerBalance?: ethers.BigNumber;
  antContract?: ethers.Contract;
  antContractRW?: ethers.Contract;
}
const initialState: IInitialState = {
  provider: undefined,
  signer: undefined,
  signerAddress: undefined,
  signerBalance: undefined,
  antContract: undefined,
  antContractRW: undefined,
};

export interface IEthersContext extends IInitialState {
  connect: any;
  connectAragon: any;
  connectAragonRW: any;
  dispatch: any;
}
export const EthersContext = React.createContext<IEthersContext>({} as any);

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
const EthersContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any)?.ethereum
    );
    const signer = provider.getSigner();

    console.log("provider: ", provider);
    console.log("signer: ", signer);
    console.log("window.ethereum: ", (window as any)?.ethereum);
    dispatch({ type: "UPDATE_PROVIDER_SIGNER", payload: { provider, signer } });

    const res = await provider.send("eth_requestAccounts", []);
    const address = res?.[0];
    console.log("address: ", address);
    dispatch({
      type: "UPDATE_SIGNER_ADDRESS",
      payload: address,
    });
    const balance = await signer.getBalance();
    console.log("balance: ", balance);
    dispatch({
      type: "UPDATE_SIGNER_BALANCE",
      payload: balance,
    });
  };

  const connectAragon = () => {
    console.log("connecting to ANT token contract");
    // The Contract object
    const antContract = new ethers.Contract(antAddress, antAbi, state.provider);
    dispatch({ type: "UPDATE_CONTRACT", payload: antContract });
    return antContract;
  };

  const connectAragonRW = () => {
    console.log("connecting to ANT token contract Read/Write mode");
    console.log("Signer: ", state.signer);

    // The Contract object
    const antContract = new ethers.Contract(antAddress, antAbi, state.signer);
    dispatch({ type: "UPDATE_CONTRACT_RW", payload: antContract });
    return antContract;
  };

  // const connectFloki = () => {
  //   console.log("connecting to FLOKI token contract");
  //   // The Contract object
  //   const flokiContract = new ethers.Contract(
  //     flokiAddress,
  //     flokiAbi,
  //     state.provider
  //   );
  //   dispatch({ type: "UPDATE_FLOKI_CONTRACT", payload: flokiContract });
  //   return flokiContract;
  // };

  return (
    <EthersContext.Provider
      value={
        {
          ...(state as IInitialState),
          connect,
          connectAragon,
          connectAragonRW,
          dispatch,
        } as IEthersContext
      }
    >
      {children}
    </EthersContext.Provider>
  );
};

export default EthersContextProvider;
