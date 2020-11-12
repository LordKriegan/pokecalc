import React, { useState } from 'react';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "15%"
    },
    activePokemonCard: {
        height: "80%",
        width: "100%",
    },
    benchedPokemonCard: {
        height: "60%",
        width: "80%"
    },
    cardText: {
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
    }
});

const Card = (props) => {
    const [isError, setError] = useState(false);
    return (

        <GestureRecognizer
            style={styles.container}
            onSwipeLeft={(state) => {
                props.setHp(props.card.dmg + 10, props.type, props.index);
            }}
            onSwipeRight={(state) => {
                props.setHp(props.card.dmg - 10, props.type, props.index);
            }}
            onSwipeUp={(state) => {
                if (props.type === "bench" && props.promote) props.promote(props.index);
            }}
            onSwipeDown={(state) => {
                if (props.type === "active" && props.retreat) props.retreat(props.index);
            }}
        >
            {(isError) ? <Text numberOfLines={1} style={{ ...styles.cardText, top: "5%", zIndex: 1000, fontSize: (props.type === "active" ? 15 : 10), width: "80%" }}>{props.card.name}</Text> : null}
            <Pressable style={(props.type === "active") ? styles.activePokemonCard : styles.benchedPokemonCard} onLongPress={() => props.onLongPress(props.type, props.index)}>
                <Image style={{ resizeMode: "stretch", height: "100%", width: "100%" }} source={(isError) ? require("../resources/cardback.png") : { uri: props.card.uri }} onError={({ nativeEvent: { error } }) => setError(true)} />
            </Pressable>

            <Text style={{ ...styles.cardText, bottom: "10%", fontSize: (props.type === "active" ? 50 : 25) }}>{props.card.hp - props.card.dmg}</Text>
        </GestureRecognizer>

    );
};

export default Card;