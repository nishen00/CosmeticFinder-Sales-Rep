import 'react-native-gesture-handler';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, View,Image,TextInput,Button,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Product from './BottomTabComponenet/Products';
import Scan from './BottomTabComponenet/scan';
import Details from './BottomTabComponenet/Details';
// import Scan from './BottomTabComponents/ProductScan';
// import Account from './BottomTabComponents/Accounts';
// import Questions from './BottomTabComponents/questions';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



  function productscan() {
    return (
      <Stack.Navigator
        initialRouteName="productscan"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2980B9",
          
        }}
      >
        <Stack.Screen
          name="productscan"
          component={Product}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScanBatch"
          component={Scan}
          options={{ title: "Batch Scan" ,header: () => null }}
        />

       <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Batch Details",header: () => null  }}
        />
      </Stack.Navigator>
    );
  }

  

  

  

const Navigate = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Products"
                TabBarOptions={{
                    activeTintColor: '#2980B9',
                    style: {
                        width: '100%',
                        backgroundColor: '#F8F9F9',
                    }
                }}>
                <Tab.Screen
                    name="Products"
                    component={productscan}
                    options={{
                      tabStyle: [{backgroundColor: 'red'}],
                        tabBarLabel: 'Products',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                     
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigate