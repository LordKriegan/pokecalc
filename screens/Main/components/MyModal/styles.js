import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    },
    switchBox: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        padding: 3,
        backgroundColor: "rgb(82,82,82)",
        margin: 1,
        width: "100%",
        height: 25 
    },
    switchText: {
        color: "white", 
        fontFamily: "GUNPLAY_",
        textAlign: "center"
    }
});

export default styles;