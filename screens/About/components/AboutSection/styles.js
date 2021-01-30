import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        flexDirection: "column",
        height: 250,
        position: "relative"
    },
    header: {
        fontFamily: "GUNPLAY_",
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 30,
    },
    bodyContainer: {
        height: "100%",
        width: "80%",
        alignSelf: "center",
        position: "absolute",
        top: 0
    },
    bodyText: { 
        fontFamily: "GUNPLAY_",
        color: "black", 
        textAlignVertical: "center",
        fontSize: 15,
        textAlign: "center"
    },
    helpImg: {
        height: "100%",
        resizeMode: "center",
    }
});

export default styles;