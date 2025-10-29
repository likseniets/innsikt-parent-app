import { scenario } from '@/interfaces/types';
import { getScenarios } from '@/lib/chatApi';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

export default function HomeScreen() {
  const [scenarios, setScenarios] = useState<scenario[]>([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const scenarios = await getScenarios();
        setScenarios(scenarios);
        console.log('Fetched scenarios:', scenarios);
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    };
    fetchScenarios();
  }, []);

  const goToChatbot = (s: scenario) => {
    router.push({
      pathname: '/chatbot',
      params: {
        scenarioId: String(s.id),
        title: s.title,
        description: s.description,
      },
    });
  };

  return (
    <View style={HomeScreenStyle.ScenarioView}>
      {scenarios.map((s) => (
        <Pressable
          key={s.id}
          style={HomeScreenStyle.ScenarioCard}
          onPress={() => goToChatbot(s)}
        >
          <Text style={HomeScreenStyle.TextColor}>{s.title}</Text>
          <Text style={HomeScreenStyle.TextColor}>{s.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}
