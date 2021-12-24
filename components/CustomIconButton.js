import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomIconButton = (props) => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      android_ripple={{ color: '#00000050' }}
      style={({ pressed }) => [
          { backgroundColor: pressed ? '#dddddd' : props.color },
          styles.button,
          { ...props.style }
      ]}
    >
      <Icon name={props.name} size={props.size} color={props.color}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    
    button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
    },
})

export default CustomIconButton;