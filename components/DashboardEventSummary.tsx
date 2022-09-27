import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const DashboardProfileSummary = (props: {
  title: string;
  total: string;
  status: string;
}) => {
  const getColor = (status: string) => {
    if (status === 'approved') return 'blue';
    else if (status === 'executed') return 'green';
    else return 'red';
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 14,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 14,
          }}
        >
          Total Cost: ¢: <Text style={{ color: '#ABB0B8' }}>{props.total}</Text>
        </Text>
        <Text
          style={{
            fontWeight: '600',
            marginVertical: 6,
            color: 'purple',
            fontSize: 14,
          }}
        >
          Status :{' '}
          <Text style={{ color: getColor(props.status) }}>
            {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
          </Text>
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
    height: 110,
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
