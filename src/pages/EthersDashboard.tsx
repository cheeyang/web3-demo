import { useContext } from "react";
import EthJsContractEvents from "../components/EthJsContractEvents";
import EthJsSendANT from "../components/EthJsSendANT";
import EthJsSendETH from "../components/EthJsSendETH";
import TopCurrencies from "../components/TopCurrencies";
import { EthersContext } from "../contexts/ethers";
import { truncateAddress } from "../utils";

const EthersDashboard = () => {
  const { connect, signerAddress } = useContext(EthersContext);

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
      <EthJsSendETH />
      <br />
      <br />
      <h1>Make an ANT Transaction</h1>
      <EthJsSendANT />
      <br />
      <br />
      <h1>Top 5 Currencies</h1>
      <TopCurrencies />
      <br />
      <br />
      <h1>Contract Events</h1>
      <EthJsContractEvents />
    </div>
  );
};
export default EthersDashboard;
