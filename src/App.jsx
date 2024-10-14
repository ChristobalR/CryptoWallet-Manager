import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import Wallet from "./layouts/wallet";
import { useState, useEffect } from "react";
import Login from "./layouts/login";
import Landing from "./layouts/landing";
import Register from "./layouts/register";

function App({ handleTheme }) {
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://apichris.vercel.app/tokenverify", {
        // Cambiado a /tokenverify
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Respuesta del servidor:", response); // Muestra la respuesta completa
          if (!response.ok) {
            throw new Error("Error de red: " + response.status); // Lanza un error si la respuesta no es ok
          }
          return response.json(); // Cambiado a json() para recibir el objeto JSON
        })
        .then((data) => {
          console.log("Datos del servidor:", data);
          if (data.status === "ok") {
            localStorage.setItem("logged", "true"); // Guardar estado logueado en localStorage
          } else {
            localStorage.setItem("logged", "false"); // Token inválido
          }
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
          localStorage.setItem("logged", "false"); // Si hay un error, considera que no está logueado
        })
        .finally(() => {
          setLoading(false); // Finaliza la carga
        });
    } else {
      localStorage.setItem("logged", "false"); // Si no hay token, no está logueado
      setLoading(false); // Termina la carga
    }
  }, []); // Asegúrate de que el arreglo de dependencias esté aquí

  // Si está cargando, muestra un loading o un componente de espera
  if (loading) {
    return <div>Loading...</div>;
  }

  // Obtener estado de login desde localStorage
  const logged = localStorage.getItem("logged") === "true";

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
