import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'user_nx_9421',
    name: 'Aryan Sharma',
    email: 'aryan@example.com',
    phone: '+91 98765 43210',
    joined: 'January 2025',
    savedAddresses: [
      {
        id: 'addr_1',
        fullName: 'Aryan Sharma',
        phone: '+91 98765 43210',
        addressLine: 'Flat 402, Skyline Residency, Tech Zone 4',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560103',
        isDefault: true
      }
    ]
  });

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const addAddress = (newAddress) => {
    setUser(prev => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, { id: `addr_${Date.now()}`, ...newAddress }]
    }));
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile, addAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
