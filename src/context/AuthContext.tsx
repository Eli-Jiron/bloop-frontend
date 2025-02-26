/* eslint-disable react-refresh/only-export-components */
import { getData } from '@services/crud';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  user: User | undefined;
  setUpdateUser: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: Props) => {
  const url = '/users/profile/';

  const [user, setUser] = useState<User | undefined>();
  const [updateUser, setUpdateUser] = useState<number>(0);

  useEffect(() => {
    getData(url).then((r) => setUser(r.data));
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, setUpdateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
