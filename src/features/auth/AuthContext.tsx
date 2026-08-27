import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, FarmerProfile } from '../../types';
import { mockFarmerProfile } from '../../services/mockData';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  farmer: FarmerProfile;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('kisanflow_user_role') as UserRole;
    return savedRole || 'FARMER';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('kisanflow_auth_status') === 'true' || true;
  });

  const [farmer] = useState<FarmerProfile>(mockFarmerProfile);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('kisanflow_user_role', newRole);
  };

  const login = (selectedRole: UserRole) => {
    setRoleState(selectedRole);
    setIsAuthenticated(true);
    localStorage.setItem('kisanflow_user_role', selectedRole);
    localStorage.setItem('kisanflow_auth_status', 'true');
    localStorage.setItem('kisanflow_auth_token', 'demo-token-' + Date.now());
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kisanflow_auth_status');
    localStorage.removeItem('kisanflow_auth_token');
  };

  useEffect(() => {
    localStorage.setItem('kisanflow_user_role', role);
  }, [role]);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        farmer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
