// /src/app/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  sub: string;
  // Incluye aquí otros campos que pueda tener tu token
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  // Otros campos que tu backend retorne
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAccessToken = () => {
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || "";
  };

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }
    let decoded: JwtPayload;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
      router.push("/login");
      return;
    }
    const userId = decoded.sub;
    // Llamada al backend para obtener datos completos del usuario
    fetch(`https://localhost:7023/api/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching user data");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch user data");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!userData) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {userData.email}</p>
      <p>User ID: {userData.id}</p>
      {/* Muestra más datos según los retorne tu API */}
      <button
        className="mt-4 py-2 px-4 bg-red-600 text-white rounded"
        onClick={() => {
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");
          router.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
