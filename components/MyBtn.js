import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 3,
        backgroundColor: "rgb(82,82,82)",
        margin: 1,
        width: "100%",
        height: 25 
    },
    label: {
        color: "white", 
        fontFamily: "GUNPLAY_",
        textAlign: "center"
    }
});

const MyBtn = ({ label, handler }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={handler}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
};

export default MyBtn;