import { Box, Container, Typography, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import WalletHeader from "../components/walletHeader";
import useFetchProfile from "../hooks/useFetchProfile";
import useAddWallet from "../hooks/useAddWallet";
import useBitcoinWalletInfo from "../hooks/fetchWalletInfo"; //

const Profile = () => {
  const { userData, error } = useFetchProfile();
  const { newWalletName, setNewWalletName, showForm, setShowForm, handleAddWallet } = useAddWallet();

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  
  const { balance, transactions, loading, error: walletError } = useBitcoinWalletInfo(
    selectedWallet ? selectedWallet.publicKey : null
  );

  return (
    <>
      <Navbar userData={userData} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
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
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              Llave Pública: {selectedWallet.publicKey}
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              Llave Privada:{" "}
              {showPrivateKey ? selectedWallet.privateKey : "************"}
              <Button
                sx={{ marginLeft: "10px", color: "#39ff14" }}
                onClick={() => setShowPrivateKey((prev) => !prev)}
              >
                {showPrivateKey ? "Ocultar" : "Mostrar"}
              </Button>
            </Typography>

            {/* Mostrar balance y transacciones si están disponibles */}
            {loading ? (
              <Typography variant="body1" sx={{ color: "#ffffff" }}>
                Cargando balance y transacciones...
              </Typography>
            ) : walletError ? (
              <Typography variant="body1" sx={{ color: "#ff4c4c" }}>
                Error al obtener los datos: {walletError}
              </Typography>
            ) : (
              <>
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  Balance: ${balance} USD
                </Typography>

                <Typography variant="h6" sx={{ color: "#39ff14", marginTop: "10px" }}>
                  Últimas 3 transacciones:
                </Typography>

                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <Typography key={index} variant="body2" sx={{ color: "#ffffff" }}>
                      Monto: ${tx.amountUSD} USD, Fecha: {tx.date}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#ffffff" }}>
                    No hay transacciones recientes.
                  </Typography>
                )}
              </>
            )}

            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "#39ff14", marginTop: "20px" }}
              onClick={() => {
                setSelectedWallet(null);
                setShowPrivateKey(false);
              }}
            >
              Volver a la lista
            </Typography>
          </Box>
        ) : (
          <>
            {userData && userData.user.wallets && userData.user.wallets.length > 0 ? (
              userData.user.wallets.map((map) => (
                <WalletHeader
                  key={map._id}
                  walletName={map.walletName}
                  isActive="Active"
                  onSelect={() => setSelectedWallet(map)}
                />
              ))
            ) : (
              <Typography sx={{ color: "#ffffff" }}>
                No hay wallets disponibles.
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#39ff14",
                color: "#ffffff",
              }}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancelar" : "Agregar Wallet"}
            </Button>

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
                  onChange={(e) => setNewWalletName(e.target.value)}
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#39ff14", color: "#ffffff" }}
                  onClick={handleAddWallet}
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
