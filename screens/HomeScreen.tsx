import { scenario } from '@/interfaces/types';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

// Liten lokal utvidelse med id for navigasjon
type ScenarioWithId = scenario & { id: number };

export default function HomeScreen() {
  const scenario1: ScenarioWithId = {
    id: 1,
    title: 'Scenario 1',
    description:
      'Jesper er en gutt på 9 år. Han har opplevd noe vanskelig i friminuttet og det er din jobb å finne ut av hva som har skjedd.',
  };
  const scenario2: ScenarioWithId = {
    id: 2,
    title: 'Scenario 2',
    description: 'Scenario 2 description',
  };
  const scenario3: ScenarioWithId = {
    id: 3,
    title: 'Scenario 3',
    description: 'Scenario 3 description',
  };

  const scenarioer: ScenarioWithId[] = [scenario1, scenario2, scenario3];

  const goToChatbot = (s: ScenarioWithId) => {
    router.push({
      pathname: '/chatbot',
      params: {
        scenarioId: String(s.id),   // 👈 viktig for backend
        title: s.title,
        description: s.description,
      },
    });
  };

  return (
    <View style={HomeScreenStyle.ScenarioView}>
      {scenarioer.map((s) => (
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
