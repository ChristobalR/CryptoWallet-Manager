import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Iniciando sesión con:", { username, password });

      const response = await fetch("https://apichris.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Nombre de usuario o contraseña incorrectos");
      }

      localStorage.setItem("token", data.token);

      // Refresh the page instead of navigating
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
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
            onClick={() => window.location.href = "/register"} // Cambia la ruta según tu configuración
          >
            Crea una aquí.
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;