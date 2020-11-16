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
    }
});

export default styles;