import React, { useContext, useLayoutEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import ButtonPrimary from '../utilities/ButtonPrimary';
import ButtonSecondary from '../utilities/ButtonSecondary';
import { Colors } from '../utilities/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import TabButtons from '../TabButtons';
import Videos from './TabScreens/Videos';
import Posts from './TabScreens/Posts';
import About from './TabScreens/About';
import { AuthContext } from '../../App';
import { StackActions, useIsFocused } from '@react-navigation/native';
const InnerScreen = ({ navigation, route }) => {
    let isFocused = useIsFocused()
    let { user } = useContext(AuthContext)
    let [tab, setTab] = useState('POSTS')

    useLayoutEffect(() => {
        if (!user) {
            navigation.dispatch(
                StackActions.replace('Login')
            );
        }
    }, [isFocused])

    let handlerProfile = () => {
        navigation.navigate("Profile")
    }


    return (
        <LinearGradient className="flex-1" colors={[Colors.backgroundColor, Colors.primary]}>
            <SafeAreaView className="flex-1">

                <View className="flex-row justify-between p-5">
                    <View className="rounded-full overflow-hidden w-fit">
                        <Pressable className="justify-center items-center" android_ripple={{ color: "lightgreen" }} onPress={handlerProfile}>
                            <Icon name="camera" size={45} color="#5DB075" />
                        </Pressable>
                    </View>
                    <Text className="text-center text-xl bg-green-600 text-white p-3 rounded-tl-full rounded-br-full flex-1 mx-5">
                        {tab === 'VIDEOS' && 'Youtube Videos'}
                        {tab === 'POSTS' && 'Posts'}
                        {tab === 'ABOUT' && 'About Us'}
                    </Text>
                    <View className="rounded-full overflow-hidden w-fit z-50">
                        <Pressable className="justify-center items-center" android_ripple={{ color: "lightgreen" }} onPress={handlerProfile}>
                            <Icon name="person-circle-sharp" size={45} color="#5DB075" />
                        </Pressable>
                    </View>
                </View>

                <View className="flex-1">

                    {tab === 'VIDEOS' && <Videos />}
                    {tab === 'POSTS' && <Posts />}
                    {tab === 'ABOUT' && <About />}
                </View>

                <View>
                    <TabButtons
                        tab={tab}
                        setTab={setTab}
                    />
                </View>
            </SafeAreaView>

        </LinearGradient>
    );
};

export default InnerScreen;

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: Colors.backgroundColor,
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingTop: StatusBar.currentHeight
    // },
    // img: {

    //     height: 300,
    //     width: 300,
    //     top: 20,
    //     opacity: 1,
    // },
    // buttonContainer: {
    //     flexDirection: "row",
    //     padding: 50
    // },
    // titleContainer: {
    //     borderWidth: 4,
    //     borderColor: Colors.primary,
    //     padding: 20,
    //     width: "60%",
    //     borderRadius: 100
    // },
    // title1: {
    //     fontSize: 15,
    //     textAlign: "center",
    //     color: Colors.primary,
    //     fontStyle: "italic",
    //     fontWeight: "bold",
    // },
    // title2: {
    //     fontSize: 30,
    //     textAlign: "center",
    //     color: Colors.secondary,
    //     fontWeight: "bold",
    // }
})