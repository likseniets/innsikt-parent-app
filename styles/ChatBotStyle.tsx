import { StyleSheet } from 'react-native';

export const ChatBotStyle = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: { color: '#E5E7EB', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#9CA3AF', marginBottom: 8 },

  chatContainer: { flex: 1 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: '85%',
  },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#2563EB' },
  assistantMessage: { alignSelf: 'flex-start', backgroundColor: '#374151' },
  systemMessage: { alignSelf: 'center', backgroundColor: '#111827' },
  messageText: { color: '#F9FAFB' },

  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#E5E7EB' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1f3030',
    backgroundColor: '#0b2020',
    color: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
  },
});

