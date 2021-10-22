
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Navigate from './Components/Navigation';
import firebase from 'firebase/app';
import firebaseConfig from './Database/Config';
import * as SecureStore from 'expo-secure-store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  
  const [auth,setauth] = useState(false);
  const [companyNO,setcompanyid] = useState("");

  const setauthfun = async(companyid) => {
    setauth(true);
    await SecureStore.setItemAsync("hdsggshhwiiwyehdbnndjjdjjd", companyid);

    
    
    setcompanyid(companyid);
    
    
  }

  let viewset = <Navigate />

  if (auth === false)
  {
    viewset = <Login authcheck = {setauthfun}/>
  }

  return (
    <View style={styles.container}>
    {viewset}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
