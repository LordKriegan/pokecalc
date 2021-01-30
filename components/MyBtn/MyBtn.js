import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const MyBtn = ({ label, handler, style, textStyle }) => {
    return (
        <TouchableOpacity style={(style) ? style : styles.button } onPress={handler}>
            <Text style={(textStyle) ? textStyle : styles.label }>{label}</Text>
        </TouchableOpacity>
    )
};

export default MyBtn;