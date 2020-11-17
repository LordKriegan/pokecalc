import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    activePokemonZone: {
        height: "65%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        position: "relative",
    },
    prizeZone: {
        position: "absolute",
        left: 5,
        top: 30,
        width: "33%",
        height: "100%",
    }
});

export default styles;