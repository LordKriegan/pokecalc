import React, { useRef } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MyBtn } from '../../../../components';
import styles from './styles';

//animated scroll to bottom sourced from https://stackoverflow.com/questions/29310553/is-it-possible-to-keep-a-scrollview-scrolled-to-the-bottom

const MainMenu = ({ resetGame, history, setCoinModal }) => {
    const scrollViewRef = useRef();
    
    return (
        <>

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

            <MyBtn label="Flip Coin" handler={() => { setCoinModal(true) }} />
            <MyBtn label="Reset" handler={resetGame} />
        </>
    )
};

export default MainMenu;