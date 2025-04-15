// /src/context/authcontext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // IMPORT CORREGIDO, exportación por defecto
import {
  API_GET_USER,
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
} from "@/utils/endpoints/config";
import { useRouter } from "next/navigation";

interface DecodedToken {
  id: string;
  email: string;
  name: string;
}

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
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (mail: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (
    nickname: string,
    mail: string,
    password: string,
    avatarUrl: string
  ) => Promise<void>;
  logout: () => void;
  error: string | null; 
  isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para errores
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para loading
  const router = useRouter();

  const extractUserId = (accessToken: string): string | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(accessToken);
      return decoded.id || null;
    } catch (error) {
      console.error("Error decodificando token:", error);
      return null;
    }
  };

  const updateUserFromToken = async (accessToken: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = extractUserId(accessToken);
      if (!userId) throw new Error("Token inválido: falta 'sub'");
      const response = await axios.get(API_GET_USER(userId), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        throw new Error(`Error al obtener usuario: ${response.status}`);
      }
    } catch (error) {
      console.error("Error actualizando datos del usuario:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      setUser(null);
      setToken(null);
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      updateUserFromToken(storedToken);
    }
  }, []);

  const login = async (
    mail: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        API_AUTH_LOGIN,
        { mail, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { accessToken } = response.data;
      if (!accessToken)
        throw new Error("No se recibió accessToken en la respuesta");

      if (rememberMe) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        sessionStorage.setItem("accessToken", accessToken);
      }
      setToken(accessToken);
      await updateUserFromToken(accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    nickname: string,
    mail: string,
    password: string,
    avatarUrl: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const body = {
        mail,
        nickname,
        password,
        avatarUrl,
        role: "User",
      };
      const response = await axios.post(API_AUTH_REGISTER, body, {
        headers: { "Content-Type": "application/json" },
      });
      const accessToken = response.data;
      if (!accessToken)
        throw new Error("No se recibió accessToken en la respuesta");

      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      await updateUserFromToken(accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error en registro:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
    router.push("/");
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
