import { View, Text, ScrollView, Alert, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
const Videos = () => {
    let videos = [
        {
            showName: "NARUTO",
            title: "Top 10 Strongest Naruto Characters",
            id: "5hbzEFLTjHY"
        },
        {
            showName: "TOM & JERRY",
            title: "Tom & Jerry | Jerry's Funniest Moments! 🐭 | WB Kids",
            id: "0uQwp2qn9cQ"
        },
        // {
        //     showName: "ATTACK ON TITAN",
        //     title: "Top 10 Epic Moments in Attack on Titan",
        //     id: "E6NhKGeH1"
        // },
    ]
    // const [playing, setPlaying] = useState(false);

    // const onStateChange = (state) => {
    //     if (state === "ended") {
    //         setPlaying(false);
    //     }
    // };

    // const togglePlaying = () => {
    //     setPlaying((prev) => !prev);
    // };
    return (
        <View className="flex-1 pb-3">

            <FlatList
                className="p-5"
                data={videos}
                renderItem={({ item, index }) => <SingleVideo
                    item={item}
                />}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

export default Videos

export function SingleVideo({ item }) {

    return <View className=" mb-5 bg-black  overflow-hidden">
        <YoutubePlayer
            height={200}
            // play={playing}
            videoId={item.id}
        // onChangeState={onStateChange}
        />
        <Text className="text-right text-green-600 font-bold p-5 pb-0">{item.showName}</Text>
        <Text className="text-xl text-green-100 p-5 pt-0">{item.title}</Text>
    </View>
} 