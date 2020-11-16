import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const MyBtn = ({ label, handler }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={handler}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
};

export default MyBtn;