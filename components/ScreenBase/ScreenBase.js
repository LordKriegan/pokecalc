import React from 'react';
import { View,  ImageBackground } from 'react-native';
import styles from './styles';
const ScreenBase = (props) => {

    return (
        <>
            <View style={styles.main}>
                <ImageBackground style={styles.backgroundImg} source={require("../../resources/forest.jpg")}>
                    {props.children}
                </ImageBackground>
            </View>
        </>
    );
};

export default ScreenBase;