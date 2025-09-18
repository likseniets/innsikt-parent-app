import { scenario } from '@/interfaces/types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

type Props = { onSelectScenario: (s: scenario) => void };

export default function HomeScreen({ onSelectScenario }: Props) {
  const scenario1: scenario = {
    title: "scenario 1",
    description: "Dette er det første scenarioet"
  };
  const scenario2: scenario = {
    title: "scenario 2",
    description: "Dette er det andre scenarioet"
  };
  const scenario3: scenario = {
    title: "scenario 3",
    description: "Dette er det tredje scenarioet"
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

