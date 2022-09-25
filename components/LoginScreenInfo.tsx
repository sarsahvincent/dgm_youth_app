import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useContext } from 'react';
import CustomButton from './CustomButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { UserContext } from '../context/AuthContext';

const LoginScreenInfo = () => {
  const { setUid } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Allert', 'All fields are required.', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    } else {
      try {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUid(result?.user?.uid);
        setPassword('');
        setEmail('');
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        if (
          err.message === 'Firebase: Error (auth/user-not-found).' ||
          err.message === 'Firebase: Error (auth/wrong-password).'
        ) {
          Alert.alert('Error', 'Invalid Email or Password', [
            {
              text: 'Cancel',

              style: 'cancel',
            },
            { text: 'OK' },
          ]);
        } else if (err.message === 'Firebase: Error (auth/timeout).') {
          Alert.alert('Error', 'Network  error! Please try again', [
            {
              text: 'Cancel',

              style: 'cancel',
            },
            { text: 'OK' },
          ]);
        } else if (
          err.message ===
          'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
        ) {
          Alert.alert(
            'Error',
            'Your Account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            [
              {
                text: 'Cancel',

                style: 'cancel',
              },
              { text: 'OK' },
            ]
          );
        } else {
          Alert.alert('Error', err.message, [
            {
              text: 'Cancel',

              style: 'cancel',
            },
            { text: 'OK' },
          ]);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/login.png')}
          resizeMode='cover'
          style={styles.image}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.welcomeContainer}>
              <View style={styles.loginContainer}>
                <Text style={styles.welcomeText}>
                  WE ARE THE FUTURE HOPE !!!
                </Text>

                <Text style={styles.loginInfoTextHeader}>Sign In</Text>
                <Text style={styles.loginInfoText}>
                  Please Login to your account
                </Text>
              </View>
              <View style={styles.loginContainer}>
                <TextInput
                  value={email}
                  placeholderTextColor={'purple'}
                  placeholder='Enter email'
                  keyboardType='email-address'
                  style={styles.loginInput}
                  onChangeText={setEmail}
                />

                <TextInput
                  onChangeText={setPassword}
                  placeholderTextColor={'purple'}
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
                    onPress={handleSubmit}
                    title='Login'
                    loading={loading}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
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
    color: 'purple',
  },
  loginInfoText: {
    color: 'purple',
    fontSize: 20,
  },
  loginInput: {
    height: 40,
    width: 200,
    borderBottomWidth: 1,
    borderColor: 'purple',
    marginVertical: 6,
    fontSize: 12,
    color: 'purple',
  },

  welcomeText: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 50,
  },
});
