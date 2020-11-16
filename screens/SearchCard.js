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

const SearchCard = ({ route, navigation }) => {
    const [cardList, setCardList] = useState([]);
    const [name, onChangeName] = useState('');
    const [hp, onChangeHP] = useState('');

    const findCard = () => {
        if (name === "") return
        let apiUrl = `https://api.pokemontcg.io/v1/cards?supertype=pokemon&name=${name}`;
        if (hp !== "") apiUrl += `&hp=${hp}`;
        console.log(route.params)
        if (route.params?.evolve && route.params?.evolve.name !== "") apiUrl += `&evolvesFrom=${route.params?.evolve.name}`;
        console.log(apiUrl)
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
            hp: parseInt(card.hp),
            dmg: 0
        }
        switch (card.subtype) {
            case "GX":
            case "EX":
            case "MEGA":
                newCard.prize = 2
                break;
            case "TAG TEAM":
                newCard.prize = 3
                break;
            default:
                newCard.prize = 1
        }
        return newCard
    }

    const benchAndReturnToMain = (card) => {
        let options = {}
        console.log("route params in cardlookup", route.params)
        if (route.params?.evolve) {
            options = {
                evolve: {
                    newCard: card,
                    zone: route.params.evolve.zone,
                    index: route.params.evolve.index,
                }
            }
        } else {
            options = {
                newCard: card,
            }
        }
        console.log(options)
        navigation.navigate("Main", options)
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
                    <TouchableOpacity onPress={findCard} style={styles.searchBtn}><Text style={{ color: 'white' }}>Search</Text></TouchableOpacity>
                </View>
                <ScrollView style={styles.cardList} horizontal={true}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {cardList.map((elem, i) => {
                            return (

                                <TouchableOpacity key={elem.uri} onLongPress={() => benchAndReturnToMain(elem)}>
                                    <SearchItem card={elem} styleImg={styles.cardListItem} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>

            </View>
        </ScreenBase>
    )

};

export default SearchCard;