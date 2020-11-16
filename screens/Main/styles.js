import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column"
    },
    activePokemonZone: {
        height: "65%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        position: "relative",
    },
    benchedPokemonZone: {
        height: "35%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    addCardBtn: {
        height: "60%",
        width: "12%",
        backgroundColor: "rgba(220,220,220, 0.5)",
        borderStyle: "dotted",
        borderWidth: 2,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    addCardBtnTxt: {
        fontFamily: "GUNPLAY_",
        fontSize: 45,
    },
    prizeZone: {
        position: "absolute",
        left: 5,
        top: 30,
        width: "33%",
        height: "100%",
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