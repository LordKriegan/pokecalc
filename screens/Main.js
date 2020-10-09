import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ScreenBase } from '../components';
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
    },
    activePokemonCard: {
        resizeMode: "contain",
        height: "80%",
        width: "50%"
    },
    benchedPokemonZone: {
        height: "35%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    benchedPokemonCard: {
        resizeMode: "contain",
        height: "60%",
        width: "20%"
    }
});

const Main: () => React$Node = (props) => {

    return (
        <ScreenBase>
            <View style={styles.main}>
                <View style={styles.activePokemonZone}>
                    <Image style={styles.activePokemonCard} source={{ uri: "https://images.pokemontcg.io/ex3/100.png" }} />
                </View>
                <View style={styles.benchedPokemonZone}>
                    <Image style={styles.benchedPokemonCard} source={{ uri: "https://images.pokemontcg.io/ex3/100.png" }} />
                    <Image style={styles.benchedPokemonCard} source={{ uri: "https://images.pokemontcg.io/ex3/100.png" }} />
                    <Image style={styles.benchedPokemonCard} source={{ uri: "https://images.pokemontcg.io/ex3/100.png" }} />
                    <Image style={styles.benchedPokemonCard} source={{ uri: "https://images.pokemontcg.io/ex3/100.png" }} />
                </View>
            </View>
        </ScreenBase>
    );
};

export default Main;