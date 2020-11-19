import React, { useRef } from 'react';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { MyBtn } from '../../../../components';
import styles from './styles';

const MainMenu = ({ resetGame, history }) => {
    const scrollViewRef = useRef();
    return (
        <>

            {/* <FlatList
                style={styles.historyBox}
                data={history}
                initialScrollIndex={history.length - 1}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.historyElemBox}>
                            <Text style={styles.historyElem}>{item}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => item + index}
            /> */}
            <View style={styles.historyBox}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {history.map((elem, i) => {
                        return (
                            <View key={elem + i} style={styles.historyElemBox}>
                                <Text style={styles.historyElem}>{elem}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            <MyBtn label="Flip Coin" handler={() => { }} />
            <MyBtn label="Reset" handler={resetGame} />
        </>
    )
};

export default MainMenu;