import React, { useState } from 'react';
import { Modal, Pressable, } from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';

//sourced from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CoinModal = ({ coinModalVisible, coinModal, history, setHistory }) => {
    const [coin, setCoin] = useState("heads");

    const flipCoin = () => {
        if (coin === "spinning") return;
        setCoin("spinning");
        setTimeout(() => {
            if (getRandomInt(0, 1)) {
                setCoin("heads");
                setHistory([...history, "The coin landed on heads!"]);
            }
            else {
                setCoin("tails");
                setHistory([...history, "The coin landed on tails!"]);
            }
        }, 1000)
    }
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={coinModal}
        >
            <Pressable onPress={() => coinModalVisible(false)} style={styles.modal}>
                <Pressable onPress={() => { /*just preventing the rest of this box from being pressable*/ }} style={styles.modalBox}>
                    {
                        (coin === "spinning")
                            ? <FastImage
                                style={styles.coin}
                                source={require('../../../../resources/coin/animatedCoin.gif')}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            : <Pressable style={styles.coinPressBox} onPress={flipCoin}>
                                <FastImage
                                    style={styles.coin}
                                    source={(coin === "heads") ? require('../../../../resources/coin/heads.png') : require('../../../../resources/coin/tails.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </Pressable>
                    }
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default CoinModal;