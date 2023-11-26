import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import {useLogin} from '../Providers/LoginProvider';
import routes from '../Constants/routes';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {isLoggedIn} = useLogin();
  const initialRouteName = isLoggedIn ? routes.Home : routes.Login;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {isLoggedIn ? (
          <Stack.Screen name={routes.Home} component={Home} />
        ) : (
          <Stack.Screen name={routes.Login} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
