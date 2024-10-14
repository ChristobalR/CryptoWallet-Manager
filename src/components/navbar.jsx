import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Navbar = ({ userData }) => {
  const navigate = useNavigate(); // Obtén la función de navegación

  const handleLogin = () => {
    navigate('/login'); // Cambia la ruta a '/login'
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    localStorage.setItem("logged", "false"); // Actualiza el estado de logged
    window.location.reload(); // Recarga la página
  };

  const logged = localStorage.getItem("logged") === "true"; // Verifica si está logueado

  return (
    <Container>
      <Box 
        sx={{
          width: "100%", 
          height: "80px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "0 20px"
        }}
      >
        {/* Imagen */}
        <img 
          src="/3.png" 
          alt="Logo" 
          style={{ height: "35px", width: "auto" }}
        />

        {/* Verifica si el usuario está logueado */}
        {logged ? (
          // Si está logueado, muestra el botón de Logout
          <Button 
            variant="outlined" 
            color="black" // Cambia el color según tu preferencia
            onClick={handleLogout} // Agrega el evento onClick
          >
            Logout
          </Button>
        ) : (
          // Si no está logueado, muestra el botón de Login
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogin} // Agrega el evento onClick
          >
            Login
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Navbar;