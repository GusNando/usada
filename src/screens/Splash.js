import React, { Component } from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import FastImage from 'react-native-fast-image'
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction);
    }, 3000);
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        
        <FastImage
            style={{ width: 200, height: 200, marginBottom: 20 }}
            source={require('../../src/images/sibuda.png')}
            resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{color: '#FFFFFF', fontSize: 20}}>Sistem Informasi Usada Bali</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00bcd4",
    alignItems: "center",
    justifyContent: 'center'
  },
  box1: {
    //marginBottom: 60
  },
  box2: {
    //borderWidth: 1,
    //alignItems: "center",
    //justifyContent: "center",
    //marginBottom: 70
  },
  textCash: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold"
  },
  box3: {
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 10
  }
});
export default Splash;
