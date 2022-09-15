import {
  Pressable,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';

interface Props {
  onPress: () => void;
}
const getWidth = Dimensions.get('screen').width;
const SearchProfileSummary = (props: Props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 16,
            }}
          >
            Vincent Sarsah
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 16,
            }}
          >
            Role : <Text style={{ color: '#ABB0B8' }}>President</Text>{' '}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 16,
            }}
          >
            Phone : <Text style={{ color: '#ABB0B8' }}>23345678</Text>{' '}
          </Text>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 50 }}
            source={require('../assets/images/contact2.jpg')}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SearchProfileSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 120,
    marginTop: 20,
    widthborderRadius: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    width: getWidth * 0.9,
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 50,
  },
});
