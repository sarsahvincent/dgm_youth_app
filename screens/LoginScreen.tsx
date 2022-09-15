import { StyleSheet } from 'react-native';
import LoginScreenInfo from '../components/LoginScreenInfo';
import { View } from '../components/Themed';

export default function LoginScreen() {
  return (
    <View style={styles.container}>

      <LoginScreenInfo />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
