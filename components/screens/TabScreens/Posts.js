import { View, Text, Pressable, Image, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Fontisto';
import AddPost from '../../AddPost';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../utilities/Colors';
import { AuthContext } from '../../../App';
import { BACKEND_URI } from '@env'
import { useNavigation } from '@react-navigation/native';

const Posts = () => {
    let [showAdd, setShowAdd] = useState(false)
    let [loadPost, setLoadPost] = useState(true)
    let [posts, setPosts] = useState([])

    useLayoutEffect(() => {
        fetch(BACKEND_URI + '/all-posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts)
                setLoadPost(false)
            })
    }, [])
    return (
        <View className="flex-1 pb-3">
            {
                loadPost ? <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size={80} color="darkgreen" />
                </View> :
                    <FlatList
                        className="p-5 pt-0"
                        data={posts}
                        renderItem={({ item, index }) => <SinglePost
                            item={item}
                            index={index}
                        />}
                        keyExtractor={(item, index) => index}
                    />}
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
    let { user } = useContext(AuthContext)
    let { image, details, authorEmail, time, title, _id } = item
    let [react, setReact] = useState('none')
    let [likeCount, setLikeCount] = useState(0)
    let [disLikeCount, setDisLikeCount] = useState(0)
    let navigation = useNavigation()
    useLayoutEffect(() => {
        if (user?.email)
            fetch(BACKEND_URI + `/react-check?email=${user.email}&postID=${_id}`)
                .then(res => res.json())
                .then(data => {
                    setReact(data.react)
                    setLikeCount(data.liked)
                    setDisLikeCount(data.disliked)
                })
    }, [user])

    let handlerReact = (reaction) => {

        if (react === reaction) {

            deleteReact(reaction)
        } else {

            updateReact(reaction)
        }
    }

    let deleteReact = (reaction) => {

        fetch(BACKEND_URI + `/react-delete?email=${user.email}&postID=${_id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then(() => {
                if (reaction === 'liked')
                    setLikeCount(x => x - 1)
                if (reaction === 'disliked')
                    setDisLikeCount(x => x - 1)
                setReact('none')
            })
    }

    let updateReact = (reaction) => {
        fetch(BACKEND_URI + `/react-update?email=${user.email}&postID=${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ reaction })
        })
            .then((res) => res.json())
            .then(() => {
                if (react === 'none') {
                    if (reaction === 'liked')
                        setLikeCount(x => x + 1)
                    if (reaction === 'disliked')
                        setDisLikeCount(x => x + 1)
                } else {
                    if (reaction === 'liked') {
                        setLikeCount(x => x + 1)
                        setDisLikeCount(x => x - 1)
                    }
                    if (reaction === 'disliked') {
                        setLikeCount(x => x - 1)
                        setDisLikeCount(x => x + 1)
                    }
                }
                setReact(reaction)
            })
    }


    let handlerSeeMore = () => {
        navigation.navigate('Details', item)
    }

    return <View className="border-4 rounded-2xl p-3 overflow-hidden border-white mb-5 bg-green-100 flex-row items-center">
        {/* <Text className="text-white font-bold text-lg absolute z-50 p-2 bg-green-900 rounded-full">{index + 1}</Text> */}

        <Image
            source={{
                uri: image
            }}
            fadeDuration={1000}
            resizeMode="contain"
            className="h-full w-1/3 rounded-l-3xl bg-green-900"
        />
        <View className="flex-1 pl-3">
            <Text className="text-lg font-bold text-left" numberOfLines={2}>{title}...</Text>

            <Text className="text-orange-700 text-xs mb-2" numberOfLines={1}>@{authorEmail}</Text>
            {/* <Text className="italic">{time}</Text> */}

            <Text className="text-gray-500" numberOfLines={2}>{details}...</Text>
            <Pressable>
                <Text className=" text-blue-500 text-right right-0" onPress={handlerSeeMore}>See More</Text>
            </Pressable>
            <View className="flex-row gap-5 pt-2 justify-between ">
                <Pressable className="flex-row gap-2 items-center" onPress={() => handlerReact('liked')}>
                    <Icon name="like" size={15} color={react === 'liked' ? 'blue' : "gray"} />
                    <Text className={react === 'liked' ? 'text-blue-700' : 'text-gray-500'}>{likeCount}</Text>
                </Pressable>
                <Pressable className="flex-row gap-2 items-center" onPress={() => handlerReact('disliked')}>
                    <Icon name="dislike" size={15} color={react === 'disliked' ? 'crimson' : "gray"} />
                    <Text className={react === 'disliked' ? 'text-red-700' : 'text-gray-500'}>{disLikeCount}</Text>
                </Pressable>
            </View>
        </View>
    </View>
}