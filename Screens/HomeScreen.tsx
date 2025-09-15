
import { scenario } from '@/interfaces/types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

const HomeScreen = () => {
    const scenario1: scenario = {
        title: "Scenario 1",
        description: "Scenario 1 description"
    }
    const scenario2: scenario = {
        title: "Scenario 2",
        description: "Scenario 2 description"
    }
    const scenario3: scenario = {
        title: "Scenario 3",
        description: "Scenario 3 description"
    }
    const scenarioer: scenario[] = [scenario1, scenario2, scenario3];
    const [currentScenario, setCurrentScenario] = useState<scenario>();
  return (
    <View style={HomeScreenStyle.ScenarioView}>
        {scenarioer && scenarioer.length > 0 && scenarioer.map(scenario => (
            <View style={HomeScreenStyle.ScenarioCard} key={scenario.title} onTouchEnd={() => setCurrentScenario(scenario)}>
                <Text style={HomeScreenStyle.TextColor}>{scenario.title}</Text>
                <Text style={HomeScreenStyle.TextColor}>{scenario.description}</Text>
            </View>
        ))}
        {currentScenario ? (
            <View style={HomeScreenStyle.ScenarioCard}>
                <Text style={HomeScreenStyle.TextColor}>{currentScenario.title}</Text>
                <Text style={HomeScreenStyle.TextColor}>{currentScenario.description}</Text>
            </View>
        ) : (
            <View>
            </View>
        )
        }
        
    </View>
  );
}

export default HomeScreen;
