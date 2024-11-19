import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import Colors from '../utils/colors';

const DetailsEditCard = (props) => {
  const styles = myStyles(props.defaultColor, props.vertical, props.label);
  const TextInputRef = useRef(null);

  return (
    <Pressable
      onPress={() => TextInputRef.current?.focus()}
      style={styles.container}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.insideContainer,
            {
              borderColor: pressed ? props.pressedColor : props.defaultColor,
            },
          ]}
        >
          <Text style={styles.label} numberOfLines={1}>
            {props.label}
          </Text>
          <TextInput
            ref={TextInputRef}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.action}
            onEndEditing={props.onEndEditing}
            {...props}
            style={[
              styles.textInput,
              {
                color: pressed ? props.pressedColor : props.defaultColor,
              },
            ]}
          />
        </View>
      )}
    </Pressable>
  );
};

const myStyles = (defaultColor, vertical, label) =>
  StyleSheet.create({
    container: {
      width: vertical
        ? label === 'Description'
          ? Dimensions.get('window').width * 0.933
          : Dimensions.get('window').width * 0.45
        : Dimensions.get('window').width * 0.933,
      marginVertical: 10,
    },

    insideContainer: {
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: vertical ? 0 : 15,
      flexDirection: vertical ? 'column' : 'row',
      justifyContent: vertical ? 'center' : 'flex-start',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: defaultColor,
      borderWidth: 2,
    },

    label: {
      fontFamily: 'poppins-regular',
      fontSize: 16,
      color: Colors.dark,
    },

    textInput: {
      textAlign: vertical ? 'center' : 'left',
      fontFamily: 'poppins-regular',
      fontSize: 16,
      color: defaultColor,
      width: vertical ? '100%' : '75%',
    },
  });

export default DetailsEditCard;
