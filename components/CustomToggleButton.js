import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Pressable,
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Colors from '../utils/colors';

const CustomToggleButton = (props) => {
  const [togglePressed, setTogglePressed] = useState(false);
  const [toggleText, setToggleText] = useState('Full day');
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleHandler = () => {
    setTogglePressed((prev) => !prev);
    props.onPress(togglePressed ? 8 : 4);
  };

  // animation
  useEffect(() => {
    // update toggle text in the middle of the animation
    const toggleTextUpdateTimeout = setTimeout(() => {
      setToggleText(togglePressed ? 'Half day' : 'Full day');
    }, 150);

    Animated.timing(slideAnim, {
      toValue: togglePressed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // clear the timeout on cleanup
    return () => clearTimeout(toggleTextUpdateTimeout);
  }, [togglePressed]);

  // calculate the animated slider position
  const sliderPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').width * 0.388],
  });

  return (
    <Pressable onPress={toggleHandler} style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX: sliderPosition }] },
            {
              backgroundColor: Colors.primary5,
            },
          ]}
        >
          <Text style={styles.optionText}>{toggleText}</Text>
        </Animated.View>
        <View style={styles.optionContainer}>
          <Text
            style={[
              styles.optionText,
              togglePressed ? styles.activeText : styles.inactiveText,
            ]}
          >
            Full-day
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <Text
            style={[
              styles.optionText,
              togglePressed ? styles.inactiveText : styles.activeText,
            ]}
          >
            Half-day
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //   paddingVertical: 2,
    marginTop: 8,
    marginBottom: 8,
  },

  background: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.primary5,
    overflow: 'hidden',
    paddingVertical: 2,
  },

  slider: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
    width: Dimensions.get('window').width * 0.38,
    height: '100%',
    borderRadius: 15,
    backgroundColor: Colors.light1,
  },

  optionContainer: {
    width: Dimensions.get('window').width * 0.38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 8,
  },

  // option1Container: {
  //   width: Dimensions.get('window').width * 0.38,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   //   borderRadius: 15,
  //   //   borderTopLeftRadius: 15,
  //   //   borderBottomLeftRadius: 15,
  //   paddingVertical: 8,
  //   //   backgroundColor: togglePressed ? Colors.light1 : Colors.primary5,
  // },

  // option2Container: {
  //   width: Dimensions.get('window').width * 0.38,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   //   borderRadius: 15,
  //   //   borderTopRightRadius: 15,
  //   //   borderBottomRightRadius: 15,
  //   paddingVertical: 8,
  //   //   backgroundColor: togglePressed ? Colors.primary5 : Colors.light1,
  // },

  optionText: {
    fontFamily: 'poppins-medium',
    fontSize: 20,
    color: Colors.light1,
  },

  activeText: {
    color: Colors.primary5,
  },

  inactiveText: {
    color: Colors.light1,
  },
});

export default CustomToggleButton;
