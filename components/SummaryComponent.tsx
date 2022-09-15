import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
    title: string;
    icon: any;
    value: string;
}

const SummaryComponent = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.icon}
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    )
}

export default SummaryComponent

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 100,
        borderRadius: 10,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: '#52006A',
        padding: 6,
        marginHorizontal: 10
    },
    value: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'purple'
    },
    title: {
        color: 'purple',
        marginVertical: 5,
    }
})