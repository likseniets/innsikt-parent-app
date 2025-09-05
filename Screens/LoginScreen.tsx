import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from '../styles/LoginScreenStyle';

type Props = { onSuccess: () => void };

export default function LoginScreen({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'testexample.com' && password === '1234') {
      setError('');
      onSuccess(); // tell parent we’re logged in
    } else {
      setError('wrong password or email');
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