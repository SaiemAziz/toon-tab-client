import { View, Text, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './utilities/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from './utilities/ButtonPrimary';
import ButtonSecondary from './utilities/ButtonSecondary';

const AddPost = ({ showAdd, setShowAdd }) => {
    let [title, setTitle] = useState('')
    let [details, setDetails] = useState('')
    let handlerAdd = () => {
        setShowAdd(false)
    }

    return (
        <Modal visible={showAdd} animationType="slide">
            <LinearGradient className="flex-1" colors={[Colors.backgroundColor, Colors.primary]}>
                <View className="p-5 flex-1 gap-5">
                    <Text className="text-center text-xl bg-green-600 text-white p-3 rounded-bl-full rounded-tr-full">Add Post</Text>
                    <View className="h-16 flex-row gap-5">
                        <ButtonPrimary onPress={() => setShowAdd(false)}>
                            Cancel
                        </ButtonPrimary>
                        <ButtonSecondary onPress={handlerAdd}>
                            Add
                        </ButtonSecondary>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    )
}

export default AddPost