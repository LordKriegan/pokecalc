import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "80%",
        flexDirection: "column",
        borderRadius: 10,
        marginTop: "5%",
        marginBottom: "5%",
        alignSelf: "center",
        alignItems: "center"
    },
    searchBtn: {
        borderRadius: 10,
        padding: 5,
        justifyContent: "center",
        margin: 5,
        backgroundColor: "rgb(82,82,82)",
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center"
    },
    evolvesFromLabel: {
        margin: 5,
        color: "black",
        backgroundColor: "rgba(220,220,220, 0.5)"
    },
    nameInput: {
        flex: 1,
        margin: 5
    },
    hpInput: {
        width: "20%",
        margin: 5
    },
    inputBox: {
        flexDirection: "row"
    },
    cardList: {
        width: "100%",
    },
    resultsMsgText: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: "rgba(220,220,220,0.5)",
        textAlign: "center"
    }
});

export default styles;