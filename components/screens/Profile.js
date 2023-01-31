import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../utilities/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation, route }) => {
    let [mongoInfo, setMongoInfo] = useState(null)
    let { user, setLoading, setUser, logoutUser } = useContext(AuthContext)
    // console.log(user)

    useLayoutEffect(() => {
        fetch(`http://192.168.0.115:8000/my-user?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMongoInfo(data))
    }, [])

    let handlerLogout = () => {
        logoutUser()
            .then(() => {
                setUser(null)
                setLoading(false)
                navigation.navigate("Login")
            })
            .catch(() => {
                setUser(null)
                setLoading(false)
                navigation.navigate("Login")
            })

    }
    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.primary]} className="flex-1">
            <LinearGradient colors={[Colors.primary, 'transparent']} className="flex-row justify-between items-center pt-10 px-5 pb-20 pr-2">
                <Text className="text-white font-semibold text-2xl">Profile</Text>
                <View className="rounded-full overflow-hidden ">
                    <Pressable android_ripple={{ color: "lightgreen" }} className="flex-row p-1 gap-2 items-center" onPress={handlerLogout}>
                        <Text className="text-white text-sm">Logout</Text>
                        <Icon name="logout" size={30} color="lightcoral" />
                    </Pressable>
                </View>
            </LinearGradient>
            <SafeAreaView>
                <View className="-top-20">

                    <View className="mx-auto overflow-hidden mb-5 rounded-full h-56 w-56 shadow-2xl">
                        <Image
                            className="h-full w-full"
                            source={{
                                uri: `${mongoInfo?.photoURL || "https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc="}`
                            }}
                            fadeDuration={1000}
                        />
                    </View>
                    <Text className="text-center font-semibold text-2xl">@{mongoInfo?.userName || "No Name"}</Text>
                    <Text className="text-center italic text-2xl my-3">{mongoInfo?.birthDate || "No Birthdate"}</Text>

                </View>
            </SafeAreaView>

        </LinearGradient>
    )
}

export default Profile