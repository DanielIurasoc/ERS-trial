import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CustomButton = (props) => {
  const styles = myStyles(props);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={props.action}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? props.pressedColor : props.color,
          },
          styles.centered,
        ]}
      >
        <Text style={styles.title}> {props.title} </Text>
      </Pressable>
    </View>
  );
};

const myStyles = (props) =>
  StyleSheet.create({
    container: {
      //justifyContent: 'center',
      //alignItems: 'center',
      //borderRadius: 9,
    },

    centered: {
      width: props.width,
      height: props.height,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: 20,
    },

    title: {
      fontSize: props.fontSize,
      color: props.fontColor,
    },
  });

export default CustomButton;
