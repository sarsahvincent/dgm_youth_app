import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
interface Props {
  title: string;
  value: string;
}

const ProfileDetails = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 18, color: 'purple' }}>
        {props.title}
      </Text>
      <Text style={{ fontWeight: '400', fontSize: 16, color: '#63666A' }}>
        {props.value}
      </Text>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
