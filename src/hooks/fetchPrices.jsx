import { useState, useEffect } from "react";

const useFetchPrices = () => {


  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedPrice, setHighlightedPrice] = useState(false);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();

    // Actualiza los precios cada 2 segundos
    const interval = setInterval(() => {
      setHighlightedPrice(true); // Activa el efecto de resaltado
      setPrices((prevPrices) => {
        if (!prevPrices) return null;

        const updatedPrices = {};
        Object.entries(prevPrices).forEach(([key, value]) => {
          // Cambia el precio con un 0.0001% de variación
          const change = (Math.random() * 0.0002 - 0.0001); // Rango de cambio
          updatedPrices[key] = {
            usd: (value.usd * (1 + change)).toFixed(4), // Ajusta el precio
          };
        });
        return updatedPrices;
      });

      setTimeout(() => setHighlightedPrice(false), 500); // Resalta por 500 ms
    }, 2000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return { prices, loading, error, highlightedPrice }
};

export default useFetchPrices