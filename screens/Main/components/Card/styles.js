import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        width: "15%"
    },
    activePokemonCard: {
        height: "80%",
        width: "100%",
    },
    benchedPokemonCard: {
        height: "60%",
        width: "80%"
    },
    cardText: {
        fontFamily: "GUNPLA3D",
        color: "red",
        backgroundColor: "rgba(220,220,220, 0.75)",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
    }, 
    statusBox: {
        width: "100%",
        height: "40%",
        position: "absolute",
        top: "10%",
        flexDirection: "row",
        justifyContent: "center"
    },
    status: {
        height: 40,
        width: 40,
        resizeMode: "contain"
    }
});

export default styles;