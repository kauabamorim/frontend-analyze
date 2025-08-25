"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtVerify } from "jose";

type User = {
  id: string;
  email: string;
  plan: string;
  name: string;
  iat: number;
  exp: number;
} | null;

const UserContext = createContext<User>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";

  useEffect(() => {
    const fetchUser = async () => {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        try {
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
          );
          setUser(payload as User);
        } catch (error) {
          console.error("JWT verification context user failed", error);
          setUser(null);
          document.cookie = "token=; Max-Age=0; path=/";
          window.location.href = "/";
        }
      }
    };

    fetchUser();
  }, [JWT_SECRET]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function logout() {
  document.cookie = "token=; Max-Age=0; path=/";
  window.location.href = "/";
}

export function useUser() {
  return useContext(UserContext);
}
