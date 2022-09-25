import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PaymenetComponent from '../components/PaymenetComponent';


const PaymentScreen = () => {
  return (
    <View style={styles.container}>
    <PaymenetComponent/>
   </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      },
})