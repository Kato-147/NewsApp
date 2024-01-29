import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import { addTickets } from '../ProductHTTP'

const BuyTickets = ({navigation}) => {

  const [nameUser, setNameUser] = useState('')
  const [nameMovie, setNameMovie] = useState('');
  const [quantity, setQuantity] = useState('')
  const [chair, setChair] = useState('');

  const handleBuyTicket = async () =>{

    if(nameMovie === '' || nameUser === '' || quantity === '' || chair === ''){
      ToastAndroid.show('Please fill all fields!',ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await addTickets(nameUser, nameMovie, quantity,chair);
      console.log(response);
      if(response){
        ToastAndroid.show('Buy succseccfully', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Products');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Buy failed', ToastAndroid.SHORT);
    }

  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.sub}> Buy your ticket here </Text>
      </View>
      <View style={{marginTop: 40}}>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}> Your name : </Text>
          <TextInput
            value={nameUser}
            onChangeText={setNameUser}
            style={styles.input}
            
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Movie name :</Text>
          <TextInput
            value={nameMovie}
            onChangeText={setNameMovie}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Quantity ticket :</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
           
          />
        </View>
        <View style={{marginTop: 14}}>
          <Text style={styles.lableInput}>Chair number :</Text>
          <TextInput
            value={chair}
            onChangeText={setChair}
            style={styles.input}
            
          />
        </View>
      </View>



      <View style={{marginTop: 10}}>
        <TouchableOpacity onPress={handleBuyTicket} style={styles.btnLogin}>
          <Text style={styles.textLogin}>Buy ticket</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  )
}

export default BuyTickets

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
})