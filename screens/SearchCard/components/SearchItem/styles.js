import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    cardListItem: {
        resizeMode: "stretch",
        height: 250,
        width: 150,
        marginLeft: 5,
        marginRight: 5,

    },
    container: {
        position: "relative",
        alignItems: "center",
        flexDirection: "column"
    },
    cardName: {
        width: "80%",
        position: "absolute",
        top: "5%",
        zIndex: 1000,
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
    },
    cardHp: {
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
        bottom: "10%",
        fontSize: 50
    }
});

export default styles;