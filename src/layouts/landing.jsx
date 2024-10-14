import { Container, Typography, Button, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import NavBar from "../components/navbar";
import useFetchProfile from "../hooks/useFetchProfile";

const Landing = () => {
  const { userData } = useFetchProfile();
  const logged = localStorage.getItem("logged") === "true";
  const navigate = useNavigate(); // Usa el hook useNavigate

  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedPrice, setHighlightedPrice] = useState(false);

  console.log(userData);
  
  const handleNavigate = () => {
    navigate("/wallet");
  };

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

  // Formato de precio con comas y sin notación extraña
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
      <NavBar userData={userData} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          maxWidth: "80%",
          padding: "20px",
          borderRadius: "10px", // Bordes redondeados
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Sombra
        }}
      >
        {/* Mensaje condicional basado en el estado de logueo */}
        {!logged ? (
          <Typography variant="h6" color="white" align="center">
            <span style={{ color: "red", cursor: "pointer" }} onClick={() => navigate('/login')}>Ingresa</span> o{" "}
            <span style={{ color: "red", cursor: "pointer" }} onClick={() => navigate('/register')}>Regístrate</span> para poder generar
            wallets y almacenar criptomonedas.
          </Typography>
        ) : (
          <>
            {/* Mensaje de bienvenida */}
            <Typography variant="h5" color="white" align="center">
              Bienvenido, <span style={{ fontWeight: 'bold', color: 'red' }}>{userData?.user?.firstName}</span> 
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleNavigate} // Maneja el evento onClick
            >
              Acceder a mis wallets
            </Button>
          </>
        )}

        {/* Muestra los precios de las criptomonedas */}
        <Container sx={{ marginTop: "40px", textAlign: "center" }}>
          <Typography variant="h5" color="white" sx={{ marginBottom: "20px" }}>
            Precios de las principales criptomonedas
          </Typography>
          {loading && <CircularProgress sx={{ marginTop: "20px" }} />}
          {error && (
            <Typography color="red">Error al cargar los precios.</Typography>
          )}
          {prices && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
                gap: "15px", // Espacio entre los precios
              }}
            >
              {Object.entries(prices).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    backgroundColor: "#1A1A1A", // Fondo de cada precio
                    padding: "15px", // Espaciado interno
                    borderRadius: "8px", // Bordes redondeados
                    transition: "transform 0.3s, box-shadow 0.3s", // Efecto de transición
                    '&:hover': {
                      transform: "scale(1.05)", // Efecto de hover
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.5)", // Sombra en hover
                    },
                  }}
                >
                  <Typography variant="body1" color="white" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: highlightedPrice ? "green" : "white",
                      transition: "color 0.5s, transform 0.5s", // Efecto de transición de color
                      transform: highlightedPrice ? "scale(1.1)" : "scale(1)", // Efecto de escala
                    }}
                  >
                    ${formatPrice(value.usd)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Landing;
