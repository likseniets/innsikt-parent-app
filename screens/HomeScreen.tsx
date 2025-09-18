import { scenario } from "@/interfaces/types";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { HomeScreenStyle } from "../styles/HomeScreenStyle";

const HomeScreen = () => {
  const scenario1: scenario = {
    title: "Scenario 1",
    description: "hei hei",
  };
  const scenario2: scenario = {
    title: "Scenario 2",
    description: "hei på deg",
  };
  const scenario3: scenario = {
    title: "Scenario 3",
    description: "hvordan går det",
  };
  const scenarioer: scenario[] = [scenario1, scenario2, scenario3];
  return (
    <View style={HomeScreenStyle.ScenarioView}>
      {scenarioer &&
        scenarioer.length > 0 &&
        scenarioer.map((scenario) => (
          <View
            style={HomeScreenStyle.ScenarioCard}
            key={scenario.title}
            onTouchEnd={() =>
              router.push({
                pathname: "/chatbot",
                params: {
                  title: scenario.title,
                  description: scenario.description,
                },
              })
            }
          >
            <Text style={HomeScreenStyle.TextColor}>{scenario.title}</Text>
            <Text style={HomeScreenStyle.TextColor}>
              {scenario.description}
            </Text>
          </View>
        ))}
    </View>
  );
};

export default HomeScreen;
