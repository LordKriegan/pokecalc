import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
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
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
        bottom: "10%",
    }
});

const Card: () => React$Node = (props) => {

    return (

        <GestureRecognizer
            style={styles.container}
            onSwipeLeft={(state) => {
                props.setHp(props.card.hp - 10, props.type, props.index);
            }}
            onSwipeRight={(state) => {
                props.setHp(props.card.hp + 10, props.type, props.index);
            }}
            onSwipeUp={(state) => {
                if (props.type === "bench" && props.promote) props.promote(props.index);
            }}
            onSwipeDown={(state) => {
                if (props.type === "active" && props.retreat) props.retreat(props.index);
            }}
        >
            <Image style={(props.type === "active") ? styles.activePokemonCard : styles.benchedPokemonCard} source={{ uri: props.card.uri }} />
            <Text style={{ ...styles.hpText, fontSize: (props.type === "active" ? 50 : 25) }}>{props.card.hp}</Text>
        </GestureRecognizer>

    );
};

export default Card;