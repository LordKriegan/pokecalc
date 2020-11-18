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
    nameInput: {
        width: "60%",
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
    cardListItem: {
        resizeMode: "stretch",
        height: 250,
        width: 150,
        marginLeft: 5,
        marginRight: 5
    }
});

export default styles;