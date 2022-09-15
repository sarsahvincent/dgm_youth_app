import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';

const WelcomeScreenInfo = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/welcome.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>WE ARE THE FUTURE HOPE !!!</Text>
          <CustomButton onPress={handleLogin} title='Login' />
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreenInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
