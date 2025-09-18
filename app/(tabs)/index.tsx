// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import FeedbackScreen from '../../Screens/FeedbackScreen';
import HomeScreen from '../../Screens/HomeScreen';
import LoginScreen from '../../Screens/LoginScreen';
import type { scenario } from '../../interfaces/types'; 

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<scenario | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {!isLoggedIn ? (
          <LoginScreen onSuccess={() => setLoggedIn(true)} />
        ) : selectedScenario ? (
          <FeedbackScreen
            title={selectedScenario.title}          
            onBack={() => setSelectedScenario(null)}
          />
        ) : (
          <HomeScreen onSelectScenario={setSelectedScenario} />  
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

