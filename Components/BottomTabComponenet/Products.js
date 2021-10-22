import React,{useState,useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text,Image,Button,View,ScrollView, TextInput,TouchableOpacity} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import * as SecureStore from 'expo-secure-store';

const Productscan = ({props,navigation}) => {
    const [product,setproduct] = useState([]);

   useEffect(() => {
    
        const unsubscribe =  navigation.addListener('focus', () => {
            Products();
        });
     
        return unsubscribe;
        
      }, []);

      const viewset = (docid) => {
        navigation.navigate('ScanBatch',{
          code: {docid},
          
        });
      }


      const Products = async() => {
    
        //setloading(true);
        const proset = []
        const dbh = firebase.firestore();
        let result = await SecureStore.getItemAsync("hdsggshhwiiwyehdbnndjjdjjd");
    
    
       await dbh.collection('Products')
      .where('ComID', '==', result)
      .get()
      .then(
          (v) =>{
          
          

            v.forEach(doc => {
            
             var pro = {
                "Product": doc.data().Name,
                "About": doc.data().ProductAbout,
                "image": doc.data().Url,
                "docid":doc.id,
                "price":doc.data().Price,
                "category":doc.data().categoryName
                 
              }
              
              proset.push(pro); 
          
            })
         
          
      });

        
      setproduct(proset);
   
      }

    return(
        <View style={styles.container}>
             <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={styles.scrollview}>
             {product.map(product => (
               <TouchableOpacity style={styles.card} key={product.docid} onPress={()=> viewset(product.docid)}>
                <View style={{flex:1}}>
                <Image source={{uri:product.image}}  style={{ width: 100, height: 100, borderTopLeftRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:5 }} resizeMode='stretch' /> 
                </View>
                <View style={{flex:2, paddingTop:10,paddingLeft:5}}>
                   <Text style={styles.cosmatic}>Product: <Text style={{fontSize: 10}}>{product.Product}</Text></Text>
                   <View style={{paddingTop:10}}>
                     <Text>Category: {product.category}</Text>
                     <Text>Price: Rs.{product.price}</Text>
                   </View>
                   
                </View>
               </TouchableOpacity>
             ))}
             </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#566573',
    
  },
  
  card:{
     backgroundColor:'white',
    flexDirection:'row',
    height:100,
    borderColor:'#AEB6BF',
    shadowColor:'black',
    shadowOffset:{width:0,height:6},
    shadowOpacity:0.67,
    shadowRadius:6,
    elevation:100,
    borderRadius:10,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
  },

  cosmatic:{
    fontSize: 15,
    fontWeight: "bold",
    color:'black',
    
},
});

export default Productscan