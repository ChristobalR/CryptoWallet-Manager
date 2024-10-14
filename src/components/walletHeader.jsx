import { Box, Typography } from '@mui/material';
import React from 'react'

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
            transition: "transform 0.3s ease", 
            "&:hover": {
              transform: "scale(1.02)", 
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
export default WalletHeader