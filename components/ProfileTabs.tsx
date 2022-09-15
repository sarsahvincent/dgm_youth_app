import { Text, View, Dimensions, Pressable } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('screen').width;
interface Props {
  title: string;
  icon: any;
  backgroundColor: string;
  onPress?: () => void;
}
const ProfileTabs = (props: Props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        flex: 1,
        borderRadius: 6,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.4,
        marginHorizontal: 5,
        backgroundColor: props.backgroundColor,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: '#52006A',
      }}
    >
      {props.icon}
      <Text style={{ color: 'white', marginLeft: 10 }}>{props.title}</Text>
    </Pressable>
  );
};

export default ProfileTabs;
