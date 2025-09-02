
import { scenario } from '@/interfaces/types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const HomeScreen = () => {
    const scenario1: scenario = {
        title: "yo1",
        description: "banger"
    }
    const scenario2: scenario = {
        title: "yo2",
        description: "banger"
    }
    const scenario3: scenario = {
        title: "yo3",
        description: "banger"
    }
    const scenarioer: scenario[] = [scenario1, scenario2, scenario3];
    const [currentScenario, setCurrentScenario] = useState("none");
  return (
    <View>
        {scenarioer && scenarioer.length > 0 && scenarioer.map(scenario => (
            <View key={scenario.title} onTouchEnd={() => setCurrentScenario(scenario.title)}>
                <Text>{scenario.title}</Text>
                <Text>{scenario.description}</Text>
            </View>
        ))}
        <Text>{currentScenario}</Text>
    </View>
  );
}

export default HomeScreen;
