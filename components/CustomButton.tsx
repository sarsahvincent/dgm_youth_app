import React from 'react';
import { Pressable, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}
function CustomButton(props: Props) {
  if (props.loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" />
    )
  } else
    return (
      <Pressable onPress={props.onPress} style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    height: 40,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    shadowColor: '#52006A'
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  }
})