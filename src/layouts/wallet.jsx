import { Box, Container, Typography, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const Profile = () => {
  const WalletHeader = ({ walletName, isActive, onSelect }) => {
    const imageStyle = {
      height: "80%",
      width: "auto",
      marginRight: "10px",
    };

    return (
      <>
     
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "70px",
          backgroundColor: "#1b1b1b",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          marginBottom: "20px",
          cursor: "pointer",
          transition: "transform 0.3s ease", // Transición suave
          "&:hover": {
            transform: "scale(1.02)", // Aumenta el tamaño al 110% en hover
          },
        }}
        onClick={onSelect}
      >
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <img src="/2.png" alt="" style={imageStyle} />
          <Typography sx={{ color: "#ffffff", marginLeft: "5px" }}>
            {walletName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#ffffff" }}>
            State:{" "}
            <span
              style={{
                color: isActive ? "#39ff14" : "#ffffff",
                marginLeft: "4px",
              }}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </Typography>
        </Box>
      </Box>
      </>
    );
  };

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false); // Estado para mostrar/ocultar la llave privada
  const [newWalletName, setNewWalletName] = useState(""); // Estado para el nombre de la nueva wallet
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://apichris.vercel.app/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setUserData(datos);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  }, []);

  const handleAddWallet = () => {
    const token = localStorage.getItem("token");

    fetch("https://apichris.vercel.app/addwallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ walletName: newWalletName }), // Cuerpo de la solicitud
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al agregar la wallet");
        }
        return respuesta.json();
      })
      .then(() => {
        setNewWalletName(""); // Limpia el nombre de la wallet
        setShowForm(false); // Oculta el formulario
        window.location.reload(); // Refresca la página para mostrar la nueva wallet
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
    <>
    <Navbar userData={userData}/>
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {selectedWallet ? (
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#2b2b2b",
            borderRadius: "8px",
            width: "100%",
            color: "#ffffff",
            marginTop: "20px",
          }}
        >
          <Typography variant="h5">Detalles de la Wallet:</Typography>
          <Typography variant="body1">
            Nombre: {selectedWallet.walletName}
          </Typography>
          <Typography
            variant="body1"
            sx={{ wordBreak: "break-word" }} // Estilo para permitir el salto de línea
          >
            Llave Pública: {selectedWallet.publicKey}
          </Typography>
          <Typography
            variant="body1"
            sx={{ wordBreak: "break-word" }} // Estilo para permitir el salto de línea
          >
            Llave Privada: {showPrivateKey ? selectedWallet.privateKey : "************"}
            <Button
              sx={{ marginLeft: "10px", color: "#39ff14" }}
              onClick={() => setShowPrivateKey((prev) => !prev)}
            >
              {showPrivateKey ? "Ocultar" : "Mostrar"}
            </Button>
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#39ff14" }}
            onClick={() => {
              setSelectedWallet(null); // Vuelve a la lista de wallets
              setShowPrivateKey(false); // Resetea el estado de mostrar llave privada
            }}
          >
            Volver a la lista
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", maxWidth: "300px", overflow: "hidden" }}>
            <img
              src="/1.png"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                paddingRight: "40px",
                marginTop:"10px",
                marginBottom:"10px"
              }}
            />
          </Box>
          {userData && userData.user.wallets && userData.user.wallets.length > 0 ? (
            userData.user.wallets.map((map) => (
              <WalletHeader
                key={map._id} // Asegúrate de que cada wallet tenga un identificador único
                walletName={map.walletName}
                isActive="Active" // Cambia a map.isActive si está disponible
                onSelect={() => setSelectedWallet(map)} // Método para seleccionar la wallet
              />
            ))
          ) : (
            <Typography sx={{ color: "#ffffff" }}>
              No hay wallets disponibles.
            </Typography>
          )}
          {/* Botón para mostrar el formulario */}
          <Button
            variant="contained"
            sx={{ marginTop: "20px", backgroundColor: "#39ff14", color: "#ffffff" }}
            onClick={() => setShowForm(!showForm)} // Alterna la visibilidad del formulario
          >
            {showForm ? "Cancelar" : "Agregar Wallet"}
          </Button>
          {/* Formulario para agregar una nueva wallet */}
          {showForm && (
            <Box
              sx={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "#2b2b2b",
                borderRadius: "8px",
                width: "100%",
                color: "#ffffff",
              }}
            >
              <Typography variant="h6">Agregar nueva Wallet</Typography>
              <TextField
                label="Nombre de la Wallet"
                variant="outlined"
                fullWidth
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)} // Actualiza el nombre de la wallet
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#39ff14", color: "#ffffff" }}
                onClick={handleAddWallet} // Maneja la creación de la wallet
              >
                Crear Wallet
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
    </>
  );
};

export default Profile;