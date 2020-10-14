import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, } from 'react-native';
import { ScreenBase, Card } from '../components';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column"
    },
    activePokemonZone: {
        height: "65%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    activePokemonCard: {
        resizeMode: "contain",
        height: "80%",
        width: "50%"
    },
    benchedPokemonZone: {
        height: "35%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    benchedPokemonCard: {
        resizeMode: "contain",
        height: "60%",
        width: "20%"
    },
    addCardBtn: {
        height: "60%",
        width: "12%",
        backgroundColor: "rgba(220,220,220, 0.5)",
        borderStyle: "dotted",
        borderWidth: 2,
        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center"
    },
    addCardBtnTxt: {
        fontFamily: "GUNPLAY_",
        fontSize: 45,
    }
});



const Main: () => React$Node = (props) => {

    const [active, setActive] = useState([]);
    const [bench, setBench] = useState([]);

    const addCard = () => {
        if (active.length === 0) {
            setActive([...active, { uri: "https://images.pokemontcg.io/ex3/100.png", hp: 120 }])
        } else {
            setBench([...bench, { uri: "https://images.pokemontcg.io/pop3/1.png", hp: 120 }])
        }
    }
    const setCardHp = (newHp, zone, index) => {
        let newArr = [...(zone === "active") ? active : bench];
        if (newHp <= 0) {
            newArr.splice(index, 1)
            if (zone === 'active') {
                if (bench.length > 0) {
                    setActive([bench[0]]);
                    newArr = [...bench];
                    newArr.splice(0,1)
                    setBench(newArr);
                    return;
                }
            }
        } else {
            newArr[index].hp = newHp;
        }
        if (zone === "active") setActive(newArr)
        else setBench(newArr)
    }
    return (
        <ScreenBase>
            <View style={styles.main}>
                <View style={styles.activePokemonZone}>
                    {active.map((elem, i) => {
                        return (
                            <Card key={"Active" + i} type="active" card={elem} index={i} setHp={setCardHp} />
                        )
                    })}
                </View>
                <View style={styles.benchedPokemonZone}>
                    {bench.map((elem, i) => {
                        return (
                            <Card key={"Bench" + i} type="bench" card={elem} index={i} setHp={setCardHp} />
                        )
                    })}
                    {((active.length + bench.length) < 6) ? <TouchableOpacity style={styles.addCardBtn} onPress={addCard}>
                        <Text style={styles.addCardBtnTxt}>+</Text>
                    </TouchableOpacity> : null}
                </View>
            </View>
        </ScreenBase>
    );
};

export default Main;