import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import Colors from '../utils/colors.js';

const CustomHeader = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo_ERS.png')}
        style={styles.logoImage}
      />
      <Text style={styles.greeting}> Welcome, Ruben! </Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}> Today is </Text>
        <Text style={styles.dateValue}>
          {props.today.getDate() < 10
            ? '0' + props.today.getDate().toString()
            : props.today.getDate()}
          .
          {props.today.getMonth() < 9
            ? '0' + props.today.getMonth().toString() + 1
            : props.today.getMonth() + 1}
          .{props.today.getFullYear()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 0,
  },

  logoImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    maxHeight: 150,
    resizeMode: 'stretch',
    paddingVertical: '0%',
  },

  greeting: {
    fontFamily: 'poppins-medium',
    fontSize: 22,
    paddingTop: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontFamily: 'poppins-300',
    color: Colors.dark,
    fontSize: 18,
    lineHeight: 18,
  },

  dateValue: {
    fontFamily: 'poppins-300',
    color: Colors.primary1,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
  },
});

export default CustomHeader;
