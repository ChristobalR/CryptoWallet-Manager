import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchPrices from "../hooks/fetchPrices";

const Landing = () => {
  const { userData } = useFetchProfile();
  const { prices, loading, error, highlightedPrice } = useFetchPrices();

  const logged = localStorage.getItem("logged") === "true";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/wallet");
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {!logged ? (
          <Typography variant="h6" color="white" align="center">
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Ingresa
            </span>{" "}
            o{" "}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Regístrate
            </span>{" "}
            para poder generar wallets y almacenar criptomonedas.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" color="white" align="center">
              Bienvenido,{" "}
              <span style={{ fontWeight: "bold", color: "red" }}>
                {userData?.user?.firstName}
              </span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleNavigate}
            >
              Acceder a mis wallets
            </Button>
          </>
        )}

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
                gap: "15px",
              }}
            >
              {Object.entries(prices).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    
                    padding: "15px",
                    borderRadius: "8px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="white"
                    sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: highlightedPrice ? "green" : "white",
                      transition: "color 0.5s, transform 0.5s",
                      transform: highlightedPrice ? "scale(1.1)" : "scale(1)",
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
