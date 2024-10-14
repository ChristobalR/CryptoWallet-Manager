import { useState } from "react";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      console.log("Registrando con:", {
        username,
        email,
        firstName,
        lastName,
        password,
      });

      const response = await fetch("https://apichris.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Registro exitoso!");
        window.location.href = "/";
      } else {
        throw new Error("Error al registrar. Por favor intenta de nuevo.");
      }
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
  };
};

export default useRegister;