import React from 'react';
import { Modal, Pressable, Image, View, ScrollView, TextInput } from 'react-native';
import { MyBtn } from '../../../../components';
import styles from './styles';

const MyModal = ({ modalVisible, setModalVisible, active, bench, modalContent, setHp, knockOut, scoopUp, evolvePokemon, hpInputText, setHpInputText }) => {
    
    //only for hp input text :P sourced from answer on https://stackoverflow.com/questions/32946793/react-native-textinput-that-only-accepts-numeric-characters
    const validateInputs = (text) => {
        let numreg = /^[0-9]+$/;
        if (numreg.test(text) || text.length === 0) {
            setHpInputText(text);
        } else {
            return;
        }
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
    )
}

export default MyModal;