import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { DoubleTap } from '../../../../components';
import { Storage } from '../../../../lib';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import styles from './styles';

const Card = (props) => {
    const [isError, setError] = useState(false);
    const [isFav, setFav] = useState(false);
    
    useEffect(() => {
        Storage.getItem("Favorites", props.card.uri).then((data) => {
            if (data) {
                setFav(true);
            }
        })
    })

    const handleFav = () => {
        Storage.getItem("Favorites", props.card.uri).then( (data) => {
            if (data) {
                Storage.getAll("Favorites").then((data) => {
                    delete data[props.card.uri]
                    Storage.setItem("Favorites", data)
                    setFav(false);
                }) 
            } else {
                Storage.getAll("Favorites").then( (data) => {
                    const card = JSON.parse(JSON.stringify(props.card));
                    delete card.asleep;
                    delete card.burned;
                    delete card.confused;
                    delete card.poisoned;
                    delete card.paralyzed;
                    card.dmg = 0;
                    data[card.uri] = card;
                    Storage.setItem("Favorites", data);
                    setFav(true);
                })
            }
            
        })
    }
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
            <TouchableOpacity style={(props.type === "active") ? styles.starIconActive : styles.starIconBench} onPress={handleFav} >
                <Image style={styles.star} source={ (isFav) ? require('../../../../resources/Golden_star.png') : require('../../../../resources/blank_star.png')} />
            </TouchableOpacity>
            
        </GestureRecognizer>

    );
};

export default Card;