import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import SearchProfileSummary from './SearchProfileSummary';
import { UserContext } from '../context/AuthContext';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchReults] = useState([]);

  const { allUsers, setViewDetails } = useContext(UserContext);
  const navigation = useNavigation<any>();
  const handleViewProfile = (props: any) => {
    setViewDetails(props);
    navigation.navigate('ViewProfile');
  };
  const renderItems = ({ item }: { item: any }) => (
    <SearchProfileSummary
      name={item.fullName}
      role={item.role}
      phone={item.phone}
      photo={item.avatar}
      onPress={() => {
        handleViewProfile(item);
      }}
    />
  );

  useEffect(() => {
    const filteredData = allUsers?.filter(
      (user: any) =>
        user?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.lastName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.phone?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.sex?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    setSearchReults(filteredData);
  }, [searchTerm, allUsers]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchTerm}
            onChangeText={(newText) => setSearchTerm(newText)}
            style={styles.searchInput}
            placeholderTextColor='purple'
            placeholder='Search by keyword'
          />
          <FontAwesome size={24} name='search' color='purple' />
        </View>
        {searchResults.length === 0 ? (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              No data found !
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
          />
        )}
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
    justifyContent: 'center',
  },
});
