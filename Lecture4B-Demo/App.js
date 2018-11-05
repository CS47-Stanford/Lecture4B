import React from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { Images, Colors, Metrics } from './App/Themes';
import StarWarsCard from './App/Components/StarWarsCard'

/*
  Displays information about Jedi
*/
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  //this is our default state
  state = {
    readOnly: false,
    dataFound: false
  }

  async componentDidMount() {
    try {
      const name = await AsyncStorage.getItem('name');
      if (name !== null && name !== undefined) {
        this.setState({readOnly: true, dataFound: true});
      }
      console.log(name);
    } catch (error) {

    }
  }

  saveData = () => {
    this.setState({readOnly: true, dataFound: false});
  }

  resetData = async () => {
    await AsyncStorage.clear();
    this.setState({readOnly: false, dataFound: false});
  }

  render() {

    return (
      <View style={styles.container}>
         <StarWarsCard readOnly={this.state.readOnly} dataFound={this.state.dataFound}/>
         <Button title="Save Values!" onPress={this.saveData}/>
         <Button title="Reset" onPress={this.resetData} color='red'/>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
