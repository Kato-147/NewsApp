import { StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid, } from 'react-native'
  import React, {useState} from 'react';
  import {register} from '../UserHTTP';

const Register = ({navigation}) => {

const handleLogin =()=>{
  navigation.navigate('Login');
}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {

    if (email === '' || password === '' || name === '' || address === '') {
      ToastAndroid.show('Please fill all fields!',ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await register(email, password, name, address);
      console.log(response);

      if(response){
        ToastAndroid.show('Register succseccfully', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Register failed', ToastAndroid.SHORT);
    }

  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.login}> Register </Text>
        <Text style={styles.sub}> Create an account to continue </Text>
      </View>
      <View style={{marginTop: 40}}>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Email address :</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Password :</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
           
            secureTextEntry={true}
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Name :</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
           
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Address :</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            
          />
        </View>
      </View>



      <View style={{marginTop: 10}}>
        <TouchableOpacity onPress={handleRegister} style={styles.btnLogin}>
          <Text style={styles.textLogin}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{marginTop: 10, textAlign: 'center'}}>
          Already have an account?{' '}
          <Text onPress={handleLogin} style={{color: 'blue'}}>
            Sign in
          </Text>
        </Text>
        <View style={styles.lineView} />
      </View>
      <TouchableOpacity style={styles.btnGG}>
        <Image source={require('../../../images/Icon_Google.png')} />
        <Text>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

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
    backgroundColor: '#ff5820',
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
    marginTop: 8,
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