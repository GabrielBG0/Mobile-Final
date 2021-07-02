import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Constants/Colors';

export default function Header(props) {
    return (
        <View style={styles.toolBar}>
            <Ionicons name="menu" size={30} color={Colors.tooBarBG} />
            <Image source={require('../../assets/Logo.png')}
                style={{ width: 40, height: 40 }} />
            <TouchableOpacity>
                <Ionicons name="qr-code" size={30} color={Colors.icons} />
            </TouchableOpacity>
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
        maxHeight: 60,
        paddingHorizontal: 10
    }
})