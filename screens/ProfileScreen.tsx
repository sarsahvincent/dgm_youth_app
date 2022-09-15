import { StyleSheet } from 'react-native';

import ProfileComponent from '../components/ProfileComponent';
import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#E6EFF8',
  },
});
