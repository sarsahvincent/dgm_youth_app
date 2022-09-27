import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
interface Props {
  onPress: () => void;
  photo: boolean;
  name: string;
  sex: string;
  phone: string;
  email: string;
  address: string;
}

const DashboardProfileSummary = (props: Props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 16,
            }}
          >
            {props.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            Sex : <Text style={{ color: '#ABB0B8' }}>{props.sex}</Text>{' '}
          </Text>
          <Text
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            Phone : <Text style={{ color: '#ABB0B8' }}>{props.phone}</Text>{' '}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            Email :<Text style={{ color: '#ABB0B8' }}>{props.email}</Text>
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              fontWeight: '600',
              marginVertical: 6,
              color: 'purple',
              fontSize: 14,
            }}
          >
            Address : <Text style={{ color: '#ABB0B8' }}>{props.address}</Text>
          </Text>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 50 }}
            source={{ uri: `${props.photo}` }}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DashboardProfileSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    width: 300,
    height: 180,
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
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
    width: '100%',
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: 'purple',
    borderRadius: 50,
  },
});
