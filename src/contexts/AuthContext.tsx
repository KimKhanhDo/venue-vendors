// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { toast } from 'sonner';

// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   phone: string;
//   email: string;
//   password: string;
//   role: string;
// }

// interface Credentials {
//   email: string;
//   password: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   logIn: (credentials: Credentials) => void;
//   logOut: () => void;
//   updateUser: (updated: User) => void;
// }

// // AuthContext contains data to share for whole app - provides Provider & Consumer
// const AuthContext = createContext<AuthContextType | null>(null);

// // Provider - provide data
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const user = localStorage.getItem('currentUser');

//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }

//     setIsLoading(false);
//   }, []);

//   const logIn = (credentials: Credentials) => {
//     // 1. Get user list from localStorage
//     const raw = localStorage.getItem('users');
//     const users: User[] = raw ? JSON.parse(raw) : [];

//     // 2. Find user matches email + password
//     const authenticatedUser = users.find(
//       (user) => user.email === credentials.email && user.password === credentials.password,
//     );

//     if (authenticatedUser) {
//       setCurrentUser(authenticatedUser); // 3. update state
//       localStorage.setItem('currentUser', JSON.stringify(authenticatedUser)); // 4. save currentUser to localStorage as backup when page refresh
//     } else {
//       throw new Error('Invalid email or password');
//     }
//   };

//   const logOut = () => {
//     localStorage.removeItem('current_user');
//     setCurrentUser(null);
//     toast.success("You've been successfully logged out!");
//   };

//   // Update profile — syncs both 'users' list and 'currentUser'
//   const updateUser = (updated: User) => {
//     const raw = localStorage.getItem('users');
//     const users: User[] = raw ? JSON.parse(raw) : [];
//     const newUsers = users.map((u) => (u.id === updated.id ? updated : u));

//     localStorage.setItem('users', JSON.stringify(newUsers));
//     localStorage.setItem('currentUser', JSON.stringify(updated));
//     setCurrentUser(updated);
//   };

//   return (
//     <AuthContext.Provider value={{ user: currentUser, isLoading, logIn, logOut, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for consumer
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// ── Import User from the single source of truth ──
import type { User } from '@/types';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logIn: (credentials: Credentials) => void;
  logOut: () => void;
  updateUser: (updated: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('currentUser');
    if (raw) setCurrentUser(JSON.parse(raw));
    setIsLoading(false);
  }, []);

  const logIn = (credentials: Credentials) => {
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];

    const authenticatedUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );

    if (authenticatedUser) {
      setCurrentUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success("You've been successfully logged out!");
  };

  // Update profile — syncs both 'users' list and 'currentUser'
  // Also persists credibilityScore when called from MyProfilePage
  const updateUser = (updated: User) => {
    const raw = localStorage.getItem('users');
    const users: User[] = raw ? JSON.parse(raw) : [];
    const newUsers = users.map((u) => (u.id === updated.id ? updated : u));

    localStorage.setItem('users', JSON.stringify(newUsers));
    localStorage.setItem('currentUser', JSON.stringify(updated));
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, isLoading, logIn, logOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
