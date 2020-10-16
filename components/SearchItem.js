import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({

    cardListItem: {
        resizeMode: "stretch",
        height: 250,
        width: 150,
        marginLeft: 5,
        marginRight: 5
    }
});

const SearchItem: () => React$Node = (props) => {
    const [isError, setError] = useState(false);
    return (
        <View>
            {
                (isError) ?
                    <Image style={props.styleImg} source={require('../resources/cardback.png')} /> :
                    <Image style={props.styleImg} source={{ uri: props.card.uri }} onError={({ nativeEvent: { error } }) => setError(true)} />
            }
        </View>
    )
};

export default SearchItem;