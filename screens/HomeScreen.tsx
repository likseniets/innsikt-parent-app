import { scenario } from '@/interfaces/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

type Props = { onSelectScenario: (s: scenario) => void };

export default function HomeScreen({ onSelectScenario }: Props) {
  const scenario1: scenario = {
    title: "Scenario 1",
    description: "Scenario 1 description"
  };
  const scenario2: scenario = {
    title: "Scenario 2",
    description: "Scenario 2 description"
  };
  const scenario3: scenario = {
    title: "Scenario 3",
    description: "Scenario 3 description"
  };

  const scenarioer: scenario[] = [scenario1, scenario2, scenario3];

  // Hvis du trenger å lagre valgt scenario lokalt:
  // const [currentScenario, setCurrentScenario] = useState<scenario>();

  return (
    <View style={HomeScreenStyle.ScenarioView}>
      {scenarioer.map((s) => (
        <Pressable
          key={s.title}
          style={HomeScreenStyle.ScenarioCard}
          onPress={() => onSelectScenario(s)}
        >
          <Text style={HomeScreenStyle.TextColor}>{s.title}</Text>
          <Text style={HomeScreenStyle.TextColor}>{s.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}

