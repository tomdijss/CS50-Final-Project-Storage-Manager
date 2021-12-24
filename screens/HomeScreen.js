import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomIconButton from '../components/CustomIconButton';

import { DatabaseConnection } from '../components/database/DatabaseConnection';
const db = DatabaseConnection.getConnection();


export default function HomeScreen({ navigation }) {
  // Create a table in the database if the table storage does not exist.
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='storage'",
        [],
        (tx, res) => {
          if (res.rows.length == 0) {
            console.log('New database is created');
            tx.executeSql('DROP TABLE IF EXISTS storage', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS storage (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INT, quantityLow INT)',
              []
            );
          }
        }
      );
    });
  }, []);
  
  // Load all data from storage table and save it in setData.
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM storage',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          setData(temp);
          setFilteredData(temp);
        }
      );
    });
  }

  // Refresh all the data after navigating back.
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      // Data loading function. 
      loadAllData();
    });
    return refresh;
  }, [navigation]);
    
  // Fuction for displaying cards only when quantity is lower or equal to quantityLow.
  const [isPressed, setIsPressed] = useState(false);

  const sortFilterFunction = () => { 
    if (isPressed === false ){
      db.transaction((tx) => {
        tx.executeSql(
        'SELECT * FROM storage WHERE quantity < quantityLow',
        [], 
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));            
            setIsPressed(true);
            setFilteredData(temp);
          }
        );
      });
    } else if (isPressed === true) {
      setIsPressed(false);
      loadAllData();
    };
  };

  // Search function for all the data in the flat list.
  const [search, setSearch] = useState('');

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank.
    if (text) {
      // Inserted text is not blank, Filter the data and update filteredData.
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar.
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1; 
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank, Update filteredData with data.
      setFilteredData(data);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('UpdateScreen', { item })}>
        <View key={item.id} style={Styles.card}>
          <Text style={Styles.itemName}> {item.name} </Text>
          <Text style={Styles.quantity}> {item.quantity} </Text>
          <Icon style={Styles.arrow} name="angle-right"/>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={Styles.globalHome}>
      <View style={Styles.header}>
        <TextInput  
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          style={Styles.searchInput}
          placeholder="Type a hier to search"           
        />
        <CustomIconButton
          style={Styles.filterButton}
          name="filter"
          color='#C2C2C2'
          size={30}
          onPressFunction={sortFilterFunction}
        />
      </View>         
      <View style={{ flex: 1 }}> 
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  globalHome: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    
    maxWidth: "80%",
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 20, 
    maxHeight: 15,
  },
  searchInput: {
    height: 50,
    minWidth: "65%",
    padding: 10,
    marginRight: 20,
    borderColor: '#333333',
    borderWidth: 1
  },
  filterButton: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#333333',
  },

  card: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#EEE', 
    borderRadius: 10,
    minWidth: '90%',
    height: 100,
    marginTop: 20, 
    padding: 30,
  },
  itemName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  quantityLabel: {
    paddingRight: 5,
    fontSize: 14,
    fontWeight: '300',
  },
  quantity: {
    paddingRight: 15,
    fontSize: 20,
    fontWeight: '400',
  },
  arrow: {
    
    fontSize: 40,
    color: '#333333',
  },
});