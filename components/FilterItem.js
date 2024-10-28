import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/colors';

const FilterItem = (props) => {
  const styles = myStyles(props.enabled);
  return (
    <View style={styles.container}>
      <Text> {props.name} </Text>
    </View>
  );
};

const myStyles = (enabled) =>
  StyleSheet.create({
    container: {
      // width: 100,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: enabled ? Colors.light3 : Colors.light2,
      paddingHorizontal: 10,
      marginRight: 5,
    },
  });

export default FilterItem;
