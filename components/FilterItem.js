import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../utils/colors';

const FilterItem = (props) => {
  const styles = myStyles(props.enabled);
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {/* <View style={styles.container}> */}
      <Text> {props.name} </Text>
      {/* </View> */}
    </Pressable>
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
