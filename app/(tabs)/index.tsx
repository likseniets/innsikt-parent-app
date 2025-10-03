// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {!isLoggedIn ? (
          <LoginScreen onSuccess={() => setLoggedIn(true)} />
        ) : (
          <HomeScreen />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
