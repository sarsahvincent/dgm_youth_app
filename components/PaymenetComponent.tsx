import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import FinanceSummaryComponent from './FinanceSummaryComponent';
import { FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons';

const PaymenetComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <FinanceSummaryComponent
          title='Current Balance'
          value='¢29.00'
          icon={<FontAwesome5 size={34} name='money-bill-alt' color='white' />}
        />
        <FinanceSummaryComponent
          title='Monthly Dues'
          value='¢29.00'
          icon={<AntDesign size={34} name='calendar' color='white' />}
        />
        <FinanceSummaryComponent
          title='Donations / Contributons'
          value='¢29.00'
          icon={<FontAwesome5 size={34} name='handshake' color='white' />}
        />
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'green',
              borderRadius: 10,
              width: '44%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 5,
              marginTop: 5,
            }}
          >
            <Ionicons size={30} name='add-circle-outline' color='white' />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
              width: '45%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              marginTop: 5,
            }}
          >
            <AntDesign size={30} name='minuscircleo' color='white' />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PaymenetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    flex: 1,
    width: '100%',
  },
});
