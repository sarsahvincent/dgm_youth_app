import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const DashboardProfileSummary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 16,
          }}
        >
      Vals Day
        </Text>
        <Text
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 16,
          }}
        >
          Total Cost: $: <Text style={{ color: '#ABB0B8' }}>234.90</Text>{' '}
        </Text>
        <Text
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 16,
          }}
        >
          Status : <Text style={{ color: '#ABB0B8' }}>Pending</Text>{' '}
        </Text>
      </View>
    </View>
  );
};

export default DashboardProfileSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    width: 250,
    height: 120,
    marginTop: 20,
    widthborderRadius: 10,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
    width: '100%',
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: 'purple',
    borderRadius: 50,
  },
});
