// app/(tabs)/index.tsx
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';

export default function Index() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const retrieveData = async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null; // Parse back to object/array
      } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
      }
    };
    const checkLoginStatus = async () => {
      const userData = await retrieveData('user');
      setLoggedIn(!!userData);
    };
    checkLoginStatus();
  }, []);

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
