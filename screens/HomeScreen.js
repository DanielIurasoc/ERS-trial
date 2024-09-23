import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

import DefaultButton from '../components/CustomButton.js';
import CustomListItem from '../components/CustomListItem.js';

const employees = [
  {
    id: 'eid001',
    name: 'John Cena',
  },
  {
    id: 'eid002',
    name: 'Matthew McConnaghay',
  },
  {
    id: 'eid003',
    name: 'Sir Alex Ferguson',
  },
];

const HomeScreen = (props) => {
  const [generated, setGenerated] = useState(false);
  const onAddHandler = () => {
    props.navigation.navigate('AddEntry');
  };

  const onGenerateHandler = () => {
    setGenerated((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 0.5 }}>
          <Text>Welcome, Ruben</Text>
          <Text>Today is 23.09.2024</Text>
        </View>
        <View>
          <SafeAreaView style={styles.employeesList}>
            <Text>You added entries for:</Text>
            <FlatList
              data={employees}
              renderItem={(itemData) => (
                <CustomListItem
                  counter={itemData.index + 1}
                  content={itemData.item.name}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <DefaultButton
          width={85}
          height={60}
          color="#9E2A2B"
          pressedColor="#8C2122"
          fontSize={40}
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
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  employeesList: {
    flex: 0.5,
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
