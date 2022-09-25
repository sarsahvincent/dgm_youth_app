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
const ViewProfileComponent = ({ data }: { data: any }) => {
  const { setUid } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#E6EFF8', alignItems: 'center' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{data?.fullName}</Text>
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

        <Image style={styles.image} source={{ uri: `${data?.avatar}` }} />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ProfileTabs
            title={`${data.dues}/12`}
            icon={<FontAwesome size={20} name='money' color='white' />}
            backgroundColor='green'
          />
          <ProfileTabs
            title={data.department}
            icon={<Octicons size={20} name='organization' color='white' />}
            backgroundColor='purple'
          />
          <ProfileTabs
            title={data.soulsWon}
            icon={<Feather size={20} name='user-plus' color='white' />}
            backgroundColor='#7a00cc'
          />
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileDetails title='First Name' value={data?.firstName} />
        <ProfileDetails title='Last Name' value={data?.lastName} />
        <ProfileDetails title='Middle Name' value={data?.middleName} />
        <ProfileDetails title='Role ' value={getUserRole(data?.role)} />
        <ProfileDetails title='Email ' value={data?.email} />
        <ProfileDetails title='Phone ' value={data?.phone} />
        <ProfileDetails title='Age ' value={data?.age} />
        <ProfileDetails title='Status ' value={data?.status} />
        <ProfileDetails title='Salutation ' value={data?.salutation} />
        <ProfileDetails title='Gender' value={data?.sex} />
        <ProfileDetails
          title='Membership Status'
          value={data?.membershipStatus}
        />
        <ProfileDetails title='Marital Status' value={data?.maritalStatus} />
        <ProfileDetails title='Occupation' value={data?.occupation} />
        <ProfileDetails title='Address' value={data?.address} />
        <ProfileDetails title='City' value={data?.city} />
        <ProfileDetails title='E. C. Name' value={data?.emergencyContactName} />
        <ProfileDetails
          title='Emergency Contact'
          value={data?.emergencyContact}
        />
        <ProfileDetails title='Baptize' value={data?.baptism} />
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
