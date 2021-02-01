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
    },
    star: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    starIconActive: {
        width: "25%",
        height: "25%",
        position: "absolute",
        bottom: "-5%",
        right: 0
    },
    starIconBench: {
        width: "15%",
        height: "15%",
        position: "absolute",
        bottom: 0,
        right: "15%"
    }
});

export default styles;