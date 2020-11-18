import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const MyBtn = ({ label, handler, style }) => {

    return (
        <TouchableOpacity style={(style) ? style : styles.button } onPress={handler}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
};

export default MyBtn;