import { scenario } from '@/interfaces/types';
import { router } from 'expo-router';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { HomeScreenStyleDark, HomeScreenStyleLight } from '../styles/HomeScreenStyle';

export default function HomeScreen() {
  let colorScheme = useColorScheme();
  const scenario1: scenario = {
    title: 'Scenario 1',
    description: 'Scenario 1 description',
  };
  const scenario2: scenario = {
    title: 'Scenario 2',
    description: 'Scenario 2 description',
  };
  const scenario3: scenario = {
    title: 'Scenario 3',
    description: 'Scenario 3 description',
  };

  const scenarioer: scenario[] = [scenario1, scenario2, scenario3];

  const goToChatbot = (s: scenario) => {
    router.push({
      pathname: '/chatbot',
      params: { title: s.title, description: s.description },
    });
  };

   const HomeScreenStyle = colorScheme === 'light' ? HomeScreenStyleLight : HomeScreenStyleDark;

  return (
    <View style={HomeScreenStyle.ScenarioView}>
      {scenarioer.map((s) => (
        <Pressable
          key={s.title}
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

