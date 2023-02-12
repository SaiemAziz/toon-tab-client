import { View, Text, SafeAreaView, Pressable, ScrollView, Image, TextInput, FlatList, Modal, ActivityIndicator } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utilities/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { BACKEND_URI } from '@env'
import { AuthContext } from '../../App';
import Comment from './TabScreens/Comments';

const CommentScreen = ({ navigation, route }) => {
    let { user } = useContext(AuthContext)
    let [comments, setComments] = useState([])
    let [myComment, setMyComment] = useState('')
    let [load, setLoad] = useState(false)
    let { postID, item } = route?.params
    useLayoutEffect(() => {

        fetchComments()
        return () => { }
    }, [])

    let fetchComments = () => {
        fetch(BACKEND_URI + `/all-comments?postID=${postID}`)
            .then(res => res.json())
            .then(data => {
                setComments(data.comments)
                setLoad(false)
            })
    }
    let handlerComment = (e) => {
        // console.log(e.nativeEvent.text);
        setMyComment(e)
    }
    let handlerCancel = () => {
        // console.log(e.nativeEvent.text);
        navigation.navigate("Details", item)
    }
    let handlerSubmit = () => {
        if (myComment !== '') {
            setLoad(true)
            let comm = {
                details: myComment,
                postID: postID,
                authorEmail: user?.email,
                time: Date.now()
            }
            fetch(BACKEND_URI + '/submit-comment', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(comm)
            }).then(res => res.json())
                .then(data => {
                    if (data?.acknowledged) {
                        setMyComment('')
                        comm = { ...comm, author: user, _id: data?.insertedId }
                        setComments([comm, ...comments])
                        setLoad(false)
                    }
                })
        }
    }
    return (
        <LinearGradient className="flex-1 p-5 pt-10" colors={['white', 'orange']}>
            <FlatList
                data={comments}
                renderItem={({ item, index }) => <Comment comment={item} load={load} />}
                keyExtractor={(item, index) => item._id}
            />
            {/* <ScrollView>
            {
                comments.map((item, index) => <Comment
                    key={index}
                    comment={item}
                />)
            }
        </ScrollView> */}
            <View className=" flex-row justify-between gap-5">
                <TextInput
                    onChangeText={handlerComment}
                    className="border-2 px-3 text-orange-900 bg-orange-200 font-semibold text-lg border-orange-900 flex-1 h-16 rounded-2xl"
                    maxLength={50}
                    value={myComment}
                    placeholder="Please enter a comment"
                />
                {
                    load ? <ActivityIndicator size="large" color="red" />
                        :
                        <View className="justify-between">
                            <View className="overflow-hidden rounded-xl">
                                <Pressable android_ripple={{ color: 'orange' }} className="bg-orange-900 px-4 py-1" onPress={handlerSubmit}>
                                    <Text className="text-white text-sm">SUBMIT</Text>
                                </Pressable>
                            </View>
                            <View className="overflow-hidden rounded-xl">
                                <Pressable android_ripple={{ color: 'red' }} className="bg-red-700 px-4 py-1" onPress={handlerCancel}>
                                    <Text className="text-white text-sm">CANCEL</Text>
                                </Pressable>
                            </View>
                        </View>
                }
            </View>
        </LinearGradient>
    )
}

export default CommentScreen