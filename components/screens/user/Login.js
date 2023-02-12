import { StyleSheet, Text, View, TextInput, ImageBackground, Alert, StatusBar, ToastAndroid, ActivityIndicator } from 'react-native'
import { StackActions } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import ButtonPrimary from '../../utilities/ButtonPrimary'
import ButtonLink from '../../utilities/ButtonLink'
import Register from './Register'
import { Colors } from '../../utilities/Colors'
import { AuthContext } from '../../../App'
import { BACKEND_URI } from '@env'
const Login = ({ navigation, route }) => {

    let { setUser, loading, loginUser, setLoading, user } = useContext(AuthContext)
    let [regShow, setRegShow] = useState(route?.params?.reg || false)
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let [err, setErr] = useState('')

    useLayoutEffect(() => {
        setEmail('')
        setErr('')
        setPass('')
    }, [])

    let emailHandler = (e) => {
        setEmail(e)
    }
    let passHandler = (e) => {
        setPass(e)
    }

    let loginHandler = () => {
        if (!pass || !email) {
            setErr("Please provide all information")
            return
        } else if (!email.includes('@')) {
            setErr("Enter valid email")
            return
        }

        loginUser(email, pass)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                fetch(BACKEND_URI + `/user-info?email=${currentUser.email}`)
                    .then(res => res.json())
                    .then(data => {
                        setUser(data)
                        setLoading(false)
                        navigation.dispatch(
                            StackActions.replace('InnerScreen')
                        );
                    })
            })
            .catch((error) => {
                Alert.alert("Login Failed", error.code, [{ text: "Okay" }])
                setLoading(false)
            });
        setErr('')
        setEmail('')
        setPass('')
    }
    if (!loading && user) {
        ToastAndroid.show('User already logged in', ToastAndroid.SHORT);
        navigation.dispatch(
            StackActions.replace('InnerScreen')
        );
    }
    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: Colors.backgroundColor, }}>
            <ImageBackground
                source={require('../../../assets/images/tom_and_jerry_PNG66.png')}
                imageStyle={{ opacity: 0.2, left: 30 }}
                style={styles.imageBack}
                resizeMode="contain"
            >
                {
                    loading ? <ActivityIndicator size={50} color="green" /> :
                        <View style={styles.container}>
                            <Text style={styles.heading}>Log In</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                inputMode="email"
                                kerBoardType="email-address"
                                value={email}
                                onChangeText={emailHandler}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry={true}
                                value={pass}
                                onChangeText={passHandler}
                            />
                            {err && <Text style={styles.errorText}>{err}</Text>}
                            <View style={styles.buttonContainer}>
                                <ButtonPrimary onPress={loginHandler}>
                                    Login
                                </ButtonPrimary>
                                <ButtonLink onPress={() => setRegShow(true)}>New Member?</ButtonLink>
                                <Register regShow={regShow} setRegShow={setRegShow} />
                            </View>
                        </View>
                }
            </ImageBackground>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: Colors.opacityHalf,
        backgroundOpacity: 0.1,
        padding: 30,
    },
    imageBack: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        borderBottomWidth: 2,
        borderColor: "lightgray",
        width: "100%",
        marginVertical: 20,
        fontSize: 15,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginVertical: 5,
        fontWeight: "bold",
        textAlign: "right",
        width: "100%"
    },
    buttonContainer: {
        height: 100,
        width: "100%",
        justifyContent: "center",
    }
})