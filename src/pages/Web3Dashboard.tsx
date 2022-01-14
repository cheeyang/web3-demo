import { useContext } from "react";
import { Web3Context } from "../contexts/web3js";
import { truncateAddress } from "../utils";

const Web3Dashboard = () => {
  const { connect, signerAddress } = useContext(Web3Context);

  const handleConnectWallet = async () => {
    console.log("connecting to metamask...");
    connect();
  };
  return (
    <div className="dashboard" style={{ minWidth: "75%", overflow: "scroll" }}>
      <button type="button" onClick={handleConnectWallet}>
        {signerAddress
          ? `Connected (${truncateAddress(signerAddress)}) `
          : "Connect To Metamask"}
      </button>
      <h1>Make A ETH Transaction</h1>
      {/* <SendTransactionETH /> */}
      <br />
      <br />
      <h1>Make an ANT Transaction</h1>
      {/* <SendTransactionANT /> */}
      <br />
      <br />
      <h1>Contract Events</h1>
      {/* <ContractEvents /> */}
    </div>
  );
};
export default Web3Dashboard;
