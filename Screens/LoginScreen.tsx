import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styles from '../styles/LoginScreenStyle';

export default function LoginScreen() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' && password === '1234') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('wrong password or email');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Logg inn</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.title}>Logget inn som {email}</Text>
          <Pressable style={styles.button} onPress={() => setLoggedIn(false)}>
            <Text style={styles.buttonText}>Logg ut</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
