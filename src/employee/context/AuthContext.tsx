import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { fetchUser } from '@/api/database';

// Define AuthContext types
interface AuthContextType {
  user: User | null;
  name: string | null;
  role: string | null;
  loading: boolean;
}

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType>({ user: null, name: null, role: null, loading: true });

// AuthProvider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const userData = await fetchUser(user.uid);
        if (userData?.name) {
          setName(userData.name);
        }
        if (userData?.role) {
          setRole(userData.role);
        }
      }
    };

    getUserData();
  }, [user]); // Dependency on user

  return (
    <AuthContext.Provider value={{ user, name, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
