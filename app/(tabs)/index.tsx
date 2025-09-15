import { StyleSheet } from "react-native";

import HomeScreen from "@/Screens/HomeScreen";
import { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email == "test" && password === "1234") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("wrong password or email");
    }
  };

  return (
    <SafeAreaProvider>
      {!isLoggedIn ? (
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>Login</Text>

          {error && <Text style={styles.error}>{error}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Logg inn</Text>
          </Pressable>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.viewSize}>
          <HomeScreen />
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  form: { gap: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#841584",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  error: { color: "red", marginBottom: 8 },
  center: { alignItems: "center", gap: 12 },
  viewSize: {
    height: "100%",
  },
});
