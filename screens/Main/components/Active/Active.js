import React from 'react';
import { View } from 'react-native';
import { Card, PrizeMgr } from '../'
import styles from './styles';

const Active = ({ active, prizeCount, setPrizes, setDmg, retreat, openModal }) => {

    return (
        <View style={styles.activePokemonZone}>
            <View style={styles.prizeZone}>
                <PrizeMgr prizeCount={prizeCount} setPrize={setPrizes} />
            </View>
            {active.map((elem, i) => {
                return (
                    <Card key={"Active" + i} type="active" card={elem} index={i} setHp={setDmg} retreat={retreat} handler={openModal} />
                )
            })}
        </View>
    )
}

export default Active;