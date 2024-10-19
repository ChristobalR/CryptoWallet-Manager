import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchPrices from "../hooks/fetchPrices";

const Landing = () => {
  const { userData } = useFetchProfile();
  const { prices, loading, error, highlightedPrice } = useFetchPrices();

  const logged = localStorage.getItem("logged") === "true";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/wallet");
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <NavBar userData={userData} />
  
      {/* Welcome and Main Call to Action */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          padding: "20px",
          maxWidth: "90%",
          textAlign: "center",
          color: "#e1e1e1", // Set general text color to white
        }}
      >
        {!logged ? (
          <Typography variant="h6" align="center">
            <span
              style={{ color: "#c62828", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Ingresa
            </span>{" "}
            o{" "}
            <span
              style={{ color: "#c62828", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/register")}
            >
              Regístrate
            </span>{" "}
            para poder generar wallets y almacenar criptomonedas.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" color="#fff">
              Bienvenido,{" "}
              <span style={{ fontWeight: "bold", color: "#c62828" }}>
                {userData?.user?.firstName}
              </span>
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#c62828",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#c62828",
                },
              }}
              onClick={handleNavigate}
            >
              Acceder a mis wallets
            </Button>
          </>
        )}
      </Container>
  
      {/* Cryptocurrency Prices */}
      <Container sx={{ marginTop: "40px", textAlign: "center", maxWidth: "90%", color: "#e1e1e1" }}>
        <Typography variant="h5" sx={{ marginBottom: "20px", color: "#fff" }}>
          Precios de las principales criptomonedas
        </Typography>
        {loading && <CircularProgress sx={{ marginTop: "20px", color: "#fff" }} />}
        {error && <Typography color="error">Error al cargar los precios.</Typography>}
        {prices && (
          <Grid container spacing={3} sx={{ marginTop: "20px", justifyContent: "center" }}>
            {Object.entries(prices).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  sx={{
                    backgroundColor:"#181A20",
                    borderRadius: "12px",
                   
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                     
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "300", color: "#fff", marginBottom: "10px" }}
                    >
                      {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "200",
                        color: highlightedPrice ? "#fff" : "#fff",
                        transition: "color 0.5s, transform 0.5s",
                        transform: highlightedPrice ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      ${formatPrice(value.usd)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
  
      {/* About Section */}
 {/* About Section */}
{/* About Section */}
<Container
  sx={{
    padding: "40px",
    marginTop: "60px",
    maxWidth: "90%",
    color: "#fff",
    
    borderRadius: "8px",
  }}
>
  <Typography variant="h4" sx={{ marginBottom: "20px", color: "#fff" }}>
    Acerca de CryptoTracker
  </Typography>
  
  <Typography variant="body1" color="#e1e1e1" align="center" sx={{ marginBottom: "20px" }}>
    CryptoTracker es una plataforma de seguimiento de criptomonedas que permite a los usuarios consultar precios en
    tiempo real y almacenar sus activos digitales de forma segura.
  </Typography>
  
  <Typography variant="h6" sx={{ marginTop: "30px", marginBottom: "10px", color: "#fff" }}>
    Funciones Clave
  </Typography>
  <Typography variant="body1" color="#e1e1e1" sx={{ marginBottom: "20px" }}>
    - **Alerta de precios**: Configura alertas para recibir notificaciones cuando el precio de tus criptomonedas preferidas alcance un valor específico.
    <br />
    - **Cartera personalizada**: Organiza tus activos digitales y visualiza el valor total de tu cartera en tiempo real.
    <br />
    - **Análisis avanzado**: Accede a gráficos de rendimiento histórico y datos de mercado para tomar decisiones informadas.
    <br />
    - **Seguridad de datos**: Protegemos tu información personal y tus activos con encriptación avanzada.
  </Typography>
  
  <Typography variant="h6" sx={{ marginTop: "30px", marginBottom: "10px", color: "#fff" }}>
    Nuestra Misión
  </Typography>
  <Typography variant="body1" color="#e1e1e1" sx={{ marginBottom: "20px" }}>
    En CryptoTracker, nuestra misión es proporcionar una plataforma segura y confiable para que los entusiastas de
    las criptomonedas puedan monitorear sus activos y tomar decisiones de inversión con tranquilidad.
  </Typography>

  <Typography variant="h6" sx={{ marginTop: "30px", marginBottom: "10px", color: "#fff" }}>
    Soporte y Actualizaciones Constantes
  </Typography>
  <Typography variant="body1" color="#e1e1e1" sx={{ marginBottom: "20px" }}>
    Estamos comprometidos con la mejora continua de CryptoTracker. Nuestro equipo de soporte está disponible 24/7 para
    ayudarte, y lanzamos actualizaciones frecuentes para añadir nuevas funcionalidades y mejorar la experiencia del usuario.
  </Typography>
</Container>

      {/* Benefits Section */}
      <Container sx={{ marginTop: "40px", padding: "40px", maxWidth: "90%",  color: "#e1e1e1" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", color: "#fff" }}>
          Beneficios de usar CryptoTracker
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
           <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "150px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#181A20",
      color: "#fff",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", alignSelf: "flex-start" }}>
      Seguridad Avanzada
    </Typography>
    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{  color: "rgba(255, 255, 255, 0.8)" }}>
        CryptoTracker utiliza encriptación de alto nivel para garantizar la seguridad de tus activos digitales.
      </Typography>
    </Box>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "150px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#181A20",
      color: "#fff",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", alignSelf: "flex-start" }}>
      Precios en Tiempo Real
    </Typography>
    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{  color: "rgba(255, 255, 255, 0.8)" }}>
        Accede a los precios más recientes de las principales criptomonedas del mercado.
      </Typography>
    </Box>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "150px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#181A20",
      color: "#fff",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", alignSelf: "flex-start" }}>
      Cartera Segura
    </Typography>
    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
      <Typography variant="body1" sx={{  color: "rgba(255, 255, 255, 0.8)" }}>
        Almacena tus criptomonedas de manera segura y organiza tu cartera.
      </Typography>
    </Box>
  </Card>
          </Grid>
        </Grid>
      </Container>
  
      {/* FAQ Section */}
      <Container sx={{ marginTop: "60px", padding: "40px", maxWidth: "90%",color: "#e1e1e1" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", color: "#fff" }}>
          Preguntas Frecuentes
        </Typography>
  
        <Typography variant="h6" sx={{color: "#fff" , marginBottom: "10px" }}>
          ¿Cómo puedo empezar a usar CryptoTracker?
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px" }}>
          Solo tienes que registrarte en la plataforma, ingresar a tu cuenta y comenzar a seguir las criptomonedas de tu interés.
        </Typography>
  
        <Typography variant="h6" sx={{color: "#fff" , marginBottom: "10px" }}>
          ¿Es seguro almacenar criptomonedas en CryptoTracker?
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Sí, utilizamos las mejores prácticas de seguridad, incluyendo encriptación avanzada, para proteger tus activos digitales.
        </Typography>
  
        <Typography variant="h6" sx={{color: "#fff" , marginBottom: "10px" }}>
          ¿Cómo puedo agregar más criptomonedas a mi cartera?
        </Typography>
        <Typography variant="body1" sx={{ }}>
          Desde la sección de wallets, puedes agregar nuevas criptomonedas y gestionar tus inversiones.
        </Typography>
      </Container>
    </>
  );
}
  export default Landing;
  