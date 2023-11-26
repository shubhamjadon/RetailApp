import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

type UserType = FirebaseAuthTypes.User | null;

interface LoginContextType {
  isLoggedIn: boolean;
  userData: UserType;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  userData: null,
  login: () => {},
  logout: () => {},
});

const LoginProvider = ({children}: LoginProviderProps) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<UserType>(null);

  const onAuthStateChanged = (currentUser: UserType) => {
    console.log('UserData: ', currentUser);
    setUser(currentUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser =>
      onAuthStateChanged(currentUser),
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  const login = (email: string, password: string) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(_ => {
        Alert.alert('Login Failed', 'Invalid email or password');
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {})
      .catch(_ => {
        Alert.alert(
          'Logout Failed',
          'Something went wrong, Please try again after sometime',
        );
      });
  };

  if (initializing) {
    // Hide SplashScreen in this instead of returing null
    return null;
  }

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: !!user,
        userData: user,
        login,
        logout,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const {isLoggedIn, userData, login, logout} =
    useContext<LoginContextType>(LoginContext);

  return {isLoggedIn, userData, login, logout};
};

export default LoginProvider;
