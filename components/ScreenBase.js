import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

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

const ScreenBase: () => React$Node = (props) => {

    return (
        <>
            <View style={styles.main}>
                <ImageBackground style={styles.backgroundImg} source={require("../resources/forest.jpg")}>
                    {props.children}
                </ImageBackground>
            </View>
        </>
    );
};

export default ScreenBase;