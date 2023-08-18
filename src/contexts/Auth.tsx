import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, authService } from '../services/authService';
import { showToastMessage } from '../utils';
import { STORAGE_AUTH_USER, EMAIL_AUTH_USER, PASSWORD_AUTH_USER } from '../constants';

type AuxProps = {
  children: ReactNode
}

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(data: {email: string, password: string}): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuxProps> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem(STORAGE_AUTH_USER);
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (data: {email: string, password: string}) => {
    const { email, password } = data;
    try {
      const _authData = await authService.signIn(
        email,
        password,
      );

      // Check if the received email and password match the expected values
      if (_authData.email === EMAIL_AUTH_USER && _authData.password === PASSWORD_AUTH_USER) {
        showToastMessage({type: 'success', description: 'Successfully signed in'});
        setAuthData(_authData);
        AsyncStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(_authData));
      } else {
        showToastMessage({type: 'danger', description: 'Email or password mismatch'});
      }
    } catch (error) {
      showToastMessage({type: 'danger', description: 'Email or password mismatch'});
    }
  };

  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem(STORAGE_AUTH_USER);
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};