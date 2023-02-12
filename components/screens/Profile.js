import { StackActions } from '@react-navigation/native';
import { View, Text, Pressable, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../utilities/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BACKEND_URI } from '@env'
const Profile = ({ navigation, route }) => {
    let [mongoInfo, setMongoInfo] = useState(null)
    let { user, setLoading, setUser, logoutUser } = useContext(AuthContext)
    // console.log(user)
    let [tab, setTab] = useState('posts')
    useLayoutEffect(() => {
        fetch(`${BACKEND_URI}/my-user?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMongoInfo(data))
    }, [user])

    let handlerLogout = () => {
        logoutUser()
            .then(() => {
                setUser(null)
                setLoading(false)

                navigation.dispatch(
                    StackActions.replace('Login')
                );

            })
            .catch(() => {
                setUser(null)
                setLoading(false)
                navigation.dispatch(
                    StackActions.replace('Login')
                );

            })

    }

    let handlerBack = () => {
        navigation.navigate("InnerScreen")
    }
    return (
        <LinearGradient colors={[Colors.backgroundColor, 'purple']} className="flex-1">
            <LinearGradient colors={['purple', 'transparent']} className="flex-row justify-between items-center pt-10 px-5 pb-20 pr-2">
                <View className="rounded-3xl border-2 border-white overflow-hidden w-fit">
                    <Pressable className="justify-center items-center" android_ripple={{ color: "purple" }} onPress={handlerBack}>
                        <Icon name="keyboard-backspace" size={35} color="white" />
                    </Pressable>
                </View>
                <Text className="text-white font-semibold text-2xl left-3">Profile</Text>
                <View className="rounded-full overflow-hidden">
                    <Pressable android_ripple={{ color: "lightgreen" }} className="flex-row p-1 gap-2 items-center" onPress={handlerLogout}>
                        <Text className="text-white text-sm">Logout</Text>
                        <Icon name="logout" size={30} color="lightcoral" />
                    </Pressable>
                </View>
            </LinearGradient>
            <SafeAreaView>
                <View className="-mt-20">

                    <View className="mx-auto  overflow-hidden mb-5 rounded-[200px] border-4 border-white h-56 w-56">
                        <Image
                            className="h-full w-full"
                            source={{
                                uri: `${mongoInfo?.photoURL || "https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc="}`
                            }}
                            fadeDuration={1000}
                        />
                    </View>
                    <Text className="text-center font-semibold text-2xl text-blue-900">@{mongoInfo?.userName || "No Name"}</Text>
                    <Text className="text-center italic text-2xl mb-3">{mongoInfo?.birthDate || "No Birthdate"}</Text>
                    <View>
                    </View>
                </View>
            </SafeAreaView>
            <View className="flex-1 p-5 ">
                <View className="flex-row gap-2">
                    <View className="flex-1 border-4 border-b-0 rounded-t-3xl border-purple-900 overflow-hidden">
                        <Pressable onPress={() => setTab('posts')}>
                            <Text className={`text-center text-xl py-3 ${tab === 'posts' ? 'bg-purple-900 text-purple-400' : 'text-purple-900'}`}>Posts</Text>
                        </Pressable>
                    </View>
                    <View className="flex-1 border-4 border-b-0 rounded-t-3xl border-purple-900 overflow-hidden">
                        <Pressable onPress={() => setTab('comments')}>
                            <Text className={`text-center text-xl py-3 ${tab === 'comments' ? 'bg-purple-900 text-purple-400' : 'text-purple-900'}`}>Comments</Text>
                        </Pressable>
                    </View>
                </View>
                <ScrollView className="bg-purple-900 rounded-b-3xl p-5">
                    {tab === 'comments' && <MyComments />}
                    {tab === 'posts' && <MyPosts />}
                </ScrollView>
            </View>

        </LinearGradient>
    )
}

export default Profile


function MyPosts() {
    let [posts, setPosts] = useState(null)
    return (
        <View>
            <Text>posts</Text>
        </View>
    )
}
function MyComments() {
    return (
        <View>
            <Text>comments</Text>
        </View>
    )
}