import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const user = await AsyncStorage.getItem('user');
        setUser(JSON.parse(user));
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  },[]);
const handleLogout = ()=>{
  console.log("click log out");
  logout(navigation);
 setUser(null);
   //navigation.navigate('Login');
}

const logout = (navigation) => {
  // Xóa dữ liệu người dùng khỏi bộ nhớ cục bộ
  AsyncStorage.clear().then(() => {
    // Chuyển sang màn hình chính
    navigation.navigate('Login');
  });
};
  return (
    <View style={styles.container}>
     <View style={{flexDirection: 'row', alignItems:"center", justifyContent:'center'}}>
     <Text style={styles.title}>Profile</Text>
     </View>
      <View style={{flex:1, padding: 30}}>
      <Text style={styles.info}>Name : {user&&user.name}</Text>
      <Text style={styles.info}>Email : {user&&user.email}</Text>
      <Text style={styles.info}>Address : {user&&user.address}</Text>
      </View>
      

      {/* <Text style={styles.role}>{user && user.role == 2? 'Admin':'User'}</Text> */}
      <TouchableOpacity onPress={handleLogout}  style={styles.btnLogout}>
        <Text  style={styles.textLogout}>LogOut</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
   
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Màu cho quyền Admin, có thể thay đổi
  },
  btnLogout: {
    width: 362,
    height: 48,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogout: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#fff',
    textAlign: 'center',
    width: 160,
  },
});