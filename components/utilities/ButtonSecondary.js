import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { Colors } from './Colors'

const ButtonSecondary = ({ children, onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable android_ripple={styles.effect} style={styles.pressableStyle} onPress={onPress}>
                <Text style={styles.textStyle}>{children.toUpperCase()}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonSecondary

const styles = StyleSheet.create({
    effect: {
        color: Colors.primary,
    },
    pressableStyle: {
        paddingVertical: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        overflow: "hidden",
        flex: 1,
        margin: 10,
        elevation: 10
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
})