import React from 'react';
import { Modal, Pressable, Image, View, ScrollView, TextInput } from 'react-native';
import { MyBtn } from '../../../../components';
import { SwitchStatus } from './components';
import styles from './styles';

const MyModal = ({ modalVisible, setModalVisible, active, bench, modalContent, setHp, knockOut, scoopUp, evolvePokemon, hpInputText, setHpInputText, setStatus, promote, retreat }) => {

    //only for hp input text :P sourced from answer on https://stackoverflow.com/questions/32946793/react-native-textinput-that-only-accepts-numeric-characters
    const validateInputs = (text) => {
        let numreg = /^[0-9]+$/;
        if (numreg.test(text) || text.length === 0) {
            setHpInputText(text);
        } else {
            return;
        }
    }
    const promoteOrRetreat = (index) => {
        if (modalContent.zone === "active") retreat(index);
        else promote(index);
        setModalVisible(false);
    }
    return (
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
                                    disableFullscreenUI={true}
                                    value={hpInputText}
                                    onChangeText={text => validateInputs(text)}
                                    style={styles.setHpInput}
                                    keyboardType="numeric"
                                />
                                <MyBtn label="Set Hp" handler={() => { setHp(modalContent.zone, modalContent.index, hpInputText) }} />
                            </View>
                            {
                                (modalContent.zone === "active" && active[modalContent.index])
                                    ? <>
                                        <SwitchStatus
                                            value={active[modalContent.index].asleep}
                                            name="Asleep"
                                            handler={() => setStatus(modalContent.index, "asleep")}
                                        />
                                        <SwitchStatus
                                            value={active[modalContent.index].paralyzed}
                                            name="Paralyzed"
                                            handler={() => setStatus(modalContent.index, "paralyzed")}
                                        />
                                        <SwitchStatus
                                            value={active[modalContent.index].confused}
                                            name="Confused"
                                            handler={() => setStatus(modalContent.index, "confused")}
                                        />
                                        <SwitchStatus
                                            value={active[modalContent.index].burned}
                                            name="Burned"
                                            handler={() => setStatus(modalContent.index, "burned")}
                                        />
                                        <SwitchStatus
                                            value={active[modalContent.index].poisoned}
                                            name="Poisoned"
                                            handler={() => setStatus(modalContent.index, "poisoned")}
                                        />
                                    </>
                                    : null
                            }
                            <MyBtn label="Evolve" handler={() => { evolvePokemon(modalContent.zone, modalContent.index) }} />
                            <MyBtn label="Knock Out" handler={() => { knockOut(modalContent.zone, modalContent.index) }} />
                            <MyBtn label="Scoop Up" handler={() => { scoopUp(modalContent.zone, modalContent.index) }} />
                            <MyBtn label={(modalContent.zone === "active") ? "Retreat" : "Promote"} handler={() => promoteOrRetreat(modalContent.index)} />
                        </ScrollView>
                        <MyBtn label="Close" handler={() => setModalVisible(false)} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default MyModal;