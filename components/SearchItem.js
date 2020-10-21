import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const styles = StyleSheet.create({

    cardListItem: {
        resizeMode: "stretch",
        height: 250,
        width: 150,
        marginLeft: 5,
        marginRight: 5,

    },
    container: {
        position: "relative",
        alignItems: "center",
        flexDirection: "column"
    },
    cardName: {
        width: "80%",
        position: "absolute",
        top: "5%",
        zIndex: 1000,
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
    },
    cardHp: {
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
        bottom: "10%",
        fontSize: 50
    }
});

const SearchItem: () => React$Node = (props) => {
    const [isError, setError] = useState(false);
    return (
        <View style={styles.container}>
            {(isError) ? <Text style={styles.cardName} numberOfLines={1}>{props.card.name}</Text> : null }
            {
                (isError) ?

                    <Image style={styles.cardListItem} source={require('../resources/cardback.png')} /> :
                    <Image style={styles.cardListItem} source={{ uri: props.card.uri }} onError={({ nativeEvent: { error } }) => setError(true)} />
            }
            {(isError) ? <Text style={styles.cardHp}>{props.card.hp}</Text> : null }
        </View>
    )
};

export default SearchItem;