import 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultButton from './components/DefaultButton.js';

export default function App() {
  const [generated, setGenerated] = useState(false);
  const onAddHandler = () => {
    console.log('pressed');
  };

  const onGenerateHandler = () => {
    setGenerated((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text>Welcome, Ruben</Text>
          <Text>Today is 23.09.2024</Text>
        </View>
        <View>
          <Text>You added entries for:</Text>
          <Text>* asdasdad</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <DefaultButton
          width={85}
          height={60}
          color="#9E2A2B"
          pressedColor="#8C2122"
          fontSize={46}
          fontColor="#E09F3E"
          title="+"
          action={onAddHandler}
        />
        <View style={styles.generateContainer}>
          <DefaultButton
            width={205}
            height={60}
            color="#335C67"
            pressedColor="#214751"
            fontSize={20}
            fontColor="#E09F3E"
            title="Generate Excel file"
            action={onGenerateHandler}
          />
          {generated && (
            <Text style={styles.generateText}>
              File generated at location \Documents\ERS_Reports\ERS_092023.xlsx
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  actionsContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  generateContainer: {
    flex: 0.5,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  generateText: {
    fontSize: 14,
    color: '#2C9E2A',
    textAlign: 'center',
  },
});
