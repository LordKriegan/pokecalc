import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles.js';

const AboutSection = ({image, imagePosition, header, body}) => {
    const flexDir = {flexDirection: "row"}
    const textWidth = {width: "100%"}
    if (image && imagePosition === "right") flexDir.flexDirection = "row-reverse"
    if (image && imagePosition) textWidth.width = "50%"
    return (
        <View style={styles.main}>
            <Text style={styles.header}>{header}</Text>
            <View style={{...styles.bodyContainer, ...flexDir}}>
                {(image) ? <Image style={styles.helpImg} source={image} /> : null}
                <Text style={{...styles.bodyText, ...textWidth}}>{body}</Text>
            </View>
        </View>
    );
};

export default AboutSection;