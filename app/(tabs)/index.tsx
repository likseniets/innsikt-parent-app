import { Button, StyleSheet } from 'react-native';

import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <View>
      {!isLoggedIn ? (
        <View>
          <Text>login</Text>
          <Button
            onPress={() => setLoggedIn(true)}
            title="Login"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        ): (
        <View>
          <Text>logged in</Text>
        </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
});
