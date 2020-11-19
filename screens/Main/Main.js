import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScreenBase } from '../../components'; //shared comps
import { Active, Bench, MyModal, CoinModal } from './components'; //local comps
import styles from './styles.js'

const status = {
    paralyzed: false,
    burned: false,
    asleep: false,
    poisoned: false,
    confused: false
}

const Main = ({ route, navigation }) => {
    useEffect(() => {
        if (route.params?.newCard) {
            addCard(route.params.newCard)
        }
    }, [route.params?.newCard]);

    useEffect(() => {
        if (route.params?.evolve) {
            let { zone, index, newCard } = route.params.evolve;
            let newArr = [...(zone === "active") ? active : bench]
            newCard.dmg = newArr[index].dmg
            newArr[index] = newCard;
            if (zone === "active") setActive(newArr);
            else setBench(newArr);
        }
    }, [route.params?.evolve]);

    const [active, setActive] = useState([]);
    const [bench, setBench] = useState([]);
    const [prizeCount, setPrizeCount] = useState(6);
    const [modalVisible, setModalVisible] = useState(false);
    const [hpInputText, setHpInputText] = useState("");
    const [modalContent, setModalContent] = useState({
        zone: "active",
        index: 0
    });
    const [history, setHistory] = useState([]);
    const [coinModal, setCoinModal] = useState(false);
    
    const addCard = (card) => {
        if (active.length + bench.length >= 6) return
        if (!active.length && !bench.length) { 
            setHistory([...history, `Added ${card.name} to active!`])
            setActive([...active, { ...card, ...status }])
        } else {
            setHistory([...history, `Added ${card.name} to bench!`])
            setBench([...bench, { ...card }])
        }
    }
    const setPrizes = (num) => {
        if (num <= 0) {
            //handle game over
            resetGame();
            return
        }
        const diff = prizeCount - num;
        const msg = (diff >= 0) ? `Lost ${diff} prize${(diff > 1) ? s : ''}!` : `Gained ${diff * -1} prize${(diff * -1 > 1) ? 's': ''}!`;
        setHistory([...history, msg])
        setPrizeCount(num)
    }
    const resetGame = () => {
        setActive([]);
        setBench([]);
        setHistory([]);
        setPrizeCount(6);
        //generate ad at some point
    }

    const setDmg = (dmg, zone, index) => {
        let newArr = [...(zone === "active") ? active : bench];
        let card = newArr[index];
        let dmgApplied = card.dmg - dmg
        setHistory([...history, `${card.name} ${(dmgApplied >= 0) ? "gained" : "lost"} ${(dmgApplied >= 0) ?dmgApplied : dmgApplied * -1} hitpoints!`])
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
            setHistory([...history, `${bench[index].name} was promoted to the active zone!`])
            setActive([...active, { ...bench[index], ...status }]);
            let newBench = [...bench];
            newBench.splice(index, 1);
            setBench(newBench);
        }
    }
    const retreat = (index) => {
        if (bench.length < 5) {
            setHistory([...history, `${active[index].name} retreated to the bench!`])
            let retreatedActive = { ...active[index] }
            let retreatedCard = {
                uri: retreatedActive.uri,
                hp: retreatedActive.hp,
                prize: retreatedActive.prize,
                name: retreatedActive.name,
                dmg: retreatedActive.dmg
            }
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
    const scoopUp = (zone, index, isKO) => {
        let newArr = [...(zone === "active") ? active : bench];

        if (isKO) setHistory([...history, `${newArr[index].name} was knocked out!`, `Lost ${newArr[index].prize} prize${(newArr[index].prize > 1) ? 's' : ''}!`]);
        else setHistory([...history, `${newArr[index].name} was scooped up!`]);
        newArr.splice(index, 1);
        if (zone === "active") setActive(newArr);
        else setBench(newArr);
        if (modalVisible) setModalVisible(false);
    }

    const knockOut = (zone, index) => {
        let card = [...(zone === "active") ? active : bench][index];
        scoopUp(zone, index, true);
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

    const setStatus = (index, status) => {
        const newArr = [...active];
        if (status === "asleep") if (newArr[index].paralyzed || newArr[index].confused) return;
        if (status === "confused") if (newArr[index].paralyzed || newArr[index].asleep) return;
        if (status === "paralyzed") if (newArr[index].asleep || newArr[index].confused) return;
        newArr[index][status] = !newArr[index][status];
        setHistory([...history, `${active[index].name} is ${(newArr[index][status]) ? "now" : "no longer"} ${status}!`])
        setActive(newArr);
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
                    setStatus={setStatus}
                    promote={promote}
                    retreat={retreat}
                    
                />
                <CoinModal
                    coinModalVisible={setCoinModal}
                    coinModal={coinModal}
                    />
                <Active
                    active={active}
                    prizeCount={prizeCount}
                    setPrizes={setPrizes}
                    setDmg={setDmg}
                    retreat={retreat}
                    openModal={openModal}
                    resetGame={resetGame}
                    history={history}
                    setCoinModal={setCoinModal}
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