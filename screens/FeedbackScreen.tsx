import React from 'react';
import { Button, Text, View } from 'react-native';
import BackgroundStyle from '@/styles/BackgroundStyle';
import styles from '@/styles/FeedbackScreenStyle';

export default function FeedbackScreen({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <BackgroundStyle>
      <View style={styles.container}>
        <Text style={styles.title}>
          Feedback for {title}
        </Text>
        <Button title="Tilbake" onPress={onBack} />
      </View>
    </BackgroundStyle>
  );
}

