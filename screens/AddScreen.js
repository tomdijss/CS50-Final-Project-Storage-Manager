import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback  } from 'react-native';

import CustomButton from '../components/CustomButton';

import { DatabaseConnection } from '../components/database/DatabaseConnection';
const db = DatabaseConnection.getConnection();


export default function AddScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityLow, setQuantityLow] = useState('');
  
  // Function for inserting data into the database.
  const insertData = () => {
    // Checks if input fields aren't empty.
    if (name.length == 0 || quantity.length == 0 || quantityLow.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    // If not empty inserts name, quantity and quantityLow values into storage table.
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO storage (name, quantity, quantityLow) VALUES (?,?,?)",
          [name, quantity, quantityLow],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert('Success', 'Your Items are inserted!',
                [
                  {
                    text: 'Ok',
                    onPress: () => {navigation.navigate('HomeScreen')},
                  }
                ],
                { cancelable: false }
              );
            } else {
             Alert.alert('Warning!', 'something went wrong no items are inserted.');
            }  
          }
        );
      });
    };
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={Styles.view}>
        <Text>Item Name:</Text>
        <TextInput
          style={Styles.input}
          placeholder='Enter your name'
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text>Item Quantity:</Text>
        <TextInput
          style={Styles.input}
          placeholder='Enter item quantity'
          onChangeText={(value) => setQuantity(value)}
          keyboardType="numeric"
          value={quantity}
        />      
        <Text>New Order Quantity:</Text>
        <TextInput
          style={Styles.input}
          placeholder='Enter order quantity'
          onChangeText={(value) => setQuantityLow(value)}
          keyboardType="numeric"
          value={quantityLow}
        />    
         <CustomButton
          style={Styles.addbutton}
          title="Add Item"
          onPressFunction={insertData}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  input: {
    height: 40,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  addbutton: {
    backgroundColor: '#333333',
  },
  buttonText: {
    color: '#C2C2C2',
    fontSize: 16,
    fontWeight: "500",
  },
});