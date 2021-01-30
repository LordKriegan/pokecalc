import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        position: "relative"
    },
    aboutBtn: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 25,
        height: 25,
        borderRadius: 50,
        borderStyle:"solid",
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: "rgba(220,220,220, 0.5)",
        color: "black"
    },
    aboutBtnTxt: {
        color: "black",
        fontFamily: "GUNPLAY_",
        textAlign: "center"
    },
    modalBox: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        width: "50%",
        backgroundColor: "rgba(220,220,220, 0.8)",
        flexDirection: "row",
        zIndex: 1000
    },
    modal: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    setHpInput: {
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center",
        margin: 1,
        padding: 0,
        width: "100%"
    },
    setHpBox: {
        margin: 1,
        width: "100%"
    },
    modalImage: {
        width: "40%",
        height: "100%",
        resizeMode: "contain",
        marginRight: "10%",
    },
    modalButtonsBox: {
        width: "50%"
    }
});

export default styles;