import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Products from '../product/screens/Products';
import Profile from '../product/screens/Profile';
import Detail from '../product/screens/Detail';
import BuyTickets from '../product/screens/BuyTickets';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
     

      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Ticket" component={BuyTickets}/>
    </Stack.Navigator>
  );
};

export default UserNavigation;
