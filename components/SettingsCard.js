import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CustomButton from './CustomButton';

import Colors from '../utils/colors.js';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name={props.iconName}
          size={25}
          color={Colors.primary5} //"#9E2A2B"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}> {props.title} </Text>
      </View>
      {props.children}
      <View style={styles.actionContainer}>
        <CustomButton
          width={100}
          height={45}
          color={Colors.primary4} //"#9E2A2B"
          pressedColor={Colors.primary5}
          fontSize={18}
          fontColor={Colors.light1} //"#E09F3E"
          title="Cancel"
          action={props.onCancel}
        />
        <CustomButton
          width={160}
          height={45}
          color={Colors.green4} //"#335C67"
          pressedColor={Colors.green5} //"#214751"
          fontSize={18}
          fontColor={Colors.light1} //"#E09F3E"
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
    zIndex: 999,
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
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },

  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default SettingsCard;
