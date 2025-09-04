import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      {!isLoggedIn ? (
        <SafeAreaView style={{ flex: 1 }}>
          <LoginScreen onSuccess={() => setLoggedIn(true)} />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <HomeScreen />
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
