import React, { useState } from 'react';
import { View,  Image, Text } from 'react-native';
import styles from './styles';


const SearchItem = (props) => {
    const [isError, setError] = useState(false);
    return (
        <View style={styles.container}>
            {(isError) ? <Text style={styles.cardName} numberOfLines={1}>{props.card.name}</Text> : null }
            {
                (isError) ?

                    <Image style={styles.cardListItem} source={require('../../../../resources/cardback.png')} /> :
                    <Image style={styles.cardListItem} source={{ uri: props.card.uri }} onError={({ nativeEvent: { error } }) => setError(true)} />
            }
            {(isError) ? <Text style={styles.cardHp}>{props.card.hp}</Text> : null }
        </View>
    )
};

export default SearchItem;