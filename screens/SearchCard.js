/**
 * https://api.pokemontcg.io/v1/cards?
 * name={name}
 * &evolvesFrom={name}
 * &hp={number}
 * 
 * putting name in double quotes results in exact match, otherwise partial match
 * 
 * also should consider https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, TextInput } from 'react-native';
import { ScreenBase, SearchItem } from '../components';
import axios from 'axios';



const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "80%",
        flexDirection: "column",
        borderRadius: 10,
        marginTop: "5%",
        marginBottom: "5%",
        alignSelf: "center",
        alignItems: "center"
    },
    searchBtn: {
        borderRadius: 10,
        backgroundColor: "gray",
        padding: 5,
        justifyContent: "center",
        margin: 5
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center"
    },
    nameInput: {
        width: "60%",
        margin: 5
    },
    hpInput: {
        width: "20%",
        margin: 5
    },
    inputBox: {
        flexDirection: "row"
    },
    cardList: {
        width: "100%", 
    },
    cardListItem: {
        resizeMode: "stretch",
        height: 250,
        width: 150,
        marginLeft: 5,
        marginRight: 5
    }
});

const SearchCard: () => React$Node = ({ navigation }) => {
    const [cardList, setCardList] = useState([]);
    const [name, onChangeName] = React.useState('');
    const [hp, onChangeHP] = React.useState('');

    const findCard = (name, hp, evolvesFrom) => {
        if (name === "") return
        let apiUrl = `https://api.pokemontcg.io/v1/cards?supertype=pokemon&name=${name}`;
        if (hp !== "") apiUrl += `&hp=${hp}`;
        //if (evolvesFrom !== "") apiUrl += `&evolvesFrom=${evolvesFrom}`; // instead of checking for an empty string, check to see if evolvesfrom is a navigation prop
        axios
            .get(apiUrl)
            .then(({ data: { cards } }) => {
                setCardList(cards.map(elem => parseCard(elem)));
            })
            .catch(error => {
                console.log(error)
            });
    }

    const parseCard = (card) => {
        let newCard = {
            name: card.name,
            uri: card.imageUrl,
            hp: card.hp
        }
        switch (card.subtype) {
            case "GX":
            case "EX":
            case "MEGA":
                newCard.prize = 2
            case "TAG TEAM":
                newCard.prize = 3
            default:
                newCard.prize = 1
        }
        return newCard
    }
    // const handleOnChangeHp = (text) => {
    //     if (/^\d+$/.test(text)) onChangeHP(text);
    // }
    return (
        <ScreenBase>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput style={{ ...styles.nameInput, ...styles.textInput }} onChangeText={text => onChangeName(text)} value={name} placeholder="Name" />
                    <TextInput style={{ ...styles.hpInput, ...styles.textInput }} onChangeText={text => onChangeHP(text)} value={hp} placeholder="HP" keyboardType="numeric" />
                    <TouchableOpacity onPress={() => findCard(name, hp)} style={styles.searchBtn}><Text style={{ color: 'white' }}>Search</Text></TouchableOpacity>
                </View>
                <ScrollView style={styles.cardList} horizontal={true}>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {cardList.map((elem, i) => {
                        return (
                            // <View key={elem.uri} >
                            //     <Image style={styles.cardListItem} source={{ uri: elem.uri }} onError={({ nativeEvent: {error} }) => console.log(error)} />
                            // </View>
                            <SearchItem key={elem.uri} card={elem} styleImg={styles.cardListItem} />
                        )
                    })}
                    </View>
                    
                </ScrollView>
            </View>
        </ScreenBase>
    )

};

export default SearchCard;