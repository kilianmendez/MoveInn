"use client";

import { AuthProvider } from "@/context/authcontext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
