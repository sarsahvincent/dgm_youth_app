import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import { FontAwesome, Octicons, Feather } from '@expo/vector-icons';

const screenHeight = Dimensions.get('screen').height;
const ViewProfileComponent = () => {
  const handleEditProfile = () => {};
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#E6EFF8', alignItems: 'center' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>VINCENT ANDOH SARSAH ..</Text>
          <Pressable>
            <Feather size={20} name='edit-3' color='white' />
          </Pressable>
        </View>

        <Image
          style={styles.image}
          source={require('../assets/images/contact2.jpg')}
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProfileTabs
            title='7/12'
            icon={<FontAwesome size={20} name='money' color='white' />}
            backgroundColor='green'
          />
          <ProfileTabs
            title='Singing'
            icon={<Octicons size={20} name='organization' color='white' />}
            backgroundColor='purple'
          />
          <ProfileTabs
            title='10'
            icon={<Feather size={20} name='user-plus' color='white' />}
            backgroundColor='#7a00cc'
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileDetails title='First Name' value='Music' />
        <ProfileDetails title='Last Name' value='Music' />
        <ProfileDetails title='Middle Name' value='Music' />
        <ProfileDetails title='Role ' value='Music' />
        <ProfileDetails title='Email ' value='Music' />
        <ProfileDetails title='Phone ' value='Music' />
        <ProfileDetails title='Age ' value='Music' />
        <ProfileDetails title='Starus ' value='Music' />
        <ProfileDetails title='Salutation ' value='Music' />
        <ProfileDetails title='Gender' value='Music' />
        <ProfileDetails title='Membership Status' value='Music' />
        <ProfileDetails title='Occupation' value='Music' />
        <ProfileDetails title='Address' value='Music' />
        <ProfileDetails title='City' value='Music' />
        <ProfileDetails title='E. C. Name' value='Music' />
        <ProfileDetails title='Emergency Contact' value='Music' />
        <ProfileDetails title='Baptize' value='Music' />
      </ScrollView>
    </View>
  );
};

export default ViewProfileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    width: '100%',
  },

  image: {
    width: '100%',
    height: screenHeight * 0.3,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    height: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    shadowColor: '#52006A',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
