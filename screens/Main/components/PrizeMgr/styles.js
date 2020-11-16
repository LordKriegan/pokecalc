import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    prizes: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    container: {
        position: "relative"
    },
    prizeCount: {
        position: "absolute",
        
        zIndex: 1000,
        fontFamily: "GUNPLAY_",
        color: "red",
        fontSize: 100,
        width: "100%",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center",
    }
})

export default styles;