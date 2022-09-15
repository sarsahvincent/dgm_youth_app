import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SummaryComponent from './SummaryComponent';
import DashboardProfileSummary from './DashboardProfileSummary';
import DashboardEventSummary from './DashboardEventSummary';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const HomeScreenComponent = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleViewProfile = () => {
    navigation.navigate('ViewProfile');
  };

  const renderDashboardProfileSummaryItem = () => (
    <DashboardProfileSummary onPress={handleViewProfile} />
  );
  const renderDashboardDashboardEventSummaryItem = () => (
    <DashboardEventSummary />
  );
  return (
    <>
      <View style={styles.upperContainer}>
        <Image
          source={require('../assets/images/camp.jpg')}
          resizeMode='stretch'
          style={styles.image}
        />
      </View>

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
                  value='23'
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
                  value='23'
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
                  value='23'
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
                  value='23'
                />
              </ScrollView>
            </View>
          </View>

          <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: 'purple', fontWeight: '600' }}>
              Members
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={DATA}
              renderItem={renderDashboardProfileSummaryItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{ flex: 1, width: '100%', marginBottom: 20 }}>
            <Text style={{ fontSize: 16, color: 'purple', fontWeight: '600' }}>
              Events
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={DATA}
              renderItem={renderDashboardDashboardEventSummaryItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
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
});
