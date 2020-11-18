import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { DoubleTap } from '../../../../components';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import styles from './styles';

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
            <DoubleTap customStyle={(props.type === "active") ? styles.activePokemonCard : styles.benchedPokemonCard} handler={() => props.handler(props.type, props.index)}>
                <Image style={{ resizeMode: "stretch", height: "100%", width: "100%" }} source={(isError) ? require("../../../../resources/cardback.png") : { uri: props.card.uri }} onError={({ nativeEvent: { error } }) => setError(true)} />
            </DoubleTap>

            <Text style={{ ...styles.cardText, bottom: "10%", fontSize: (props.type === "active" ? 50 : 25) }}>{props.card.hp - props.card.dmg}</Text>
            {
                (props.type === "active")
                    ? <View style={styles.statusBox}>
                        {(props.card.asleep) ? <Image style={styles.status} source={require("../../../../resources/statuses/asleep.png")} /> : null}
                        {(props.card.confused) ? <Image style={styles.status} source={require("../../../../resources/statuses/confused.png")} /> : null}
                        {(props.card.paralyzed) ? <Image style={styles.status} source={require("../../../../resources/statuses/paralyzed.png")} /> : null}
                        {(props.card.burned) ? <Image style={styles.status} source={require("../../../../resources/statuses/burned.png")} /> : null}
                        {(props.card.poisoned) ? <Image style={styles.status} source={require("../../../../resources/statuses/poisoned.png")} /> : null}
                    </View>
                    : null
            }
        </GestureRecognizer>

    );
};

export default Card;