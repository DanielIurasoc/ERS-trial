import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DefaultButton from '../components/CustomButton.js';

const AddScreen = (props) => {
  const onConfirmHandler = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text> Add Screen </Text>
      <DefaultButton
        width={120}
        height={45}
        color="#335C67"
        pressedColor="#214751"
        fontSize={18}
        fontColor="#E09F3E"
        title="Add Entry"
        action={onConfirmHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddScreen;
