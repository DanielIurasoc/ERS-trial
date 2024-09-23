import './gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './utils/navigation.js';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
