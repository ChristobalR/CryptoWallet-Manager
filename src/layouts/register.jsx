import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    loading,
    error,
    handleSubmit,
  } = useRegister();

  return (
    <Container sx={{display:"flex", justifyContent:"center", height:"100vh", alignItems:"center"}}>
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            onClick={() => (window.location.href = "/login")}
          >
            Inicia sesión aquí.
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
