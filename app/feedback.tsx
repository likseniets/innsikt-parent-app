import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import FeedbackScreen from '@/screens/FeedbackScreen';

export default function FeedbackRoute() {
  const params = useLocalSearchParams<{ title?: string }>();
  const title = params?.title ? String(params.title) : 'Tilbakemelding';

  return (
    <FeedbackScreen
      title={title}
      onBack={() => {
        // Gå tilbake til tabs-hjem etter feedback
        router.replace('/(tabs)');
      }}
    />
  );
}

