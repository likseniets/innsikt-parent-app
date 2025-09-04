// app/(tabs)/index.tsx

import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);

    return (
  <SafeAreaProvider>
    {!isLoggedIn ? (
      <SafeAreaView>
        <LoginScreen />
      </SafeAreaView>
    ) : (
        <SafeAreaView>
          <HomeScreen />
        </SafeAreaView>
        )
      }
    </SafeAreaProvider>
  );
}
