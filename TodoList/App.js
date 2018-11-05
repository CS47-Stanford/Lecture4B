import React from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, FlatList, View, Button, TouchableOpacity, AsyncStorage } from 'react-native';

import { Constants, SQLite } from 'expo';

const db = SQLite.openDatabase('todo.db');

export default class App extends React.Component {
  state = {
    textValue: '',
    items: []
  }

  deleteRow = async (item) => {
    var newItems = this.state.items.slice();
    newItems.splice(newItems.indexOf(item), 1);
    try {
      await this.setState({textValue: "", items: newItems});
      await AsyncStorage.setItem('list', JSON.stringify(this.state.items));
    } catch (error) {

    }
  }

  insert = async () => {
    var newItems = this.state.items.slice();
    newItems.push(this.state.textValue);

    try {
      await this.setState({textValue: "", items: newItems});
      await AsyncStorage.setItem('list', JSON.stringify(this.state.items));
    } catch (error) {

    }
  }

  async componentDidMount () {
    console.log("mounted");
    try {
      const list = await AsyncStorage.getItem('list');
      if (list !== null && list !== undefined) {
        this.setState({items: JSON.parse(list)});
      }
      console.log(list);
    } catch (error) {

    }
  }

  listItemRenderer = (item) => {
      return (
        <TouchableOpacity onPress={() => this.deleteRow(item)}>
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        </TouchableOpacity>
      );
    }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.textValue}
          onChangeText={(text) => this.setState({textValue: text})}
        />
        <FlatList
          data={this.state.items}
          style={styles.list}
          renderItem={({item}) => this.listItemRenderer(item)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent = {() => (<View style={{height: 10}}/>)}
        />
        <Button
          title={"Add Item"}
          onPress={this.insert}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 2,
    fontSize: 18,
    justifyContent: 'center'
  },
  list: {
    width: '100%',
    flex: 1
  },
  listItem: {
    backgroundColor: "#4286f4",
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  }
});
