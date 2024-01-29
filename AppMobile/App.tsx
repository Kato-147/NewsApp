import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import AxiosInstance from './src/helper/AxiosInstance';
import { NavigationContainer } from '@react-navigation/native';
import UserNavigation from './src/components/user/UserNavigation';
import Products from './src/components/product/screens/Products';

function App(): JSX.Element {
  return (
    
      <NavigationContainer>
        <UserNavigation/>
       
      </NavigationContainer>
    
  );
}

export default App;
