import React from 'react';
import { Button, Text, View } from 'react-native';
import BackgroundStyle from '@/styles/BackgroundStyle';

export default function FeedbackScreen({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <BackgroundStyle>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>
          Feedback for {title}
        </Text>
        <Button title="Tilbake" onPress={onBack} />
      </View>
    </BackgroundStyle>
  );
}

