import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../utils/colors';

const DetailsCard = (props) => {
  const styles = myStyles(props.borderColor, props.vertical, props.label);
  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        {props.label}
      </Text>
      <Text style={styles.content} numberOfLines={1}>
        {props.content}
      </Text>
    </View>
  );
};

const myStyles = (borderColor, vertical, label) =>
  StyleSheet.create({
    container: {
      width: vertical
        ? label === 'Description'
          ? Dimensions.get('window').width * 0.933
          : Dimensions.get('window').width * 0.45
        : Dimensions.get('window').width * 0.933,
      flexDirection: vertical ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: borderColor,
      borderWidth: 2,
      paddingVertical: 10,
      marginVertical: 10,
    },

    label: {
      fontFamily: 'poppins-regular',
      fontSize: 16,
      color: Colors.dark,
    },

    content: {
      fontFamily: 'poppins-regular',
      fontSize: 16,
      color: borderColor,
    },
  });

export default DetailsCard;
