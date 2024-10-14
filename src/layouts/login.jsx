import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";
import useLogin from "../hooks/submitLogin";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <Container sx={{display:"flex", justifyContent:"center", height:"100vh", alignItems:"center"}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        
        }}
      >
       
        <Typography variant="h4" sx={{ mb: 2 }}>
          Iniciar Sesión
        </Typography>
       
       

        
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => (window.location.href = "/register")}
          >
            Crea una aquí.
          </Button>
        </Typography>
       
      </Box>
    </Container>
  );
};

export default Login;
