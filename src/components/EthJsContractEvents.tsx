import { useContext, useEffect, useState } from "react";
import { EthersContext } from "../contexts/ethers";

const EthJsContractEvents = () => {
  const { connectAragon, antContract, provider } = useContext(EthersContext);
  const [logArr, setLogArr] = useState<any>([]);

  useEffect(() => {
    if (!antContract) {
      connectAragon();
    } else {
      // This filter could also be generated with the Contract or
      // Interface API. If address is not specified, any address
      // matches and if topics is not specified, any log matches
      const filter = {
        address: "0xff10E56d8C3c1567E0c80677e26EC687B4f1D8D0", // ANT Rinkeby
        // address: "0xa117000000f279d81a1d3cc75430faa017fa5a2e", // ANT Etherium mainnet
        // address: "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
        // topics: [ethers.utils.id("Transfer(address,address,uint256)")],
        topics: null,
      };
      provider?.on(filter, (log: any, event: any) => {
        // Emitted whenever a token transfer occurs
        console.log("log: ", log);
        console.log("event: ", event);
        setLogArr((state: any) => [log, ...state]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antContract, provider]);

  return (
    <>
      {!logArr?.length ? (
        "No events emitted. Are you sure you are on the correct network?"
      ) : (
        <div>
          {logArr.map((cur: any) => (
            <div style={{ margin: "0.5rem" }}>
              {JSON.stringify(cur, undefined, 4)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EthJsContractEvents;
