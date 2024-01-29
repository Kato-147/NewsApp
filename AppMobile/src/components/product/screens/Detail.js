import {StyleSheet, Text, View, Image, ScrollView, Modal, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AxiosInstance from '../../../helper/AxiosInstance';

const Detail = ({route, navigation}) => {
  const [data, setData] = useState({});
  
  const {id} = route.params;
  console.log('id', id);

  const chiTiet = async id => {
    try {
      const result = await AxiosInstance().get(`/products/${id}`);
      console.log('result=>>>>>>>>>>>>>>>>>>', result);
      setData(result);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    chiTiet(id);
  }, []);

  const handleTicket=()=>{
    navigation.navigate('Ticket');
  }
  return (
    <View style={styles.container}>
      {/* Poster Image */}
      <View style={{alignItems: 'center'}}>
        <Image style={styles.image} source={{uri: data.image}} />
      </View>
{/* Title && Price */}
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          {data.name}
        </Text>
        <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>
          Price : {data.price}đ
        </Text>
        
      </View>

      {/* <Text style={styles.text}>{data.quantity}</Text> */}
      {/* Decription */}
      <ScrollView style={{padding: 5}}>
        <Text style={styles.text}>{data.description}</Text>
      </ScrollView>

      {/* Modal */}
      
      {/* Button */}
      <TouchableOpacity
        style={[styles.button, styles.btnTicket]}
        onPress={handleTicket}>
        <Text style={styles.textStyle}>Buy Ticket</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:'center',
    padding: 10,
  },
  image: {
    width: 350,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    padding: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  btnTicket: {
    width: 362,
    height: 48,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
