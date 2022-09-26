import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SummaryComponent from './SummaryComponent';
import DashboardProfileSummary from './DashboardProfileSummary';
import DashboardEventSummary from './DashboardEventSummary';
import DashboardDepartmentSummary from './DashboardDepartmentSummary';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../context/AuthContext';
import { db } from '../firebase';

const Item = ({ title }: { title: string }) => (
  <View>
    <Text>{title}</Text>
  </View>
);
const HomeScreenComponent = () => {
  const {
    loading,
    setLoading,
    allUsers,
    setAllUsers,
    allDepartment,
    setAllDepartment,
    settAllActivity,
    allActivity,
    uid,
    setGetUserDetails,
    setViewDetails,
  } = useContext(UserContext);
  const [men, setMen] = useState([]);
  const [womem, setWomen] = useState<any>([]);
  const [newConvert, setNewConvert] = useState([]);
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<any>();

  let totalYouth = men + womem;
  let numberOfMen: any = [];
  let numberOfWomen: any = [];
  let numberOfNewConvert: any = [];
  const activitiesCollectiion = collection(db, 'DGM_YOUTH_Activities');
  const usersCollectiion = collection(db, 'DGM_YOUTH_users');
  const eventImage = collection(db, 'DGM_YOUTH_program_image');
  const deparmentCollectiion = collection(db, 'DGM_YOUTH_Departments');
  const getAllMen = () => {
    const findMan = allUsers?.filter((user: any) => user.sex === 'Male');
    if (findMan) {
      numberOfMen.push(findMan);
    }
  };
  const getAllWomen = () => {
    const findWoman = allUsers?.filter((user: any) => user.sex === 'Female');
    if (findWoman) {
      numberOfWomen.push(findWoman);
    }
  };

  const getAllNewConvert = () => {
    const findNewConvert = allUsers?.filter(
      (user: any) => user.membershipStatus === 'New Convert'
    );
    if (findNewConvert) {
      numberOfNewConvert.push(findNewConvert);
    }
  };

  useEffect(() => {
    const getAllDepartment = async () => {
      setLoading(true);
      try {
        const data: any = await getDocs(deparmentCollectiion);
        setAllDepartment(
          data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    getAllDepartment();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const data = await getDocs(usersCollectiion);
        setAllUsers(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    const getActiviteis = async () => {
      try {
        setLoading(true);
        const data = await getDocs(activitiesCollectiion);
        settAllActivity(
          data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    getActiviteis();
    getUsers();
  }, []);

  useEffect(() => {
    getDoc(doc(db, 'DGM_YOUTH_users', uid)).then((docSnap) => {
      setGetUserDetails(docSnap.data());
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProgramImage = async () => {
      const data = await getDocs(eventImage);
      setImage(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };

    setLoading(false);
    getProgramImage();
  }, []);

  useEffect(() => {
    getAllWomen();
    setWomen(numberOfWomen[0].length);
    getAllMen();
    setMen(numberOfMen[0].length);
    getAllNewConvert();
    setNewConvert(numberOfNewConvert[0].length);
  }, [allUsers]);

  const handleViewProfile = (props: any) => {
    setViewDetails(props);
    navigation.navigate('ViewProfile');
  };
  const renderDashboardProfileSummaryItem = ({ item }: { item: any }) => (
    <DashboardProfileSummary
      onPress={() => {
        handleViewProfile(item);
      }}
      photo={item.avatar}
      name={item?.fullName}
      sex={item?.sex}
      phone={item?.phone}
      email={item?.email}
      address={item?.address}
    />
  );
  const renderDashboardDashboardEventSummaryItem = ({
    item,
  }: {
    item: any;
  }) => (
    <DashboardEventSummary
      title={item.title}
      total={item.total}
      status={item.status}
    />
  );
  const renderDashboardDepartmentSummaryItem = ({ item }: { item: any }) => (
    <DashboardDepartmentSummary
      name={item.departmentName}
      assistant={item.gropAssitant}
      leader={item.groupLeaderName}
    />
  );

  return (
    <>
      <View style={styles.upperContainer}>
        <Image
          source={
            image
              ? { uri: `${image[0]?.image}` }
              : require('../assets/images/total-verses-in-the-bible.jpg')
          }
          resizeMode='stretch'
          style={styles.image}
        />
      </View>
      {loading ? (
        <View style={{ flex: 1, height: '100%' }}>
          <ActivityIndicator size='large' color='purple' />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, height: '100%', backgroundColor: '#E6EFF8' }}
        >
          <View style={styles.container}>
            <View style={styles.welcomeContainer}>
              <View style={styles.dashboardSummaryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <SummaryComponent
                    title='Total Youth'
                    icon={
                      <FontAwesome
                        size={30}
                        style={{ marginBottom: -3 }}
                        name='users'
                        color='purple'
                      />
                    }
                    value={totalYouth}
                  />
                  <SummaryComponent
                    title='Total Men'
                    icon={
                      <Ionicons
                        size={30}
                        style={{ marginBottom: -3 }}
                        name='man'
                        color='purple'
                      />
                    }
                    value={men}
                  />
                  <SummaryComponent
                    title='Total Women'
                    icon={
                      <Ionicons
                        size={30}
                        style={{ marginBottom: -3 }}
                        name='woman'
                        color='purple'
                      />
                    }
                    value={womem}
                  />
                  <SummaryComponent
                    title='New Convert'
                    icon={
                      <MaterialIcons
                        size={30}
                        style={{ marginBottom: -3 }}
                        name='group-add'
                        color='purple'
                      />
                    }
                    value={newConvert}
                  />
                </ScrollView>
              </View>
            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
              <Text
                style={{ fontSize: 16, color: 'purple', fontWeight: '600' }}
              >
                Departments
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={allDepartment}
                renderItem={renderDashboardDepartmentSummaryItem}
                keyExtractor={(item) => item.id}
              />
            </View>

            <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
              <Text
                style={{ fontSize: 16, color: 'purple', fontWeight: '600' }}
              >
                Members
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={allUsers}
                renderItem={renderDashboardProfileSummaryItem}
                keyExtractor={(item) => item.uid}
              />
            </View>

            <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
              <Text
                style={{ fontSize: 16, color: 'purple', fontWeight: '600' }}
              >
                Events
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={allActivity}
                renderItem={renderDashboardDashboardEventSummaryItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default HomeScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 10,
  },
  image: {
    flex: 1,
    width: 'auto',
    borderRadius: 10,
  },
  welcomeContainer: {
    flex: 1,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loginInfoText: {
    color: 'grey',
    fontSize: 20,
  },

  upperContainer: {
    height: '35%',
    borderRadius: 10,
    marginTop: 35,
    padding: 2,
    width: '100%',
    backgroundColor: '#E6EFF8',
  },
  dashboardSummaryContainer: {},
  text: {
    color: 'white',
    fontSize: 18,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
