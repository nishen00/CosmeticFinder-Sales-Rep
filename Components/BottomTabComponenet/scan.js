import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button,TextInput, ScrollView,SafeAreaView,FlatList,Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { LogBox } from 'react-native';

const scan = ({props,route,navigation}) => {
const { code } = route.params;
const [companyid,setcompanyid] = useState("");
const [productid,setproductid] = useState("");
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
LogBox.ignoreLogs(['Setting a timer']);

useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      batch();
    })();
  }, []);

  React.useEffect(() => {
    
    const unsubscribe =  navigation.addListener('focus', () => {
        // batch();
    });
 
    return unsubscribe;
    
  }, [navigation]);

  const handleBarCodeScanned = async({ type, data }) => {
    

    const dbh = firebase.firestore();
    
     await dbh.collection('ProductsBatch')
      .where('CompanyId', '==', companyid)
      .where('productdocid', '==', productid)
      .where('barcode', '==', data)
      .get()
      .then(
          (v) =>{
          
          if(v.docs.length > 0)
          {
           

            v.forEach(doc => {
             
              if(doc.data().qty <= 0 || doc.data().Status != 2)
              {
                  if(doc.data().qty <= 0){
                    alert("This Product Qty not enuogh");
                  }

                  if(doc.data().Status != 2)
                  {
                      alert("This Product Batch has not Approved")
                  }
                  
              }
              else
              {
                var qtyset = doc.data().qty; 
                var productName = doc.data().productName;   
                var companyNameget = doc.data().CompanyName;
                var expdategetf = doc.data().expdate; 
                var mfddatef = doc.data().mfddate; 
                var docid = doc.id; 
                navigation.navigate("Details", {
                  code: { data },
                  productidget:{productid},
                  companyIDget:{companyid},
                  qty:{qtyset},
                  proname:{productName},
                  companyName:{companyNameget},
                  expdateget:{expdategetf},
                  mfddateget:{mfddatef},
                  documentid:{docid}
                });
              }
          })
          }
          else
          {
            
            alert("This is not a existing product for your company");
            
          }
         
          
      });

      setScanned(true);

    // navigation.navigate('Details' ,{
    //     code: {data},
        
    //   });
  };

  const batch = async() => {
    let result = await SecureStore.getItemAsync("hdsggshhwiiwyehdbnndjjdjjd");
    setcompanyid(result);
    const proid = JSON.stringify(code.docid);
   const correct = proid.slice(1, -1);
    setproductid(correct);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return(
    <View style={{flex:1}}>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
    {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
  </View>
    
  )

}

export default scan