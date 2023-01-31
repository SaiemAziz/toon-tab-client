import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import ButtonPrimary from '../utilities/ButtonPrimary';
import ButtonSecondary from '../utilities/ButtonSecondary';
import { Colors } from '../utilities/Colors';

const MainScreen = ({ navigation, route }) => {

    let handleLogin = () => {
        navigation.navigate("Login", { reg: false })
    }
    let handleRegister = () => {
        navigation.navigate("Login", { reg: true })
    }

    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.primary]} style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title1}>Welcome to</Text>
                <Text style={styles.title2}>Toon Tab</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image
                    source={require('../../assets/images/kungfu_panda_2.png')}
                    fadeDuration={1000}
                    style={styles.img}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonSecondary onPress={handleLogin}>Login</ButtonSecondary>
                <ButtonSecondary onPress={handleRegister}>Register</ButtonSecondary>
            </View>
        </LinearGradient>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: StatusBar.currentHeight
    },
    img: {

        height: 300,
        width: 300,
        top: 20,
        opacity: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        margin: 30,
        height: 60,
    },
    titleContainer: {
        borderWidth: 4,
        borderColor: Colors.primary,
        padding: 20,
        width: "60%",
        borderRadius: 100
    },
    title1: {
        fontSize: 15,
        textAlign: "center",
        color: Colors.primary,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    title2: {
        fontSize: 30,
        textAlign: "center",
        color: Colors.secondary,
        fontWeight: "bold",
    }
})