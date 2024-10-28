import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/colors';

const ClockingListItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <TouchableComponent onPress={props.onPress}>
        <View style={styles.innerContainer}>
          <Text style={styles.index}> #{props.index} </Text>
          <View style={styles.mainContent}>
            <Text style={styles.name} numberOfLines={1}>
              {props.name}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              {props.description}
            </Text>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: Colors.primary4,
    overflow: 'hidden',
    marginBottom: 5,
  },

  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  index: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
    lineHeight: 50,
    color: Colors.light1,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  mainContent: {
    width: '80%',
    paddingTop: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  name: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
    lineHeight: 20,
    color: Colors.light1,
  },

  description: {
    fontFamily: 'poppins-medium-italic',
    fontSize: 16,
    lineHeight: 18,
    color: Colors.light1,
  },
});

export default ClockingListItem;
