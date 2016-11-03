/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


var ContentView = require('./MLContentView');

export default class MLSlideDeletedCell extends Component {
  render() {
    return (
      <View style={styles.container}>
	      <ContentView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	  marginTop: 20
  },
});

AppRegistry.registerComponent('MLSlideDeletedCell', () => MLSlideDeletedCell);
