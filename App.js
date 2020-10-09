/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View
} from 'react-native';


const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column"
  },
  backgroundImg: {
    height: "100%",
    width: "100%",
  }
});

const App: () => React$Node = () => {
  return (
    <>
      <View style={styles.main}>
        <ImageBackground style={styles.backgroundImg} source={require("./resources/forest.jpg")}>

        </ImageBackground>
      </View>
    </>
  );
};


export default App;
