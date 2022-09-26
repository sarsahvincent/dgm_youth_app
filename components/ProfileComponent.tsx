import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import { FontAwesome, Octicons, Feather } from '@expo/vector-icons';
import { UserContext } from '../context/AuthContext';
import { getUserRole } from '../utils/Role';
import { db } from '../firebase';
import Modal from 'react-native-modal';

const screenHeight = Dimensions.get('screen').height;
const ProfileComponent = () => {
  const { getUserDetails, setUid, uid, setGetUserDetails, setAllUsers } =
    useContext(UserContext);
  const [laoding, setLoading] = useState(false);
  const [dues, setDues] = useState<any>(
    getUserDetails?.dues ? getUserDetails.dues : 0
  );
  const [souls, setSouls] = useState<any>(
    getUserDetails?.soulsWon ? getUserDetails.soulsWon : 0
  );
  const usersCollectiion = collection(db, 'DGM_YOUTH_users');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateProfile = async () => {
    if (dues === '' || souls === '') {
      Alert.alert('Alert', 'All fields are required.', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    } else if (souls * 0 !== 0 || dues * 0 !== 0) {
      Alert.alert('Alert', 'Please enter a valid number', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    } else if (dues * 1 > 12) {
      Alert.alert('Alert', 'Monthly Dues can not be more than 12', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK' },
      ]);
    } else {
      setLoading(true);
      try {
        await updateDoc(doc(db, 'DGM_YOUTH_users', uid), {
          dues,
          soulsWon: souls,
        });

        const usersData = await getDocs(usersCollectiion);
        setAllUsers(
          usersData?.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
        await getDoc(doc(db, 'DGM_YOUTH_users', uid)).then((docSnap) => {
          setGetUserDetails(docSnap.data());
        });
        setLoading(false);
        toggleModal();
      } catch (e) {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again', [
          {
            text: 'Cancel',

            style: 'cancel',
          },
          { text: 'OK' },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#E6EFF8', alignItems: 'center' }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{getUserDetails.fullName}</Text>

          {getUserDetails?.role * 1 !== 0 && (
            <>
              {getUserDetails?.role * 1 === 0 ||
              getUserDetails?.role * 1 === 1 ||
              getUserDetails?.role * 1 === 2 ||
              getUserDetails?.role * 1 === 3 ||
              getUserDetails?.role * 1 === 6 ? (
                <Pressable onPress={toggleModal}>
                  <Feather size={20} name='edit-3' color='white' />
                </Pressable>
              ) : null}
            </>
          )}
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
          source={
            getUserDetails?.avatar
              ? { uri: `${getUserDetails?.avatar}` }
              : require('../assets/images/dgm_logo.png')
          }
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

      <Modal backdropOpacity={0.8} isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            EDIT PROFILE
          </Text>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Monthly Dues
            </Text>
            <TextInput
              value={dues}
              onChangeText={(amount) => {
                setDues(amount);
              }}
              style={styles.loginInput}
              placeholder='Enter number of months paid'
              keyboardType='number-pad'
              placeholderTextColor={'white'}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
              Number of Souls Won
            </Text>
            <TextInput
              value={souls}
              onChangeText={(soul) => {
                setSouls(soul);
              }}
              style={styles.loginInput}
              placeholder='Enter number of soldiers won'
              keyboardType='number-pad'
              placeholderTextColor={'white'}
            />
          </View>

          {laoding ? (
            <ActivityIndicator size='large' color='green' />
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Pressable
                onPress={updateProfile}
                style={{
                  backgroundColor: 'green',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  UPDATE
                </Text>
              </Pressable>
              <Pressable
                onPress={toggleModal}
                style={{
                  backgroundColor: 'red',
                  width: 150,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 40,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}
                >
                  CLOSE
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
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
  loginInput: {
    marginBottom: 40,
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginVertical: 6,
    fontSize: 16,
    color: 'white',
  },
});
