import { StyleSheet } from "react-native";

export const HomeScreenStyleDark = StyleSheet.create({
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

export const HomeScreenStyleLight = StyleSheet.create({
    ScenarioView: {
        flex: 1,
        flexDirection: "column",
        color: "#fff",
        backgroundColor: "#fff",
        alignContent: "center",
    },

    ScenarioCard: {
        backgroundColor: "#9b9b9bff",
        flexDirection: 'column',
        width: '95%',
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TextColor: {
        color: '#000000ff',
        textAlign: 'center'
    }
})