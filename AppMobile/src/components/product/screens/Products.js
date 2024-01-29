import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getAllProducts} from '../ProductHTTP';

const Products = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      console.log('resssssssssssssssssss', res);

      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const renderProduct = ({item}) => {
    const {name, price, description, image} = item;
    return (
      <TouchableOpacity
        style={styles.product}
        onPress={() => navigation.navigate('Detail', {id: item._id})}>
        <View style={styles.productImage}>
          <Image
            source={{uri: item.image}}
            style={{width: 100, height: 100, borderRadius: 10, }}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>Price : {price} đ</Text>
          <Text style={styles.productDescription} numberOfLines={2}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.container}>
      {/* Product && Profile */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View></View>
        <Text style={styles.title}>Movie Tickets</Text>
        <TouchableOpacity onPress={handleProfile}>
        <Image source={require('../../../images/Icon_Profile.png')} style={styles.profile}  />
        </TouchableOpacity>
        
      </View>

      <FlatList
        style={styles.productList}
        showsVerticalScrollIndicator={false}
        height={500}
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  productImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  productPrice: {
    fontSize: 16,
    
  },
  productDescription: {
    fontSize: 14,
    color: '#000',
    
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#0063EC',
    marginStart:20
  },
  productList: {
    height: 500,
  },
  profile: {
    width: 28,
    height: 28,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
