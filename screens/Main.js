import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
    benchedPokemonZone: {
        height: "35%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
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

const status = {
    paralyzed: 0,
    burned: 0,
    asleep: 0,
    poisoned: 0,
    confused: 0
}

const Main: () => React$Node = ({ route, navigation }) => {

    const [active, setActive] = useState([]);
    const [bench, setBench] = useState([]);
    useEffect(() => {
        if (route.params?.newCard) addCard(route.params.newCard)
    }, [route.params?.newCard])
    
    const addCard = (card) => {
        if (active.length === 0) {
            setActive([...active, { ...card, ...status }])
        } else {
            setBench([...bench, { ...card }])
        }
    }
    const setCardHp = (newHp, zone, index) => {
        let newArr = [...(zone === "active") ? active : bench];
        if (newHp <= 0) {
            let removedCard = newArr.splice(index, 1)[0];
            console.log(removedCard);
        } else {
            newArr[index].hp = newHp;
        }
        if (zone === "active") setActive(newArr)
        else setBench(newArr)
    }
    const promote = (index) => {
        if (active.length < 2) {
            setActive([...active, { ...bench[index], ...status}]);
            let newBench = [...bench];
            newBench.splice(index, 1);
            setBench(newBench);
        }
    }
    const retreat = (index) => {
        if (bench.length < 5) {
            let retreatedActive = {...active[index]}
            let retreatedCard = {
                uri: retreatedActive.uri,
                hp: retreatedActive.hp,
                prize: retreatedActive.prize,
                name: retreatedActive.name
            }
            setBench([...bench, retreatedCard]);
            let newActive = [...active];
            newActive.splice(index, 1);
            setActive(newActive);
        }
    }
    const gotoCardLookup = () => {
        navigation.navigate("CardLookup")
    }
    return (
        <ScreenBase>
            <View style={styles.main}>
                <View style={styles.activePokemonZone}>
                    {active.map((elem, i) => {
                        return (
                            <Card key={"Active" + i} type="active" card={elem} index={i} setHp={setCardHp} retreat={retreat}/>
                        )
                    })}
                </View>
                <View style={styles.benchedPokemonZone}>
                    {bench.map((elem, i) => {
                        return (
                            <Card key={"Bench" + i} type="bench" card={elem} index={i} setHp={setCardHp} promote={promote} />
                        )
                    })}
                    {((active.length + bench.length) < 6) ? <TouchableOpacity style={styles.addCardBtn} onPress={gotoCardLookup}>
                        <Text style={styles.addCardBtnTxt}>+</Text>
                    </TouchableOpacity> : null}
                </View>
            </View>
        </ScreenBase>
    );
};

export default Main;