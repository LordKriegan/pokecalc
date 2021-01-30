import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
        width: "80%",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        margin: "5%",
        height: "80%",
        position: "relative",
        backgroundColor: "rgba(220,220,220, 0.5)",
    },
    contentContainer: {
        height: "90%",
        width: "100%",
    },
    goBackBtn: {
        width: "15%",
        borderRadius: 5,
        padding: 3,
        backgroundColor: "rgb(82,82,82)",
        margin: 1,
        height: "10%",
        position: "absolute",
        bottom: 0,
        justifyContent: "center"
    }
});

export default styles;