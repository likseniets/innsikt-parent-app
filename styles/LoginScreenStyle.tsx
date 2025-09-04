import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },

  form: {
    gap: 12,
    backgroundColor: '#a4b0ef',
    borderWidth: 1,
    borderColor: '#1f3030',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  // darker title for contrast on the light card
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6, color: '#0b2020' },

  input: {
    borderWidth: 1,
    borderColor: '#1f3030',
    backgroundColor: '#0b2020',
    color: '#e5e7eb',
    padding: 12,
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },

  error: { color: 'red', marginBottom: 8 },

  center: { alignItems: 'center', gap: 12 },
});

export default styles;
