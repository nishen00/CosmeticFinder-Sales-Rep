import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button,TextInput, ScrollView,SafeAreaView,FlatList,Image } from 'react-native';
import * as Location from 'expo-location';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const Details = ({props,route,navigation}) => {
const { code, productidget,companyIDget,qty,proname,companyName,expdateget,mfddateget,documentid} = route.params;

const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [longitude,setlongitude] = useState(2552771);
    const [latitude,setlatitude] = useState(2121212);
    const [barcode,setbarcode] = useState("");
    const [productid,setproductid] = useState("");
    const [companyid,setcompanyID] = useState("");
    const [qtynew,setqty] = useState("");
    const [productName,setproductname] = useState("");
    const [companyname,setcompanyname] = useState("");
    const [exp,setexp] = useState("");
    const [mfd,setmfd] = useState("");
    const [sellqty,setsellqty] = useState("");
    const [shopname,setshopname] = useState("");
    const [docidget,setdocid] = useState("");
    useEffect(() => {
       
        (async () => {
            
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getLastKnownPositionAsync({
            accuracy: 6,
          });
          setlongitude(location.coords.longitude);
          setlatitude(location.coords.latitude);

          const barcodefind = JSON.stringify(code.data);
          const correctbarcode = barcodefind.slice(1, -1);
          setbarcode(correctbarcode);
          const productidfind = JSON.stringify(productidget.productid);
          const correctproductidfind = productidfind.slice(1, -1);
          setproductid(correctproductidfind);

          const qtyfind = JSON.stringify(qty.qtyset);
          setqty(qtyfind);

          const productnamefind = JSON.stringify(proname.productName);
          const correctproductnamefind = productnamefind.slice(1, -1);
          setproductname(correctproductnamefind);

          const companynamefind = JSON.stringify(companyName.companyNameget);
          const correctcompanynamefind = companynamefind.slice(1, -1);
          setcompanyname(correctcompanynamefind);

          const expfind = JSON.stringify(expdateget.expdategetf);
          const correctexpfind = expfind.slice(1, -1);
          setexp(correctexpfind);

          const mfdfind = JSON.stringify(mfddateget.mfddatef);
          const correctmfdfind = mfdfind.slice(1, -1);
          setmfd(correctmfdfind);

          const docidfind = JSON.stringify(documentid.docid);
          const correctdocidfind = docidfind.slice(1, -1);
          setdocid(correctdocidfind);
          
          
        })();

       
      }, []);

      const setsellqtyf = (qtysell) => {
        setsellqty(qtysell);
      };
    
      const setshopnamef = (shopname) => {
        setshopname(shopname);
      };

      const savebatch =()=>{
        var totalcount = parseInt(qtynew);
        var lastcount = parseInt(sellqty);

        if(totalcount<lastcount)
        {
            showMessage({
                message: "Error",
                description: "Sell qty must less than avalible qty",
                type: "danger",
              });
        }
        else
        {
            if(shopname=="")
            {
                showMessage({
                    message: "Error",
                    description: "Please enter shop Name",
                    type: "danger",
                  });
            }
            else
            {
                const dbh = firebase.firestore();

                dbh.collection("BatchPut").doc().set({
                  qty: lastcount,
                  latitude: latitude,
                  longitude: longitude,
                  companyname:companyname,
                  productName:productName,
                  shopname:shopname,
                  exp:exp,
                  mfd:mfd,
                  productid:productid
                });

                showMessage({
                    message: "Updated",
                    description: "Data has been saved succesfully",
                    type: "success",
                  });


                  const docRef = dbh.collection("ProductsBatch").doc(docidget);
                  docRef
                    .update({
                      qty:totalcount-lastcount,
                      
                    })
                    .then(() => {
                        showMessage({
                            message: "Updated",
                            description: "Data has been saved succesfully",
                            type: "success",
                          });
                    })
                    .catch((error) => {
                      console.log("Error updating the document:", error);
                    });
            }
        }
         
         setsellqty("");
         setshopname("");
      }

  return (
    <SafeAreaView>
      <View style={styles.loginCard}>
        <View
          style={{ backgroundColor: "#2980B9", padding: 10,marginLeft:20,
          marginRight:20 }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {productName}
          </Text>
        </View>

        <View style={styles.LoginContent}>
        <FlashMessage position="Top" />
          {/* <Image source={logo} style={{ width: 180, height: 180 }} />  */}
          <Text >Avalible QTY</Text>
          <TextInput editable={false} value={qtynew} style={styles.textbox} selectTextOnFocus={false}/>
          <Text>Exp-Date</Text>
          <TextInput editable={false} value={exp} style={styles.textbox2} />
          <Text>MFD-Date</Text>
          <TextInput editable={false} value={mfd} style={styles.textbox2} />
          <Text>Shop Name</Text>
          <TextInput  placeholder="Enter Shop Name" style={styles.textbox2} value= {shopname} onChangeText={setshopnamef}/>
          <Text>Sell QTY</Text>
          <TextInput  placeholder="Enter Sell Qty" keyboardType='numeric' style={styles.textbox2} value={sellqty} onChangeText={setsellqtyf}/>
          <View style={{ width: "60%", marginBottom: 50 }}>
            <Button title="Save" color="#2C3E50" onPress={savebatch}/>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    loginCard:{
        width:'100%',
        backgroundColor:'white',
        height:'100%',
        
        justifyContent:'center' 
    },

    LoginContent:{
        
       backgroundColor:'#F8F9F9',
        padding:20,
        marginLeft:20,
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.69,
        elevation:40,
        borderRadius:10
        

    },

    textbox:{
        marginVertical:5,
        width:'90%',
        borderColor:'black',
        borderWidth:1,
        height:40,
        padding:10,
        borderRadius:5,

    },

    textbox2:{
        marginBottom:7,
        width:'90%',
        borderColor:'black',
        borderWidth:1,
        height:40,
        padding:10,
        borderRadius:5,

    }
})

export default Details