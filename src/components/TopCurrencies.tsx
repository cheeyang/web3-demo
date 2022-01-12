import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

interface currencyInfo {
  id: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
}

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 3fr 4fr;

  .currency {
    text-align: right;
    font-family: monospace;
  }
`;

const CmcApiKey =
  process.env.REACT_APP_CMC_API_KEY || "f52ca537-bc0a-4544-88a8-11b8642d80e6";

const TopCurrencies = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [currencyArr, setCurrencyArr] = useState<currencyInfo[]>([]);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setIsFetching(true);
        const fetchTop5 = fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5",
          {
            headers: {
              "X-CMC_PRO_API_KEY": CmcApiKey,
            },
          }
        );
        const fetchAragon = fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1680",
          {
            headers: {
              "X-CMC_PRO_API_KEY": CmcApiKey,
            },
          }
        );
        const responses = await Promise.all([fetchTop5, fetchAragon]);
        const jsonRes = await Promise.all(
          responses.map((res) => {
            return res.json();
          })
        );
        const currencyData = [
          ...jsonRes?.[0].data,
          jsonRes?.[1]?.data?.["1680"],
        ];
        const currencies: currencyInfo[] = currencyData.map((cur: any) => ({
          id: cur.id,
          name: cur.name,
          symbol: cur.symbol,
          price: cur.quote?.USD?.price,
          marketCap: cur.quote?.USD?.market_cap,
        }));
        console.log("new currency arr: ", currencies);
        setCurrencyArr(currencies);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };

    if (countdown <= 0) {
      clearInterval(intervalRef.current);
      fetchCurrencies();
      setCountdown(60);
      intervalRef.current = setInterval(() => {
        setCountdown((state) => state - 1);
      }, 1000);
    }
  }, [countdown]);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <StyledTable>
          <div>ID</div>
          <div>Name</div>
          <div>Symbol</div>
          <div className="currency">Price</div>
          <div className="currency">Market Cap</div>
          {currencyArr.map((cur) => {
            return (
              <React.Fragment key={cur.id}>
                <div>{cur.id}</div>
                <div>{cur.name}</div>
                <div>{cur.symbol}</div>
                <div className="currency">{cur.price?.toFixed(4)}</div>
                <div className="currency">{cur.marketCap?.toFixed(4)}</div>
              </React.Fragment>
            );
          })}
        </StyledTable>
      )}
      <div style={{ marginTop: "1rem" }}>Refreshing in... {countdown}</div>
    </>
  );
};
export default TopCurrencies;
