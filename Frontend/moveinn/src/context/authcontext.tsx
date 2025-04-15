// /src/context/authcontext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { API_AUTH_LOGIN, API_AUTH_REGISTER, API_GET_USER } from "@/utils/endpoints/config";

export interface User {
  id: string;
  mail: string;
  name: string;
  phone: string;
  lastName?: string;
  biography?: string;
  school?: string;
  degree?: string;
  nationality?: string;
  university?: string;  
  socialMedias?: string[]; 
  profilePicture?: string;
  // etc.
}

export interface RegisterData {
  mail: string;
  password: string;
  name: string;
  lastName?: string | null;
  biography?: string | null;
  school?: string | null;
  degree?: string | null;
  nationality?: string | null;
  phone: string ;
  file?: File | null;
  socialMedias?: string[] | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (mail: string, password: string, remember: boolean) => Promise<boolean>;
  register: (
    data: RegisterData,
    remember: boolean
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  clearError: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar el token si existiera
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      updateUserFromToken(storedToken);
    }
  }, []);

  const updateUserFromToken = async (accessToken: string) => {
    try {
      const decoded: any = jwtDecode(accessToken);
      const userId = decoded?.sub;
      if (!userId) throw new Error("Token inválido: Falta 'sub' para el id");

      const response = await axios.get(API_GET_USER(userId), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        throw new Error(`Error al obtener usuario: ${response.status}`);
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setUser(null);
      setToken(null);
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }
  };

  // Login (JSON)
  const login = async (mail: string, password: string, remember: boolean): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_AUTH_LOGIN, { mail, password });
      const accessToken = response.data;
      if (!accessToken) throw new Error("No se recibió 'accessToken' en la respuesta");

      if (remember) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }
      setToken(accessToken);
      await updateUserFromToken(accessToken);
      return true;
    } catch (err: any) {
      console.error("Error de login:", err);
      setError(err.response?.data?.message || err.message || "Error de inicio de sesión.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData, remember: boolean): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("Mail", data.mail ?? "");
      formData.append("Password", data.password ?? "");
      formData.append("Name", data.name ?? "");
      formData.append("LastName", data.lastName ?? "");
      formData.append("Biography", data.biography ?? "");
      formData.append("School", data.school ?? "");
      formData.append("Degree", data.degree ?? "");
      formData.append("Nationality", data.nationality ?? "");
      formData.append("Phone", data.phone ?? "");

      if (data.socialMedias) {
        formData.append("SocialMedias", JSON.stringify(data.socialMedias));
      } else {
        formData.append("SocialMedias", JSON.stringify([]));
      }

      // File (si tu endpoint lo espera con la clave "File")
      if (data.file) {
        formData.append("File", data.file);
      } else {
        // A veces, si no hay archivo, conviene mandar un string vacío
        formData.append("File", "");
      }
      for (const key of formData.keys()) {
        console.log(`FormData key: ${key}, value:`, formData.getAll(key));
      }
      const response = await axios.post(API_AUTH_REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const accessToken = response.data;
      if (!accessToken) throw new Error("No se recibió 'AccessToken' en la respuesta");

      // Guardamos el token
      if (remember) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }
      setToken(accessToken);

      // Actualizamos el usuario
      await updateUserFromToken(accessToken);
      return true;
    } catch (err: any) {
      console.error("Error de registro:", err);
      // Imprimir el body de error del backend
      console.error("Detalles del error:", err.response?.data);
      setError(err.response?.data?.message || err.message || "Error de registro.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
