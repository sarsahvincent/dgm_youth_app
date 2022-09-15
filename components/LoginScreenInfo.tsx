import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';

const LoginScreenInfo = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Root');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.welcomeContainer}>
            <View style={styles.loginContainer}>
              <Text style={styles.loginInfoTextHeader}>Sign In</Text>
              <Text style={styles.loginInfoText}>
                Please Login to your account
              </Text>
            </View>
            <View style={styles.loginContainer}>
              <TextInput
                placeholder='Enter email'
                keyboardType='email-address'
                style={styles.loginInput}
              />
              <TextInput
                placeholder='Enter password'
                keyboardType='default'
                secureTextEntry
                style={styles.loginInput}
              />
              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomButton
                  onPress={handleLogin}
                  title='Login'
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default LoginScreenInfo;

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
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginInfoTextHeader: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#63666A',
  },
  loginInfoText: {
    color: 'grey',
    fontSize: 20,
  },
  loginInput: {
    height: 40,
    width: 200,
    borderBottomWidth: 1,
    borderColor: 'purple',
    marginVertical: 6,
  },
});
