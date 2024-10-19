import { useState, useEffect } from 'react';

const useBitcoinWalletInfo = (publicKey) => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        const data = await response.json();
        return data.bpi.USD.rate_float;
      } catch (error) {
        console.error('Error al obtener el precio de Bitcoin:', error);
        throw new Error('Error al obtener el precio de Bitcoin');
      }
    };

    const getWalletInfo = async () => {
      try {
        const response = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${publicKey}`);
        const data = await response.json();
        const bitcoinPrice = await getBitcoinPrice();

        const balanceBTC = data.final_balance / 100000000; // De satoshis a BTC
        const balanceUSD = balanceBTC * bitcoinPrice;

        const lastTransactions = data.txrefs?.slice(0, 3).map((tx) => {
          const amountBTC = tx.value / 100000000;
          const amountUSD = amountBTC * bitcoinPrice;
          return {
            amountUSD: amountUSD.toFixed(2),
            date: new Date(tx.confirmed).toLocaleString(),
          };
        }) || [];

        setBalance(balanceUSD.toFixed(2));
        setTransactions(lastTransactions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (publicKey) {
      getWalletInfo();
    }
  }, [publicKey]);

  return { balance, transactions, loading, error };
};

export default useBitcoinWalletInfo;
