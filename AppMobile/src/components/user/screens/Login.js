import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {login} from '../UserHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
   // navigation.navigate('Products');
    if (email === '' || password === '') {
      ToastAndroid.show('Plese fill all fields!', ToastAndroid.SHORT);
      return;
    }
    console.log('click');
    try {
      console.log('click2');
      const response = await login(email, password);

      console.log('reponse:', response);

      if (response) {
        ToastAndroid.show('Login success', ToastAndroid.SHORT);
        console.log(response.user);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        navigation.navigate('Products');
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.login}> Login </Text>
        <Text style={styles.sub}> Welcome back to the app </Text>
      </View>
      <View style={{marginTop: 20}}>
        <View
          style={{
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}></View>
        <View style={{marginTop: 40}}>
          <Text style={styles.lableInput}>Email address :</Text>
          <TextInput onChangeText={setEmail} style={styles.input} />
        </View>
        <View style={{marginTop: 24}}>
          <Text style={styles.lableInput}>Password :</Text>
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
      </View>
      {/* remember me */}
      <View style={{marginTop: 24, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#d0d5dd',
              marginRight: 8,
            }}></View>
        </TouchableOpacity>
        <Text style={{color: '#191d23'}}>Keep me logged in</Text>
        {/* fogot password */}
        <TouchableOpacity style={{marginLeft: 100}}>
          <Text style={{color: 'blue'}}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      {/* button login */}
      <View style={{marginTop: 40}}>
        <TouchableOpacity style={styles.btnLogin}>
          <Text onPress={handleLogin} style={styles.textLogin}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

{/* SigUp */}
      <View>
        <Text style={{marginTop: 40, textAlign: 'center'}}>
          Don't have an account?{' '}
          <Text onPress={handleRegister} style={{color: 'blue'}}>
            Sign up
          </Text>
        </Text>
        <View style={styles.lineView} />
      </View>
      
      {/* Continue with gg */}
      <TouchableOpacity style={styles.btnGG}>
        <Image source={require('../../../images/Icon_Google.png')} />
        <Text>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  btnGG: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#e4e7eb',
    padding: 10,
    borderRadius: 8,
    height: 48,
  },
  lineView: {
    marginTop: 13,
    borderStyle: 'solid',
    borderColor: '#4b5768',
    borderTopWidth: 0.5,
    width: '100%',
    height: 1,
    opacity: 0.25,
  },
  login: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: '700',
    fontFamily: 'Inter-SemiBold',
    color: '#191919',
    marginBottom: 8,
  },

  sub: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Inter-Regular',
    color: '#555',
  },

  btnOption: {
    marginRight: 16,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },

  lableInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#191d23',
    textAlign: 'left',
    overflow: 'hidden',
    width: 312,
    height: 24,
    marginBottom: 8,
  },

  input: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#928fa6',
    textAlign: 'left',
    overflow: 'hidden',
    width: 362,
    height: 48,
    backgroundColor: '#f7f7f7',
    borderStyle: 'solid',
    borderColor: '#d0d5dd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },

  btnLogin: {
    width: 362,
    height: 48,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogin: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#fff',
    textAlign: 'center',
    width: 160,
  },
});

var CATEGORY = [
  {
    id: 1,
    name: 'Email',
  },
  {
    id: 2,
    name: 'Phone number',
  },
];
