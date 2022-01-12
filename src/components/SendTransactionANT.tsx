import { useContext, useEffect, useState } from "react";
import { EthersContext } from "../contexts/ethers";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ethers } from "ethers";
import Spinner from "./Spinner";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .transaction-details {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    label {
      flex: 1;
    }
  }

  .transaction-status {
    margin-top: 2rem;
  }

  .error-message {
    color: red;
  }
`;

const initialTxnStatus = {
  processing: false,
  confirmations: 0,
  error: undefined,
};

const SendTransactionANT = () => {
  const {
    signer,
    signerAddress,
    provider,
    dispatch,
    antContractRW,
    connectAragonRW,
  } = useContext(EthersContext);
  const [sendAmt, setSendAmt] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mintValue, setMintValue] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [antBalance, setAntBalance] = useState<ethers.BigNumber | undefined>(
    undefined
  );
  const [totalSupply, setTotalSupply] = useState<ethers.BigNumber | undefined>(
    undefined
  );
  const [recipientBalance, setRecipientBalance] = useState<
    undefined | ethers.BigNumber
  >(undefined);
  const [transactionStatus, setTransactionStatus] = useState(initialTxnStatus);
  const [transactionReceipt, setTransactionReceipt] = useState<any>(undefined);

  useEffect(() => {
    if (signerAddress) {
      console.log("connecting to RW aragon");
      connectAragonRW();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signerAddress]);
  useEffect(() => {
    const init = async () => {
      try {
        const antBalance = await antContractRW?.balanceOf(signerAddress);
        setAntBalance(antBalance);
        const totalSupply = await antContractRW?.totalSupply();
        setTotalSupply(totalSupply);
      } catch (err) {
        console.error(err);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antContractRW, provider]);

  const handleMint = async () => {
    console.log("antContractRW: ", antContractRW);
    try {
      await antContractRW?.mint(ethers.BigNumber.from(mintValue));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAddress = (e: any) => {
    const val = e?.target?.value;
    setAddress(val);
  };
  const handleChangeAmount = (e: any) => {
    const val = e?.target?.value;
    setSendAmt(val);
  };
  const handleSend = async (e: any) => {
    e?.preventDefault();
    setTransactionStatus(initialTxnStatus);
    setTransactionReceipt(undefined);
    console.log("sending transaction...");
    console.log("type of sendAmt: ", typeof sendAmt);
    try {
      const antsToSend = ethers.utils.parseEther(sendAmt);
      console.log("sending eth to address: ", address);
      const txResponse = await antContractRW?.transfer(address, antsToSend);
      setTransactionStatus((txnStatus) => ({ ...txnStatus, processing: true }));
      const txnReceipt = await txResponse.wait(); // waits for 1 confirmation by default
      setTransactionStatus((txnStatus) => ({
        ...txnStatus,
        confirmations: 1,
        processing: false,
      }));
      setTransactionReceipt(txnReceipt);
      setRecipientBalance(await provider.getBalance(address));
      dispatch({
        type: "UPDATE_SIGNER_BALANCE",
        payload: await signer.getBalance(),
      });
    } catch (err: any) {
      setTransactionStatus((txnStatus) => ({
        ...txnStatus,
        processing: false,
        error: err,
      }));
    }
  };
  return (
    <form onSubmit={handleSend}>
      {signerAddress ? (
        <>
          <StyledContainer>
            <div className="transaction-details source">
              <div className="row">
                <label>Total Supply: </label>
                <div>{totalSupply?.toString()}</div>
              </div>
              <div>Your Wallet Address: </div>
              <div>{signerAddress}</div>
              <div className="row">
                <label>Balance (ANT Wei): </label>
                <div>{antBalance?.toString()}</div>
              </div>
              <div className="row">
                <label>Balance (ANT): </label>
                <div>
                  {ethers.utils.formatUnits(
                    (antBalance as ethers.BigNumber) || 0
                  )}
                </div>
              </div>

              <div className="row">
                <label>Mint</label>
                <button type="button" onClick={handleMint}>
                  Mint
                </button>
                <label htmlFor="mint-amount">Amount:</label>
                <input
                  name="mint-amount"
                  type={"number"}
                  value={mintValue.toString()}
                  onChange={(e) => {
                    setMintValue(ethers.BigNumber.from(e?.target?.value));
                  }}
                />
              </div>
              <div className="row"></div>
            </div>
            <AiOutlineArrowRight size={20} />
            <div className="transaction-details destination">
              <div className="row">
                <label>Destination Address: </label>
                <input
                  type="text"
                  value={address}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="row">
                <label>Amount: </label>
                <input
                  type="number"
                  value={sendAmt}
                  onChange={handleChangeAmount}
                ></input>
                <span>ANT</span>
              </div>

              <button type="submit">
                {!transactionStatus.processing ? "Send" : "Sending..."}
              </button>
              {transactionStatus.error && (
                <div className="error-message">
                  {(transactionStatus.error as any).code ===
                  "INSUFFICIENT_FUNDS"
                    ? "Insufficient ETH in your wallet"
                    : (transactionStatus.error as any).code}
                </div>
              )}

              <div className="transaction-status">
                {transactionStatus.processing && (
                  <>
                    <div>Transaction submitted for processing</div>
                    <Spinner />
                  </>
                )}
                {transactionReceipt && (
                  <div>
                    <div>Transaction confirmed!</div>
                    <div>
                      Transaction hash:
                      <br />
                      <a
                        href={`https://rinkeby.etherscan.io/tx/${transactionReceipt.transactionHash.toString()}`}
                      >
                        {transactionReceipt.transactionHash}
                      </a>
                    </div>
                    <div className="row">
                      Recipient Balance:{" "}
                      {ethers.utils.formatEther(recipientBalance || 0)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </StyledContainer>
        </>
      ) : (
        <div>Connect your wallet to make a transaction</div>
      )}
    </form>
  );
};
export default SendTransactionANT;
