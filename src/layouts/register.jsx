import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(''); // Nuevo estado para firstName
  const [lastName, setLastName] = useState(''); // Nuevo estado para lastName
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      console.log("Registrando con:", { username, email, firstName, lastName, password });

      const response = await fetch("https://apichris.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, firstName, lastName, password }), // Incluye firstName y lastName
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      // Verifica si el token está presente en la respuesta
      if (data.token) {
        localStorage.setItem("token", data.token); // Almacena el token
        alert("Registro exitoso!"); // Mensaje de éxito (opcional)
        window.location.href = "/"; // Redirige a la página de inicio (Landing Page)
      } else {
        throw new Error("Error al registrar. Por favor intenta de nuevo.");
      }
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
          Crear Cuenta
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
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Controla el estado de firstName
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Controla el estado de lastName
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
          <TextField
            label="Confirma tu Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} /> : "Registrar"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿Ya tienes cuenta?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => window.location.href = "/login"} // Cambia la ruta según tu configuración
          >
            Inicia sesión aquí.
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;