import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  SafeAreaView1: { backgroundColor: '#FFF', flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: '#FFF' },
  button: {
    backgroundColor: '#304ffe',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noItem: {
    alignItems: 'center'
  }
});
