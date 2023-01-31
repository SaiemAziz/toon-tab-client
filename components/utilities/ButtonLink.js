import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { Colors } from './Colors'

const ButtonLink = ({ children, onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable android_ripple={styles.effect} style={styles.pressableStyle} onPress={onPress}>
                <Text style={styles.textStyle}>{children.toUpperCase()}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonLink

const styles = StyleSheet.create({
    effect: {
    },
    pressableStyle: {
        paddingVertical: 10,
    },
    container: {
        borderRadius: 20,
        overflow: "hidden",
        width: "100%",
    },
    textStyle: {
        color: Colors.primary,
        textAlign: "center",
        fontWeight: "bold"
    }
})