import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomListItem = (props) => {
  return (
    <View style={styles.container}>
      <Text> {props.counter}. </Text>
      <Text> {props.content} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default CustomListItem;
