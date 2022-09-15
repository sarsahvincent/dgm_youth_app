import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import SearchProfileSummary from './SearchProfileSummary';

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
  {
    id: '58694a0f-3da1-471f-bd96-145571ed72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d722',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d721',
    title: 'Third Item',
  },
];

export default function SearchComponent() {
  const navigation = useNavigation();
  const handleViewProfile = () => {
    navigation.navigate('ViewProfile');
  };
  const renderItems = () => (
    <SearchProfileSummary onPress={handleViewProfile} />
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor='purple'
            placeholder='Search by keyword'
          />
          <FontAwesome size={30} name='search' color='purple' />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    height: 50,
    borderRadius: 50,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 60,
    borderWidth: 0,
    borderColor: 'red',
    textAlign: 'center',
    borderRadius: 15,
  },
});
