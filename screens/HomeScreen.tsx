import { StyleSheet } from 'react-native';
import HomeScreenComponent from '../components/HomeScreenComponent';
import { View } from '../components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeScreenComponent />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
