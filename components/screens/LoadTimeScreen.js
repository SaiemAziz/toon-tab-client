import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native';
import Lottie from 'lottie-react-native'
import { LinearGradient } from 'expo-linear-gradient';

const LoadTimeScreen = ({ navigation, route }) => {



    useLayoutEffect(() => {
        let timeSet = setTimeout(() => {
            navigation.dispatch(
                StackActions.replace('MainScreen')
            );
        }, 5000)

        return () => clearTimeout(timeSet)
    }, [])


    return (
        <LinearGradient colors={["lightblue", "darkblue"]} className="flex-1 bg-blue-400">
            <Lottie
                autoPlay
                loop
                className="opacity-90 left-2"
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/images/106889-earkick-welcome-animation.json')}
            />
        </LinearGradient>
    )
}

export default LoadTimeScreen