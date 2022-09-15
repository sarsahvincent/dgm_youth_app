import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import TopComponent from './TopComponent';
import SummaryComponent from './SummaryComponent';
import DashboardProfileSummary from './DashboardProfileSummary';
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
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const renderItem = () => <DashboardProfileSummary />;
  return (
    <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#E6EFF8' }}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <View style={styles.upperContainer}>
            <ImageBackground
              source={require('../assets/images/camp.jpg')}
              resizeMode='cover'
              style={styles.image}
            ></ImageBackground>
          </View>
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

        <View style={{ flex: 1, width: '100%', paddingVertical: 20 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
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
    width: '100%',
    height: 200,
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
    marginBottom: 30,
    height: 200,
    borderRadius: 10,
    marginTop: 35,
    padding: 10,
    width: '100%',
  },
  dashboardSummaryContainer: {},
  text: {
    color: 'white',
    fontSize: 18,
  },
});
