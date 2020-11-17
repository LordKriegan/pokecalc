import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Card } from '../'
import styles from './styles';

const Bench = ({ active, bench, setDmg, promote, openModal, gotoCardLookup}) => {

    return (
        <View style={styles.benchedPokemonZone}>
            {bench.map((elem, i) => {
                return (
                    <Card key={"Bench" + i} type="bench" card={elem} index={i} setHp={setDmg} promote={promote} handler={openModal} />
                )
            })}
            {((active.length + bench.length) < 6) ?
                <TouchableOpacity style={styles.addCardBtn} onPress={gotoCardLookup}>
                    <Text style={styles.addCardBtnTxt}>+</Text>
                </TouchableOpacity>
                : null}
        </View>
    )
}

export default Bench;