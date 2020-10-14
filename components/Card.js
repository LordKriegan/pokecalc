import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        position:"relative",
        width: "15%"
    },
    activePokemonCard: {
        resizeMode: "contain",
        height: "80%",
        width: "100%"
    },
    benchedPokemonCard: {
        resizeMode: "contain",
        height: "60%",
        width: "100%"
    },
    hpText: {
        position: "absolute",
        bottom: "10%",
        fontFamily: "GUNPLA3D",
        color: "red",
    }
});

const Card: () => React$Node = (props) => {
    
    return (
        <View style={styles.container}>
            <Image style={(props.type === "active") ? styles.activePokemonCard : styles.benchedPokemonCard} source={{ uri: props.card.uri }} />
            <Text style={{...styles.hpText, fontSize: (props.type==="active" ? 50 : 25)}}>{props.card.hp}</Text>
        </View>
    );
};

export default Card;