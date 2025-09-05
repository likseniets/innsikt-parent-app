import { scenario } from '@/interfaces/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

type Props = { onSelectScenario: (s: scenario) => void };

export default function HomeScreen({ onSelectScenario }: Props) {
  const scenario1: scenario = {
    title: "Fernando",
    description: "Fernando er en drittunge som ikke hører på noe og bare svarer tilbake stygt"
  };
  const scenario2: scenario = {
    title: "John Marcus",
    description: "John Marcus er en lost cause, som er brain rot level 9000, umulig å snakke normalt med."
  };
  const scenario3: scenario = {
    title: "Jesper",
    description: "Jesper er en nerd"
  };

  const scenarioer: scenario[] = [scenario1, scenario2, scenario3];

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

