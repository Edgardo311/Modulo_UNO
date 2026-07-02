
import React, { createContext, useContext, useState } from 'react';

const AutoContext = createContext();

export const AutoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (username, password) => {
    setLoading(true);
    if (username === 'admin' && password === '1234') {
      setUser({ name: username });
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
  };

  const signOut = async () => {
    setUser(null);
    return { success: true };
  };

  return (
    <AutoContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AutoContext.Provider>
  );
};

export const useAuto = () => useContext(AutoContext);
