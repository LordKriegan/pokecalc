import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ScreenBase, MyBtn } from '../../components'; //shared comps
import { AboutSection } from './components'; //shared comps
import styles from './styles.js';

const Main = ({ route, navigation }) => {

    const goBack = () => {
        navigation.navigate("Main");
    }
    const AboutArr = [
        {
            img: require('../../resources/help_images/doubleTap.png'),
            position: "left",
            header: "Double Taps",
            body: "You can double tap cards to interact with them. Double tap a card in your search results to add it to your bench, or double tap a card on the field to open a menu!"
        },
        {
            img: require('../../resources/help_images/swipeLeftRight.png'),
            position: "right",
            header: "Swipes (Left/Right)",
            body: "Need to quickly modify a Pokemon's HP? Swiping left or right will increment it's HP by 10."
        },
        {
            img: require('../../resources/help_images/swipeUpDown.png'),
            position: "left",
            header: "Swipes (Up/Down)",
            body: "Swiping a Pokemon up while its on the bench will promote to the Active zone, while swiping a pokemon in the Active zone will demote it to the bench. Note that the Active zone does support 2 Pokemon at a time, so feel free to tag team!"
        },
        {
            header: "Legal Mumbo Jumbo",
            body: "Pokemon and all assosciated Intellectual Properties are copyrights of their respective owners."
        }
    ]
    return (
        <ScreenBase>
            <View style={styles.main}>
                <View style={styles.contentContainer}>
                    <ScrollView>
                        {
                            AboutArr.map((elem, i) => {
                                return(<AboutSection
                                    key={i}
                                    image={(elem.img) ? elem.img : null}
                                    imagePosition={(elem.position) ? elem.position : null}
                                    header={elem.header}
                                    body={elem.body} 
                                />)
                            })
                        }
                    </ScrollView>
                </View>
               <MyBtn style={styles.goBackBtn} label="Go Back" handler={goBack}/> 
            </View>
            
        </ScreenBase>
    );
};

export default Main;