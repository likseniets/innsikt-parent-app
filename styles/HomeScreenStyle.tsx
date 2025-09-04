import { StyleSheet } from "react-native";

export const HomeScreenStyle = StyleSheet.create({
    ScenarioView: {
        flex: 1,
        flexDirection: "column",
        color: "#fff",
        backgroundColor: "#030303",
        alignContent: "center",
    },

    ScenarioCard: {
        backgroundColor: "#15191F",
        flexDirection: 'column',
        width: '95%',
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TextColor: {
        color: '#fff',
        textAlign: 'center'
    }
})