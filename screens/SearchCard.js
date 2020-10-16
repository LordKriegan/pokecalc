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
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ScreenBase } from '../components';
import axios from 'axios';

async function findCard(name, hp, evolvesFrom) {
    if (name === "") return []
    let apiUrl = `https://api.pokemontcg.io/v1/cards?name=${name}`;
    if (hp !== "") apiUrl += `&hp=${hp}`;
    if (evolvesFrom !== "") apiUrl += `&evolvesFrom=${evolvesFrom}`;
    let data = await axios.get(apiUrl)
    return data;
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

const styles = StyleSheet.create({});

const SearchCard: () => React$Node = (props) => {

    return (

    )

};

export default SearchCard;