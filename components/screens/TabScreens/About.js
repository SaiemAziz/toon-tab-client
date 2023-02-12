import { View, Text, ImageBackground, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MapView, { Marker } from 'react-native-maps';
import { AuthContext } from '../../../App';
import { BACKEND_URI } from '@env'
const About = () => {
    let { user, setUser, loading } = useContext(AuthContext)
    let [rating, setRating] = useState(user?.rating || 0)



    let handlerRate = (rate) => {
        if (rate === rating) {
            setRating(0)
            postRating(0)
        }
        else {
            setRating(rate)
            postRating(rate)
        }
    }

    let postRating = (rate) => {
        setUser(x => {
            return {
                ...x,
                rating: rate
            }
        })
        fetch(`${BACKEND_URI}/update-ratings?email=${user.email}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ rate })
        })
            .then(res => res.json())
            .then(data => {
                if (rate > 0)
                    ToastAndroid.show('Thank You For Rating Us', ToastAndroid.SHORT);
            })
    }

    return (
        <ImageBackground
            source={require('../../../assets/images/naruto_sasuke.png')}
            imageStyle={{ opacity: 0.5, width: '60%', top: "-45%", left: "45%" }}
            resizeMode="contain"
            className="flex-1 p-5 "
        >

            <ScrollView>
                <View className="flex-1  rounded-2xl border-y-white ">
                    <Text className="text-4xl text-green-900  font-bold">Your Opinion</Text>
                    <Text className="text-4xl text-green-900  font-bold">Matters To Us</Text>
                </View>
                <Text className="text-center italic text-lg border-4 p-5 my-5 rounded-2xl border-green-700 font-extrabold">We work hard to serve you better and would love to know how would you rate our app?</Text>
                <View className="flex-row justify-center gap-2 ml-1 w-1/2">
                    <Pressable onPress={() => handlerRate(1)}>
                        <Icon name={`star${rating >= 1 ? '-sharp' : '-outline'}`} size={30} color="green" />
                    </Pressable>
                    <Pressable onPress={() => handlerRate(2)}>
                        <Icon name={`star${rating >= 2 ? '-sharp' : '-outline'}`} size={30} color="green" />
                    </Pressable>
                    <Pressable onPress={() => handlerRate(3)}>
                        <Icon name={`star${rating >= 3 ? '-sharp' : '-outline'}`} size={30} color="green" />
                    </Pressable>
                    <Pressable onPress={() => handlerRate(4)}>
                        <Icon name={`star${rating >= 4 ? '-sharp' : '-outline'}`} size={30} color="green" />
                    </Pressable>
                    <Pressable onPress={() => handlerRate(5)}>
                        <Icon name={`star${rating >= 5 ? '-sharp' : '-outline'}`} size={30} color="green" />
                    </Pressable>
                </View>
                <View className="flex-1  rounded-2xl border-y-white ">
                    <Text className="text-4xl my-5 text-green-900 text-right font-bold">Our Location</Text>
                    <MapView
                        region={{
                            latitude: 22.4716,
                            longitude: 91.7877,
                            latitudeDelta: .05,
                            longitudeDelta: .05,
                        }}
                        className="w-full h-96"
                    >
                        <Marker coordinate={{
                            latitude: 22.4716,
                            longitude: 91.7877,
                            latitudeDelta: .05,
                            longitudeDelta: .05,
                        }}
                            title="Marker"
                        />
                    </MapView>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default About