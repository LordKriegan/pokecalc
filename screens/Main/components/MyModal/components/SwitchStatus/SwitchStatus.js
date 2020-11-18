import React from 'react';
import { View, Switch, Text } from 'react-native';
import styles from './styles';

const SwitchStatus = ({ name, value, handler}) => {
    return (
        <View style={styles.switchBox}>
            <Text style={styles.switchText}>{name}</Text>
            <Switch value={value} onValueChange={handler} />
        </View>
    )
}

export default SwitchStatus;