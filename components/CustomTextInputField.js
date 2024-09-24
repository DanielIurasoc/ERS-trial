import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTextInputField = ({ label, ...inputProps }) => {
  const TextInputRef = useRef(null);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => TextInputRef.current?.focus()}
        style={({ pressed }) => [
          styles.input,
          {
            borderColor: pressed ? '#EECECF' : '#8C2122',
          },
        ]}
      >
        {({ pressed }) => (
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: pressed ? '#EECECF' : '#8C2122',
                },
              ]}
            >
              {label}
            </Text>
            <View style={styles.insideContainer}>
              <TextInput
                ref={TextInputRef}
                placeholder={inputProps.placeholder}
                value={inputProps.value}
                onChangeText={inputProps.action}
                {...inputProps}
                style={[
                  styles.textInput,
                  {
                    color: pressed ? '#ccc' : '#000',
                  },
                ]}
              />
              <MaterialCommunityIcon
                name={inputProps.iconName}
                size={40}
                color={pressed ? '#EECECF' : '#8C2122'}
              />
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 2,
    margin: 10,
    position: 'relative',
  },

  label: {
    fontSize: 18,
    fontWeight: '700',
    position: 'absolute',
    top: -20,
    left: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    color: '#8C2122',
    zIndex: 1,
  },

  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 3,
    borderColor: '#8C2122',
    borderRadius: 20,
    //zIndex: 0,
  },

  insideContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  textInput: {
    width: '80%',
    height: 30,
    paddingVertical: 0,
    paddingLeft: 5,
    // borderColor: '#000',
    // borderWidth: 1,
  },
});

export default CustomTextInputField;
