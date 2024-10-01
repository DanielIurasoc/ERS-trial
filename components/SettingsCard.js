import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CustomButton from './CustomButton';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name={props.iconName}
          size={25}
          color="#9E2A2B"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}> {props.title} </Text>
      </View>
      {props.children}
      <View style={styles.actionContainer}>
        <CustomButton
          width={100}
          height={45}
          color="#9E2A2B"
          pressedColor="#8C2122"
          fontSize={18}
          fontColor="#E09F3E"
          title="Cancel"
          action={props.onCancel}
        />
        <CustomButton
          width={160}
          height={45}
          color="#335C67"
          pressedColor="#214751"
          fontSize={18}
          fontColor="#E09F3E"
          title={props.confirmText}
          action={props.onConfirm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 200,
    maxHeight: Dimensions.get('window').height * 0.3,
    width: '90%',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 18,
  },

  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default SettingsCard;
