import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, TextInput, Alert, View, SafeAreaView } from "react-native";
import AlertAsync from "react-native-alert-async";

import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import CustomIconButton from '../components/CustomIconButton';

import { DatabaseConnection } from '../components/database/DatabaseConnection';
const db = DatabaseConnection.getConnection();


export default function UpdateScreen({ route, navigation}) {  
  const { item } = route.params;
  const [newQuantity, setNewQuantity] = useState(item.quantity); 
  

  // Deletes an item after the delate button is pressed.
  const deleteItem = async (id) => {
    // Ask the user for confirmation before delating.
    const confirm = await AlertAsync(
      'Are you sure!','Item will be deleted and can not be undone.',
      [
        {text: 'Yes', onPress: () => 'yes'},
        {text: 'No', onPress: () => Promise.resolve('no')},
      ],
      {
        cancelable: true,
        onDismiss: () => 'no',
      },
    );
    // If user pressed yes delete item where id is item id.
    if (confirm === 'yes') {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM storage WHERE id = ?', [id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Success','Item is successfully deleted.',
                [
                  {
                    text: 'Ok',
                    onPress: () => {navigation.navigate('HomeScreen')},
                  },
                ],
                { cancelable: false }
              );
            }
          }
        );
      });
    // If user pressed no disply cancel massege.
    } else if (confirm === 'no') {
      Alert.alert('Canceled!', 'Item is not deleted.')
    } else {
      Alert.alert('Warning!', 'something went wrong your item is not deleted.');
    }
  }
  
  // Updates Quantity after button is pressed.
  const updateItem = (id) => {
    console.log(newQuantity);
    // Make sure user changed the quantity.
    if (newQuantity.length == 0) {
      Alert.alert('Warning!', 'Please write your data.')
    // Update quantity to new quantity where id is item id.
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE storage SET quantity = ? WHERE id = ?;', [newQuantity, id],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Success', 'Your Item is updated!',
                [
                  {
                    text: 'Ok',
                    onPress: () => {navigation.navigate('HomeScreen')},
                  }
                ],
                { cancelable: false }
              );
            } else {
              Alert.alert('Warning!', 'something went wrong your item is not updated.');
            }
          }
        );
      });
    };
  };
      
  // Increment and decrement buttons.
  const timer = useRef(null);
  
  const stopTimer = () => {
    clearTimeout(timer.current);
  }

  // Increments quantity when + button is pressed and when onhold increment faster.
  const increment = () => {
    setNewQuantity((prevQuantity) => prevQuantity + 1);
    timer.current = setTimeout(increment, 75);
  };
  
  // Decrement quantity when - button is pressed and when onhold decrement faster.
  const decrement = () => {
    setNewQuantity((prevQuantity) => prevQuantity - 1);
    timer.current = setTimeout(decrement, 75);
  };
  
  return (
    <SafeAreaView style={Styles.view}>
      <CustomIconButton
        style={Styles.delateIconButton}
        name="trash"
        color='#333333'
        size={35}
        onPressFunction={() => deleteItem(item.id)}
      />
      <Text style={Styles.itemName}>{item.name}</Text>
      <View style={Styles.counterContainer}>
        <TextInput 
          style={Styles.numberInput}
          editable={false}
          onChange={(newQuantity) => setNewQuantity(newQuantity)}
          value={newQuantity.toString()}
        />
        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.incrementButton} onPressIn={increment} onPressOut={stopTimer}>
            <Icon name="plus" style={Styles.iconButton}/>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.decrementButton} onPressIn={decrement} onPressOut={stopTimer}>
            <Icon name="minus" style={Styles.iconButton}/>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        style={Styles.updateButton}
        title="done"
        onPressFunction={() => updateItem(item.id)}
      />
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  delateIconButton:{
    position: "absolute",
    top: -90,
    right: 15,
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: 'transparent',
  },
  itemName: {
    fontSize: 35,
    fontWeight: '600',
  },
  counterContainer: {
    marginTop: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  updateButton: {
    backgroundColor: '#333333',
  },
  numberInput: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',

    height: 50,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  incrementButton: {    
    backgroundColor: '#4CAF50',
    height: 60,
    width: 60,
    margin: 15,
  },
  decrementButton: {
    backgroundColor: '#F44336',
    height: 60,
    width: 60,
    margin: 15,
  },
  iconButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
  },
});      