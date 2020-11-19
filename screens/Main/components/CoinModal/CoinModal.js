import React, { useRef } from 'react';
import { Modal, Pressable, Image } from 'react-native';
import styles from './styles';
import CardFlip from 'react-native-card-flip';

const CoinModal = ({ coinModalVisible, coinModal }) => {
    
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={coinModal}
        >
            <Pressable onPress={() => coinModalVisible(false)} style={styles.modal}>
                <Pressable onPress={() => { /*just preventing the rest of this box from being pressable*/ }} style={styles.modalBox}>
                    
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default CoinModal;