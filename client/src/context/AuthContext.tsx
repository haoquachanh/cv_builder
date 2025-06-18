"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
const AUTH_COOKIE_NAME = "authToken";

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

// Helper function to save auth data
const saveAuthData = (data: StoredAuthData) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    if (data.token) {
      Cookies.set(AUTH_COOKIE_NAME, data.token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } else {
      Cookies.remove(AUTH_COOKIE_NAME);
    }
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mark when we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load auth data only after component has hydrated
  useEffect(() => {
    if (isClient) {
      const { user, token } = getInitialAuthData();
      if (user && token) {
        setUser(user);
      }
      setIsLoading(false);
    }
  }, [isClient]);
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // For local development, simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `Login attempt: Email=${email}, Password length=${password.length}`
      );

      // In a real app, you would validate credentials against a backend
      // For local development, accept any credentials with minimum validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }

      // Create a mock user with the email (could also check localStorage for existing users)
      const mockUser: User = {
        id: "user_" + Date.now().toString(),
        email,
        fullName: email.split("@")[0], // Simple name from email for demo
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = "mock_token_" + Date.now();

      setUser(mockUser);
      saveAuthData({ user: mockUser, token: mockToken });
      router.push("/dashboard");
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
      // For local development, simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `Registration: Email=${email}, Name=${name}, Password length=${password.length}`
      );

      // Create a mock user for local development
      const mockUser: User = {
        id: "user_" + Date.now().toString(),
        email,
        fullName: name,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = "mock_token_" + Date.now();

      // Store the user data
      setUser(mockUser);
      saveAuthData({ user: mockUser, token: mockToken });

      // Redirect to dashboard
      router.push("/dashboard");
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
      setUser(null);
      saveAuthData({ user: null, token: null });
      router.push("/login");
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
      // TODO: Implement password reset logic
      console.log("Password reset requested for:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
