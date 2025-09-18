import React from 'react';
import { Text, View } from 'react-native';
import BackgroundStyle from '@/styles/BackgroundStyle';
import styles from '@/styles/HistoryScreenStyle';

export default function HistoryScreen() {
  return (
    <BackgroundStyle>
      <View style={styles.container}>
        <Text style={styles.title}>Historikk</Text>
        <Text style={styles.subtitle}>Ingen historikk enda.</Text>
        <Text style={styles.helper}>
          Når du fullfører et scenario, kan vi lagre det her.
        </Text>
      </View>
    </BackgroundStyle>
  );
}
