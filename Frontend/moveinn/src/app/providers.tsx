"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/context/authcontext";
import { WebsocketProvider } from "@/context/WebSocketContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <WebsocketProvider>
        {children}
      </WebsocketProvider>
    </AuthProvider>
  );
}
