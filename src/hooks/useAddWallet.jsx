
import { useState, useEffect } from "react";

const useAddWallet = () => {


  const [error, setError] = useState(null); 
const [newWalletName, setNewWalletName] = useState("");
const [showForm, setShowForm] = useState(false);

const handleAddWallet = () => {
  const token = localStorage.getItem("token");
 console.log("test")
  fetch("https://apichris.vercel.app/addwallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ walletName: newWalletName }),
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al agregar la wallet");
      }
      return respuesta.json();
    })
    .then(() => {
      setNewWalletName("");
      setShowForm(false);
      window.location.reload();
    })
    .catch((error) => {
      setError(error.message);
      console.log(error.message);
    });
    
};
return { newWalletName, setNewWalletName,showForm, setShowForm, handleAddWallet }
}

export default useAddWallet