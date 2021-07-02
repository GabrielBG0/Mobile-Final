import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet } from 'react-native'
import Colors from '../Constants/Colors';

export default function Header(props) {
    return (
        <View style={styles.toolBar}>
            <Ionicons name="menu" size={30} color={Colors.icons} />
            <Image source={require('../../assets/Logo.png')}
                style={{ width: 40, height: 40 }} />
            <Ionicons name="qr-code" size={30} color={Colors.icons} />
        </View>
    )
}

const styles = StyleSheet.create({
    toolBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.tooBarBG,
        width: '100%',
        height: '100%',
        paddingHorizontal: 10
    }
})