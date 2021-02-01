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
import { View, ScrollView, TextInput, Text } from 'react-native';
import { ScreenBase, DoubleTap, MyBtn } from '../../components'; //shared comps
import { SearchItem } from './components'; //local comps
import { Storage } from '../../lib';
import axios from 'axios';
import styles from './styles';

const SearchCard = ({ route, navigation }) => {
    const [cardList, setCardList] = useState([]);
    const [name, onChangeName] = useState('');
    const [hp, onChangeHP] = useState('');
    const [showMsg, setShowMsg] = useState({ visible: false, msg: "" })

    const findCard = () => {
        setShowMsg({ visible: false, msg: "" })
        setCardList([])
        if ((name === "" && !route.params?.evolve) || (route.params?.evolve && route.params?.evolve.name == "")) return
        let apiUrl = `https://api.pokemontcg.io/v1/cards?supertype=pokemon&name=${name}`;
        if (hp !== "") apiUrl += `&hp=${hp}`;
        console.log(route.params)
        if (route.params?.evolve && route.params?.evolve.name !== "") apiUrl += `&evolvesFrom=${route.params?.evolve.name}`;
        console.log(apiUrl)
        axios
            .get(apiUrl)
            .then(({ data: { cards } }) => {
                if (cards.length) setCardList(cards.map(elem => parseCard(elem)));
                else setShowMsg({ visible: true, msg: "No results found, try changing the search parameters!" })
            })
            .catch(error => {
                console.log(error)
            });
    }

    const loadFavorites = () => {
        Storage.getAll("Favorites").then((data) => {
            
            if (data) {
                let arr = [];
                for (const key in data) {
                    
                    if (data[key]?.uri) {
                        arr.push(data[key]);
                    }
                }
                console.log("setting arr", arr)
                setCardList(arr);
            }
        })
    }

    const parseCard = (card) => {
        let newCard = {
            name: card.name,
            uri: card.imageUrl,
            hp: parseInt(card.hp),
            dmg: 0
        }
        switch (card.subtype) {
            case "TAG TEAM":
            case "VMAX":
                newCard.prize = 3
                break;
            case "GX":
            case "EX":
            case "MEGA":
            case "V":
                newCard.prize = 2
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
    const validateInputs = (text) => {
        let numreg = /^[0-9]+$/;
        if (numreg.test(text) || text.length === 0) {
            onChangeHP(text);
        } else {
            return;
        }
    }
    return (
        <ScreenBase>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput disableFullscreenUI={true} style={{ ...styles.nameInput, ...styles.textInput }} onChangeText={text => onChangeName(text)} value={name} placeholder="Name" />
                    <TextInput disableFullscreenUI={true} style={{ ...styles.hpInput, ...styles.textInput }} onChangeText={text => validateInputs(text)} value={hp} placeholder="HP" keyboardType="numeric" />
                    <MyBtn style={styles.searchBtn} label="Search" handler={findCard} />
                    <MyBtn style={styles.searchBtn} label="Favorites" handler={loadFavorites} />
                </View>
                {
                    (showMsg.visible) ?
                        <Text style={styles.resultsMsgText}>{showMsg.msg}</Text> :
                        null
                }
                <ScrollView style={styles.cardList} horizontal={true}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {cardList.map((elem, i) => {
                            return (

                                <DoubleTap key={elem.uri} handler={() => benchAndReturnToMain(elem)}>
                                    <SearchItem card={elem} />
                                </DoubleTap>
                            )
                        })}

                    </View>
                </ScrollView>

                {(route.params?.evolve && route.params?.evolve.name !== "") ?
                    <TextInput editable={false} style={{ ...styles.textInput, ...styles.evolvesFromLabel }} value={"Evolves from " + route.params.evolve.name} /> :
                    null}
            </View>
        </ScreenBase>
    )

};

export default SearchCard;