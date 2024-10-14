
import { useState, useEffect } from "react";

const useTokenVerification = () => {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://apichris.vercel.app/tokenverify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error de red: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "ok") {
            setLogged(true);
            localStorage.setItem("logged", "true");
          } else {
            setLogged(false);
            localStorage.setItem("logged", "false");
          }
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
          setLogged(false);
          localStorage.setItem("logged", "false");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLogged(false);
      localStorage.setItem("logged", "false");
      setLoading(false);
    }
  }, []);

  return { loading, logged };
};

export default useTokenVerification;
