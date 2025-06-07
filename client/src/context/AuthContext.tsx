"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const LOCAL_STORAGE_KEY = "auth_data";

interface StoredAuthData {
  user: User | null;
  token: string | null;
}

// Helper function to get initial auth data
const getInitialAuthData = (): StoredAuthData => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as StoredAuthData;
    }
  } catch (error) {
    console.error("Error loading auth data from localStorage:", error);
  }

  return { user: null, token: null };
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialAuthData().user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      if (typeof window === "undefined") return;

      try {
        const { token } = getInitialAuthData();
        if (token) {
          // TODO: Validate token with backend
          // const validatedUser = await validateToken(token);
          // setUser(validatedUser);
        }
      } catch (error) {
        console.error("Error validating authentication:", error);
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const saveAuthData = (data: StoredAuthData) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { user, token } = await response.json();
      setUser(user);
      saveAuthData({ user, token });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { user, token } = await response.json();
      setUser(user);
      saveAuthData({ user, token });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call if needed
      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Password reset request failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
