import { View, Text, Pressable, Image, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto';
import AddPost from '../../AddPost';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../utilities/Colors';


const Posts = () => {
    let [showAdd, setShowAdd] = useState(false)
    let [posts, setPosts] = useState([
        {
            image: 'https://c4.wallpaperflare.com/wallpaper/738/62/544/naruto-chidori-naruto-naruto-uzumaki-rasengan-naruto-sasuke-uchiha-hd-wallpaper-preview.jpg',
            author: {
                userName: "SaiemAzizChy"
            },
            title: 'Rumors spreading that sasuke rinnegan episode will come early feb',
            time: 'Jan 31, 2023',
            likeCount: 5,
            disLikeCount: 4,
            details: 'WallpaperFlare is an open platform for users to share their favorite wallpapers, By downloading this wallpaper, you agree to our Terms Of Use and Privacy Policy. This image is for personal desktop wallpaper use only, if you are the author and find this image is shared without your permission, DMCA report please Contact Us'
        },
        {
            image: 'https://c4.wallpaperflare.com/wallpaper/738/62/544/naruto-chidori-naruto-naruto-uzumaki-rasengan-naruto-sasuke-uchiha-hd-wallpaper-preview.jpg',
            author: {
                userName: "SaiemAzizChy"
            },
            title: 'Rumors spreading that sasuke rinnegan episode will come early feb',
            time: 'Jan 31, 2023',
            likeCount: 5,
            disLikeCount: 4,
            details: 'WallpaperFlare is an open platform for users to share their favorite wallpapers, By downloading this wallpaper, you agree to our Terms Of Use and Privacy Policy. This image is for personal desktop wallpaper use only, if you are the author and find this image is shared without your permission, DMCA report please Contact Us'
        }
    ])
    return (
        <View className="flex-1 pb-3">
            <FlatList
                className="p-5 pt-0"
                data={posts}
                renderItem={({ item, index }) => <SinglePost
                    item={item}
                    index={index}
                />}
                keyExtractor={(item, index) => index}
            />
            <LinearGradient colors={['lightgreen', 'darkgreen']} className="rounded-full overflow-hidden absolute bottom-5 right-5">
                <Pressable android_ripple={{ color: "lightgreen" }} className="p-2" onPress={() => setShowAdd(true)}>
                    <Icon name="plus-a" size={25} color="white" />
                </Pressable>
            </LinearGradient>
            <AddPost showAdd={showAdd} setShowAdd={setShowAdd} />
        </View>
    )
}

export default Posts

export function SinglePost({ item, index }) {
    let { image, details, likeCount, disLikeCount, react, author, time, title } = item

    return <View className="border-4 rounded-2xl overflow-hidden border-white mb-5 bg-green-100">
        <Text className="text-white font-bold text-lg absolute z-50 p-2 bg-green-900 rounded-full">{index + 1}</Text>

        <Image
            source={{
                uri: image
            }}
            fadeDuration={1000}
            resizeMode="contain"
            className="h-40 bg-green-900"
        />
        <View className="p-3">
            <Text className="text-xl font-bold text-center mb-2">{title}</Text>
            <View className="flex-row justify-between mb-2">
                <Text className="text-orange-700">@{author?.userName}</Text>
                <Text className="italic">{time}</Text>
            </View>
            <Text>{details.slice(0, 100)}...
                <Pressable className="">
                    <Text className=" text-blue-500 top-1 left-1">See More</Text>
                </Pressable>
            </Text>
            <View className="flex-row gap-5 pt-2">
                <Pressable className="flex-row gap-2 items-center">
                    <Icon name="like" size={20} color={react === 'liked' ? 'blue' : "#000"} />
                    <Text>{likeCount}</Text>
                </Pressable>
                <Pressable className="flex-row gap-2 items-center">
                    <Icon name="dislike" size={20} color={react === 'disliked' ? 'crimson' : "#000"} />
                    <Text>{disLikeCount}</Text>
                </Pressable>
            </View>
        </View>
    </View>
}