import React from 'react';
import { Button, Text, View } from 'react-native';

export default function FeedbackScreen({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>
        Feedback for {title} 
      </Text>
      <Button title="Tilbake" onPress={onBack} />
    </View>
  );
}

