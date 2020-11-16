import React, { useState } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import styles from './styles';


const PrizeMgr = ({ prizeCount, setPrize }) => {

    let prizeImg
    switch (true) {
        case (prizeCount >= 6):
            prizeImg = require('../../../../resources/prizes/6prize.png');
            break;
        case (prizeCount === 5):
            prizeImg = require('../../../../resources/prizes/5prize.png');
            break;
        case (prizeCount === 4):
            prizeImg = require('../../../../resources/prizes/4prize.png');
            break;
        case (prizeCount === 3):
            prizeImg = require('../../../../resources/prizes/3prize.png');
            break;
        case (prizeCount === 2):
            prizeImg = require('../../../../resources/prizes/2prize.png');
            break;
        case (prizeCount === 1):
            prizeImg = require('../../../../resources/prizes/1prize.png');
            break;
        default:
            prizeImg = require('../../../../resources/prizes/noprizes.png')
    }

    return (
        <GestureRecognizer
            onSwipeLeft={(state) => {
                setPrize(prizeCount - 1)
            }}
            onSwipeRight={(state) => {
                setPrize(prizeCount + 1)
            }}
        >
            <Image style={styles.prizes} source={prizeImg} />
            <Text style={styles.prizeCount}>{prizeCount}</Text>
        </GestureRecognizer>
    )
};

export default PrizeMgr;