import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useContext } from 'react';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import { FontAwesome, Octicons, Feather } from '@expo/vector-icons';
import { UserContext } from '../context/AuthContext';
import { getUserRole } from '../utils/Role';

const screenHeight = Dimensions.get('screen').height;
const ProfileComponent = () => {
  const { getUserDetails, setUid } = useContext(UserContext);
  const handleEditProfile = () => {};

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#E6EFF8', alignItems: 'center' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{getUserDetails.fullName}</Text>
          <Pressable>
            <Feather size={20} name='edit-3' color='white' />
          </Pressable>
          <Pressable
            onPress={() => {
              setUid(null);
            }}
          >
            <Feather size={20} name='log-out' color='white' />
          </Pressable>
        </View>

        <Image
          style={styles.image}
          source={{ uri: `${getUserDetails?.avatar}` }}
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProfileTabs
            title={`${getUserDetails.dues}/12`}
            icon={<FontAwesome size={20} name='money' color='white' />}
            backgroundColor='green'
          />
          <ProfileTabs
            title={getUserDetails.department}
            icon={<Octicons size={20} name='organization' color='white' />}
            backgroundColor='purple'
          />
          <ProfileTabs
            title={getUserDetails.soulsWon}
            icon={<Feather size={20} name='user-plus' color='white' />}
            backgroundColor='#7a00cc'
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileDetails title='First Name' value={getUserDetails?.firstName} />
        <ProfileDetails title='Last Name' value={getUserDetails?.lastName} />
        <ProfileDetails
          title='Middle Name'
          value={getUserDetails?.middleName}
        />
        <ProfileDetails
          title='Role '
          value={getUserRole(getUserDetails?.role)}
        />
        <ProfileDetails title='Email ' value={getUserDetails?.email} />
        <ProfileDetails title='Phone ' value={getUserDetails?.phone} />
        <ProfileDetails title='Age ' value={getUserDetails?.age} />
        <ProfileDetails title='Status ' value={getUserDetails?.status} />
        <ProfileDetails
          title='Salutation '
          value={getUserDetails?.salutation}
        />
        <ProfileDetails title='Gender' value={getUserDetails?.sex} />
        <ProfileDetails
          title='Membership Status'
          value={getUserDetails?.membershipStatus}
        />
        <ProfileDetails
          title='Marital Status'
          value={getUserDetails?.maritalStatus}
        />
        <ProfileDetails title='Occupation' value={getUserDetails?.occupation} />
        <ProfileDetails title='Address' value={getUserDetails?.address} />
        <ProfileDetails title='City' value={getUserDetails?.city} />
        <ProfileDetails
          title='E. C. Name'
          value={getUserDetails?.emergencyContactName}
        />
        <ProfileDetails
          title='Emergency Contact'
          value={getUserDetails?.emergencyContact}
        />
        <ProfileDetails title='Baptize' value={getUserDetails?.baptism} />
      </ScrollView>
    </View>
  );
};

export default ProfileComponent;

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
