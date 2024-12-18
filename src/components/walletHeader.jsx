import { Box, Typography } from '@mui/material';
import React from 'react';

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
          backgroundColor: "#1c1c1c", // Fondo gris oscuro en lugar de negro
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px", // Bordes redondeados
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra suave
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)", // Escala al pasar el ratón
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Sombra más intensa en hover
          },
        }}
        onClick={onSelect}
      >
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <img src="/2.png" alt="" style={imageStyle} />
          <Typography sx={{ color: "#e0e0e0", marginLeft: "5px" }}> {/* Texto más suave */}
            {walletName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#e0e0e0" }}>
            State:{" "}
            <span
              style={{
                color: isActive ? "#39ff14" : "#e0e0e0", // Verde brillante si está activo
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

export default WalletHeader;
