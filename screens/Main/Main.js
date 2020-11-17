import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScreenBase } from '../../components'; //shared comps
import { Active, Bench, MyModal } from './components'; //local comps
import styles from './styles.js'

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
    const [hpInputText, setHpInputText] = useState("");
    const [modalContent, setModalContent] = useState({
        zone: "active",
        index: 0
    });

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
        setModalVisible(false)
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
                <MyModal 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    active={active}
                    bench={bench}
                    modalContent={modalContent}
                    setHp={setHp}
                    knockOut={knockOut}
                    scoopUp={scoopUp}
                    evolvePokemon={evolvePokemon}
                    hpInputText={hpInputText}
                    setHpInputText={setHpInputText}
                    />
                <Active
                    active={active}
                    prizeCount={prizeCount}
                    setPrizes={setPrizes}
                    setDmg={setDmg}
                    retreat={retreat}
                    openModal={openModal}
                    />
                <Bench
                    active={active}
                    bench={bench}
                    setDmg={setDmg}
                    promote={promote}
                    openModal={openModal}
                    gotoCardLookup={gotoCardLookup}
                    />
            </View>
        </ScreenBase>
    );
};

export default Main;