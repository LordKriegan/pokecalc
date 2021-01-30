import React from 'react';
import { View } from 'react-native';
import { ScreenBase, MyBtn } from '../../components'; //shared comps
import styles from './styles.js';

const Main = ({ route, navigation }) => {

    const goBack = () => {
        navigation.navigate("Main");
    }
    return (
        <ScreenBase>
            <View>
               <MyBtn label="Go Back" handler={goBack}/> 
            </View>
            
        </ScreenBase>
    );
};

export default Main;