import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import MainNavigator from './src/Navigators/MainNavigator';
import LoginProvider from './src/Providers/LoginProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <LoginProvider>
            <MainNavigator />
          </LoginProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

export default App;
