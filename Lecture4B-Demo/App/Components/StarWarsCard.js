import React from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator, TextInput, AsyncStorage } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';

/*
  Displays a Jedi ID Card
*/
export default class StarWarsCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      gender: "",
      year: "",
      height: "",
      weight: ""
    }
    //See what props our StarWarsCard renders with
    console.log(JSON.stringify(props));
  }

  saveData = async () => {
    try {
      const data = [['name', this.state.name], ['gender', this.state.gender],
                    ['year', this.state.year], ['height', this.state.height],
                    ['weight', this.state.weight]];
      await AsyncStorage.multiSet(data);

      //Equivalent to this

      // await AsyncStorage.setItem('name', this.state.name);
      // await AsyncStorage.setItem('gender', this.state.gender);
      // await AsyncStorage.setItem('year', this.state.year);
      // await AsyncStorage.setItem('height', this.state.height);
      // await AsyncStorage.setItem('weight', this.state.weight);

    } catch (error) {

    }
  }

  getData = async () => {
    try {
      const list = ['name', 'gender', 'year', 'weight', 'height'];

      const result = await AsyncStorage.multiGet(list);
      this.setState({name: result[0][1], gender: result[1][1],
                     year: result[2][1], weight: result[3][1], height: result[4][1]})
    } catch (error) {

    }
  }

  render() {

    //Save async
    if(this.props.readOnly && !this.props.dataFound) {
      console.log("saving");
      this.saveData();
    } else if (this.props.readOnly && this.props.dataFound) {
      this.getData();
    }

    return (
      <View style={styles.card}>

        <View style={styles.pictureView}>
          <Image style={styles.picture}
           source={Images.jedi1}/>

          <View style={styles.pictureDetails}>
            {!this.props.readOnly && (
              <View>
                <TextInput
                  value={this.state.name}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({name: text})}
                  placeholder="Name"
                />
                <TextInput
                  value={this.state.gender}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({gender: text})}
                  placeholder="Gender"
                />
              </View>
            )}
            {this.props.readOnly && (
              <View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.gender}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.jediRowItem}>
          <Text style={ { fontWeight: 'bold' } }>Birth Year</Text>
          <Text style={ { fontWeight: 'bold' } }>Height</Text>
          <Text style={ { fontWeight: 'bold' } }>Weight</Text>
        </View>
        {!this.props.readOnly && (
          <View style={[styles.jediRowItem, { marginTop: 0 }]}>
            <TextInput
              value={this.state.year}
              style={styles.textInput}
              onChangeText={(text) => this.setState({year: text})}
              keyboardType="numeric"
              placeholder="Year"
            />
            <TextInput
              value={this.state.height}
              style={styles.textInput}
              onChangeText={(text) => this.setState({height: text})}
              placeholder="Height"
              keyboardType="numeric"
            />
            <TextInput
              value={this.state.weight}
              style={styles.textInput}
              onChangeText={(text) => this.setState({weight: text})}
              placeholder="Weight"
              keyboardType="numeric"
            />
          </View>
        )}
        {this.props.readOnly && (
          <View style={[styles.jediRowItem, { marginTop: 0 }]}>
            <Text>{this.state.year}</Text>
            <Text>{this.state.height}</Text>
            <Text>{this.state.weight}</Text>
          </View>
        )}

        {// <View style={styles.jediRowItem}>
        //   <Text style={ { fontWeight: 'bold' } }>Hair Color</Text>
        //   <Text style={ { fontWeight: 'bold' } }>Eye Color</Text>
        //   <Text style={ { fontWeight: 'bold' } }>Skin Color</Text>
        // </View>
        // <View style={[styles.jediRowItem, { marginTop: 0 }]}>
        //   <TextInput style={styles.textInput}/>
        //   <TextInput style={styles.textInput}/>
        //   <TextInput style={styles.textInput}/>
        // </View>
      }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    padding: Metrics.doubleBaseMargin,
    width: Metrics.screenWidth * .9,
    borderWidth: Metrics.borderWidth,
    borderRadius: Metrics.buttonRadius
  },
  pictureView: {
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  picture: {
    height: Metrics.images.large,
    width: Metrics.images.large,
    borderRadius: Metrics.images.large * 0.5
  },
  pictureDetails: {
    flexDirection: 'column',
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  jediRowItem: {
    marginTop: Metrics.marginVertical,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textInput: {
    borderBottomWidth: 1,
    width: 50
  }
});
