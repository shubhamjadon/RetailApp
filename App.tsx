import React from 'react';
import MainNavigator from './src/Navigators/MainNavigator';
import LoginProvider from './src/Providers/LoginProvider';

const App = () => {
  return (
    <LoginProvider>
      <MainNavigator />
    </LoginProvider>
  );
};

export default App;
