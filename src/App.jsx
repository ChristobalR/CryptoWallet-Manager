import { Box, CircularProgress, Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Wallet from "./layouts/wallet";
import Login from "./layouts/login";
import Landing from "./layouts/landing";
import Register from "./layouts/register";
import useTokenVerification from "./hooks/useTokenVerification";
import useFetchWalletInfo from "./hooks/fetchWalletInfo";
import { useEffect } from "react";

function App({ handleTheme }) {
  const { loading, logged } = useTokenVerification();
  const { data, loading: loadingWalletInfo, error } = useFetchWalletInfo("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

  // Puedes revisar el contenido de `data` en la consola
 useEffect(()=>{

 },[])
  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          
        }}
      >
        <CircularProgress color="primary" />
      </Container>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route
          path="/wallet/*"
          element={logged ? <Wallet /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={
            logged ? (
              <Navigate to="/" />
            ) : (
              <Login setLogged={() => localStorage.setItem("logged", "true")} />
            )
          }
        />
        <Route
          path="/register"
          element={
            logged ? (
              <Navigate to="/" />
            ) : (
              <Register
                setLogged={() => localStorage.setItem("logged", "true")}
              />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
