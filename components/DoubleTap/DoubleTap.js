import React from 'react';
import { TouchableOpacity } from "react-native";

const DoubleTap = (props) => {
    //double tap logic sourced from https://medium.com/handlebar-labs/instagram-style-double-tap-with-react-native-49e757f68de
    let lastTap;
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            props.handler()
        } else {
            lastTap = now;
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.7} style={props.customStyle} onPress={handleDoubleTap}>
            {props.children}
        </TouchableOpacity>
    )
}

export default DoubleTap;