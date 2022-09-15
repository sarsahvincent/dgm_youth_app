import { StyleSheet } from 'react-native';
import WelcomeScreenInfo from '../components/WelcomeScreenInfo';
import { View } from '../components/Themed';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <WelcomeScreenInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
