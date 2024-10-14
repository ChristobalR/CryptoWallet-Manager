import { useState } from "react";

const useLogin = () => {
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
        throw new Error("Nombre de usuario o contraseña incorrectos");
        console.log(response.statusText)
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Nombre de usuario o contraseña incorrectos");
      }

      localStorage.setItem("token", data.token);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
};

export default useLogin;
