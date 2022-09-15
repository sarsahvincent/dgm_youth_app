import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import SearchComponent from '../components/SearchComponent';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
     <SearchComponent/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 5
      },
})