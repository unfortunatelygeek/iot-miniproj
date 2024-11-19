import React, { createContext, useContext, useState } from "react";

export enum Role {
  ADMIN = 'admin',
  DRIVER = 'driver',
}

interface AuthProps {
  authState: { authenticated: boolean | null; username: string | null; role: Role | null };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ 
    authenticated: boolean | null; 
    username: string | null; 
    role: Role | null; 
  }>({ 
    authenticated: null, 
    username: null, 
    role: null, 
  });

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setAuthState({ 
        authenticated: true, 
        username: username, 
        role: Role.ADMIN 
      });
    } 
    else if (username === 'driver' && password === 'driver') {
      setAuthState({ 
        authenticated: true, 
        username: username, 
        role: Role.DRIVER 
      });
    } 
    else {
      alert('Invalid username or password');
    }
  };
  
  const logout = () => {
    setAuthState({
      authenticated: false,
      username: null,
      role: null,
    });
  };

  const value = {
    authState,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}