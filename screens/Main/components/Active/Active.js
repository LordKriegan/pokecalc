import React from 'react';
import { View, ImagePropTypes } from 'react-native';
import { Card, PrizeMgr, MainMenu } from '../'
import styles from './styles';

const Active = ({ active, prizeCount, setPrizes, setDmg, retreat, openModal, resetGame, history, setCoinModal }) => {

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
            <View style={styles.mainMenu}>
                <MainMenu
                    resetGame={resetGame}
                    history={history}
                    setCoinModal={setCoinModal}
                />
            </View>

        </View>
    )
}

export default Active;