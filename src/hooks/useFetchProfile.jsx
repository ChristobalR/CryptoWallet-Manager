import { useState, useEffect } from "react";

function useFetchProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://apichris.vercel.app/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => setError(err.message));
  }, []);

  return { userData, error };
}

export default useFetchProfile;