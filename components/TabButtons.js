import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const TabButtons = ({ tab, setTab }) => {

    let nonActive = "flex-1 justify-center pt-3 pb-6 items-center transition duration-200"

    return (
        <View className="w-full bg-green-600 h-20 flex-row shadow-2xl">
            <Pressable className={`${nonActive} ${tab === 'POSTS' && 'bg-green-700 scale-110 rounded-t-lg'} pl-3`} onPress={() => setTab('POSTS')}>
                <Icon name="newspaper" size={35} color="#fff" />
                <Text className="text-white text-xs italic">POSTS</Text>
            </Pressable>
            <Pressable className={`${nonActive} ${tab === 'VIDEOS' && 'bg-green-700 scale-110 rounded-t-lg'}`} onPress={() => setTab('VIDEOS')}>
                <Icon name="videocam" size={35} color="#fff" />
                <Text className="text-white text-xs italic">VIDEOS</Text>
            </Pressable>
            <Pressable className={`${nonActive} ${tab === 'ABOUT' && 'bg-green-700 scale-110 rounded-t-lg'} pr-3`} onPress={() => setTab('ABOUT')}>
                <Icon name="information-circle" size={35} color="#fff" />
                <Text className="text-white text-xs italic">ABOUT</Text>
            </Pressable>
        </View>
    )
}

export default TabButtons