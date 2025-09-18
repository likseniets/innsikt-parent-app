import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackgroundStyle from '@/styles/BackgroundStyle';

export default function HistoryScreen() {
  return (
    <BackgroundStyle>
      <View style={s.container}>
        <Text style={s.title}>Historikk</Text>
        <Text style={s.subtitle}>Ingen historikk enda.</Text>
        <Text style={s.helper}>
          Når du fullfører et scenario, kan vi lagre det her.
        </Text>
      </View>
    </BackgroundStyle>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#eaeaea',
  },
  helper: {
    marginTop: 8,
    fontSize: 13,
    color: '#b3b3b3',
  },
});
