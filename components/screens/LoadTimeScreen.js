import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StackActions } from '@react-navigation/native';
import Lottie from 'lottie-react-native'


const LoadTimeScreen = ({ navigation, route }) => {

    let [time, setTime] = useState(false)


    useLayoutEffect(() => {
        let timeSet = setTimeout(() => {
            setTime(true)
        }, 5000)

        return () => clearTimeout(timeSet)
    }, [])

    if (time) {
        navigation.dispatch(
            StackActions.replace('MainScreen')
        );
    }

    return (
        <View>
            {/* <Lottie
                autoPlay
                loop
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/images/Smiling.json')}
            /> */}
        </View>
    )
}

export default LoadTimeScreen