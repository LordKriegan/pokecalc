import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, ScrollView, Image, Pressable } from 'react-native';
import { ScreenBase, Card, PrizeMgr, MyBtn } from '../components';

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
        position: "relative",
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
    },
    prizeZone: {
        position: "absolute",
        left: 5,
        top: 30,
        width: "33%",
        height: "100%",
    },
    modalBox: {

        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: "50%",
        backgroundColor: "rgba(220,220,220, 0.8)",
        flexDirection: "row",
        zIndex: 1000
    },
    modal: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    setHpInput: {
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        margin: 1,
        padding: 0,
        width: "100%"
    },
    setHpBox: {
        margin: 1,
        width: "100%"
    },
    modalImage: {
        width: "40%",
        height: "100%",
        resizeMode: "contain",
        marginRight: "10%",
    },
    modalButtonsBox: {
        width: "50%"
    }
});

const status = {
    paralyzed: false,
    burned: false,
    asleep: false,
    poisoned: false,
    confused: false
}

const Main = ({ route, navigation }) => {

    const [active, setActive] = useState([]);
    const [bench, setBench] = useState([]);
    const [prizeCount, setPrizeCount] = useState(6);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        zone: "active",
        index: 0
    });
    const [hpInputText, setHpInputText] = useState("")

    useEffect(() => {

        if (route.params?.newCard) {
            addCard(route.params.newCard)
        }
    }, [route.params?.newCard])


    useEffect(() => {
        if (route.params?.evolve) {
            let { zone, index, newCard } = route.params.evolve;
            let newArr = [...(zone === "active") ? active : bench]
            newCard.dmg = newArr[index].dmg
            newArr[index] = newCard;
            if (zone === "active") setActive(newArr);
            else setBench(newArr);
        }
    }, [route.params?.evolve])

    const addCard = (card) => {
        if (active.length + bench.length >= 6) return
        if (!active.length && !bench.length) {
            setActive([...active, { ...card, ...status }])
        } else {
            setBench([...bench, { ...card }])
        }
    }
    const setPrizes = (num) => {
        if (num <= 0) {
            //handle game over
            setPrizeCount(0);
            return
        }
        setPrizeCount(num)
    }

    const setDmg = (dmg, zone, index) => {
        let newArr = [...(zone === "active") ? active : bench];
        let card = newArr[index];
        console.log("dmg applied: ", card.dmg - dmg)
        if ((card.hp - dmg) <= 0) {
            let removedCard = newArr.splice(index, 1)[0];
            setPrizes(prizeCount - removedCard.prize);
        } else {
            newArr[index].dmg = dmg;
        }
        if (zone === "active") setActive(newArr)
        else setBench(newArr)
    }

    const promote = (index) => {
        if (active.length < 2) {
            setActive([...active, { ...bench[index], ...status }]);
            let newBench = [...bench];
            newBench.splice(index, 1);
            setBench(newBench);
        }
    }
    const retreat = (index) => {
        if (bench.length < 5) {
            let retreatedActive = { ...active[index] }
            console.log(retreatedActive.hp)
            let retreatedCard = {
                uri: retreatedActive.uri,
                hp: retreatedActive.hp,
                prize: retreatedActive.prize,
                name: retreatedActive.name,
                dmg: retreatedActive.dmg
            }
            console.log(retreatedCard)
            setBench([...bench, retreatedCard]);
            let newActive = [...active];
            newActive.splice(index, 1);
            setActive(newActive);
        }
    }
    const gotoCardLookup = () => {
        navigation.navigate("CardLookup", {})
    }
    const openModal = (zone, index) => {
        setModalContent({
            zone,
            index
        })
        setModalVisible(true)
        const card = [...(zone === "active") ? active : bench][index]
        setHpInputText((card.hp - card.dmg).toString())
    }
    const scoopUp = (zone, index) => {
        let newArr = [...(zone === "active") ? active : bench];
        newArr.splice(index, 1);
        if (zone === "active") setActive(newArr);
        else setBench(newArr);
        if (modalVisible) setModalVisible(false);
    }

    const knockOut = (zone, index) => {
        let card = [...(zone === "active") ? active : bench][index];
        scoopUp(zone, index);
        setPrizeCount(prizeCount - card.prize);
    }

    const setHp = (zone, index, hp) => {
        let card = [...(zone === "active") ? active : bench][index];
        let dmg = card.hp - hp;
        setDmg(dmg, zone, index);

    }
    //only for hp input text :P sourced from answer on https://stackoverflow.com/questions/32946793/react-native-textinput-that-only-accepts-numeric-characters
    const validateInputs = (text) => {
        let numreg = /^[0-9]+$/;
        if (numreg.test(text) || text.length === 0) {
            setHpInputText(text);
        } else {
            return;
        }
    }
    const evolvePokemon = (zone, index) => {
        setModalVisible(false);
        let { name } = [...(zone === "active") ? active : bench][index];
        navigation.navigate("CardLookup", {
            evolve: {
                zone,
                index,
                name
            }
        })
    }
    return (
        <ScreenBase>
            <View style={styles.main}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <Pressable onPress={() => setModalVisible(false)} style={styles.modal}>
                        <Pressable onPress={() => {/*just preventing the rest of this box from being pressable*/ }} style={styles.modalBox}>
                            {(modalContent.zone === "active") ?
                                (active[modalContent.index]) ?
                                    <Image style={styles.modalImage} source={{ uri: [...active][modalContent.index].uri }} />
                                    : null
                                :
                                (bench[modalContent.index]) ?
                                    <Image style={styles.modalImage} source={{ uri: [...bench][modalContent.index].uri }} />
                                    : null
                            }
                            <View style={styles.modalButtonsBox}>
                                <ScrollView
                                    persistentScrollbar={true}>
                                    <View style={styles.setHpBox}>
                                        <TextInput
                                            value={hpInputText}
                                            onChangeText={text => validateInputs(text)}
                                            style={styles.setHpInput}
                                            keyboardType="numeric"
                                        />
                                        <MyBtn label="Set Hp" handler={() => { setHp(modalContent.zone, modalContent.index, hpInputText) }} />
                                    </View>
                                    <MyBtn label="Evolve" handler={() => { evolvePokemon(modalContent.zone, modalContent.index) }} />
                                    <MyBtn label="Knock Out" handler={() => { knockOut(modalContent.zone, modalContent.index) }} />
                                    <MyBtn label="Scoop Up" handler={() => { scoopUp(modalContent.zone, modalContent.index) }} />

                                </ScrollView>
                                <MyBtn label="Close" handler={() => setModalVisible(false)} />
                            </View>
                        </Pressable>
                    </Pressable>

                </Modal>
                <View style={styles.activePokemonZone}>
                    <View style={styles.prizeZone}>
                        <PrizeMgr prizeCount={prizeCount} setPrize={setPrizes} />
                    </View>
                    {active.map((elem, i) => {
                        return (
                            <Card key={"Active" + i} type="active" card={elem} index={i} setHp={setDmg} retreat={retreat} onLongPress={openModal} />
                        )
                    })}
                </View>
                <View style={styles.benchedPokemonZone}>
                    {bench.map((elem, i) => {
                        return (
                            <Card key={"Bench" + i} type="bench" card={elem} index={i} setHp={setDmg} promote={promote} onLongPress={openModal} />
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