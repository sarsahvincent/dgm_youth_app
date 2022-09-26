import { StyleSheet } from 'react-native';

import ViewProfileComponent from '../components/ViewProfileComponent';
import { View } from '../components/Themed';

export default function ViewProfileScreen() {
  return (
    <View style={styles.container}>
      <ViewProfileComponent />
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
