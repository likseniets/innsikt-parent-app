import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { authenticateUser } from '../lib/chatApi';
import styles from '../styles/LoginScreenStyle';

type Props = { onSuccess: () => void };

export default function LoginScreen({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async () => {
    try {
      const user = await authenticateUser(email, password);
      console.log('User authenticated:', user);
      const jsonValue = typeof user === 'object' ? JSON.stringify(user) : user;
      await AsyncStorage.setItem('user', jsonValue);
      console.log('Data stored successfully!');
      onSuccess();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Logg inn</Text>
        </Pressable>
      </View>
    </View>
  );
}