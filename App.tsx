import React from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <AuthProvider>
      <Router />
      <FlashMessage />
    </AuthProvider>
  );
};

export default App;