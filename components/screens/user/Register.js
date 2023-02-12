import { StyleSheet, Text, ImageBackground, TextInput, Modal, SafeAreaView, View, Alert, Pressable, Button, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import ButtonPrimary from '../../utilities/ButtonPrimary'
import ButtonLink from '../../utilities/ButtonLink'
import { Colors } from '../../utilities/Colors'
import { AuthContext } from '../../../App'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IMGBB_URI, BACKEND_URI } from '@env'

const Register = ({ regShow, setRegShow }) => {
    let imgBBURI = `https://api.imgbb.com/1/upload?key=${IMGBB_URI}`
    let navigation = useNavigation()
    let { registerUser, user, loading, setLoading, setUser, updateUser, logoutUser } = useContext(AuthContext)
    let [email, setEmail] = useState('')
    let [userName, setUserName] = useState('')
    let [userNames, setUserNames] = useState('')
    let [available, setAvailable] = useState('')
    let [pass, setPass] = useState('')
    let [con, setCon] = useState('')
    let [err, setErr] = useState('')
    const [date, setDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    useLayoutEffect(() => {
        setEmail('')
        setErr('')
        setUserName('')
        setAvailable('')
        setPass('')
        setCon('')
        fetch(BACKEND_URI + '/all-users-usernames')
            .then(res => res.json())
            .then(data => setUserNames(data.userNames))
    }, [regShow])


    // date picker function
    const handlerDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        if (event.type === 'set')
            setBirthDate(currentDate.toString().slice(4, 15))
        else
            setBirthDate(null)
    };



    let emailHandler = (e) => {
        setEmail(e)
    }
    let nameHandler = (e) => {
        if (e.includes(" "))
            return setErr('Username cannot have spaces')
        setErr('')
        setUserName(e)
        let avail = userNames.indexOf(e.toLowerCase())
        if (avail === -1) setAvailable("available")
        else setAvailable("taken")
        if (e === '')
            setAvailable('')
    }
    let passHandler = (e) => {
        setPass(e)
    }
    let conHandler = (e) => {
        setCon(e)
    }

    let regHandler = () => {
        if (!pass || !con || !email || !userName) {
            setErr("Please provide all information")
            return
        } else if (!email.includes('@')) {
            setErr("Enter valid email")
            return
        } else if (pass !== con) {
            setErr("Password and Confirm do not match")
            return
        } else if (available !== "") {
            setErr("Username is not available")
            return
        }
        let userInfo = {
            userName,
            password: pass,
            birthDate,
            email,
            rating: 0
        }

        registerUser(email, pass)
            .then((userCredential) => {
                mongoDBUserEntry(userInfo)
                logoutUser()
            })
            .catch((error) => {
                Alert.alert("Registration Failed", error.code.replace('auth/', '').replaceAll('-', ' ').toUpperCase(), [{ text: "Okay" }])
                setLoading(false)
                return
            });
        setUserName('')
        setErr('')
        setEmail('')
        setPass('')
        setCon('')
        setBirthDate(null)
    }

    let mongoDBUserEntry = (userInfo) => {

        fetch(BACKEND_URI + '/insert-user', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json())
            .then(data => {
                setUser(data)
                setLoading(false)
                setRegShow(false)
                ToastAndroid.show('Registration Successful, Please Login', ToastAndroid.SHORT);
            })
    }

    return (
        <Modal visible={regShow} animationType="slide">
            <ImageBackground
                source={require('../../../assets/images/tom_and_jerry_PNG66.png')}
                imageStyle={{ opacity: 0.2, left: 30 }}
                style={styles.imageBack}
                resizeMode="contain"
            >




                <View style={styles.container}>
                    <Text style={styles.heading}>Register</Text>
                    <TextInput
                        autoCapitalize={false}
                        style={styles.textInput}
                        placeholder="User Name"
                        value={userName}
                        onChangeText={nameHandler}
                        onBlur={() => setAvailable(x => x === "available" ? '' : x)}
                    />
                    {available === "taken" && <Text style={styles.errorText}>Name is taken</Text>}
                    {available === "available" && <Text style={styles.successText}>Name is available</Text>}
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
                    <TextInput
                        autoCapitalize={false}
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        value={con}
                        onChangeText={conHandler}
                    />
                    <Pressable className="flex flex-row justify-between items-center w-full mb-3 pb-1 pt-4 border-b-2 border-gray-300" onPress={() => setShow(true)}>
                        {
                            birthDate ?
                                <Text className="text-black ">{birthDate}</Text>
                                :
                                <Text className="text-gray-400">Choose Birthdate</Text>
                        }
                        <Icon name="pluscircle" size={20} color="#9ca3af" />
                        {
                            show && <DateTimePicker
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={handlerDatePicker}

                            />
                        }
                    </Pressable>
                    {err && <Text style={styles.errorText}>{err}</Text>}
                    <View style={styles.buttonContainer}>
                        {
                            loading ?
                                <ActivityIndicator size={40} />
                                :
                                <ButtonPrimary onPress={regHandler}>
                                    Register
                                </ButtonPrimary>
                        }
                        <ButtonLink onPress={() => setRegShow(false)}
                        >
                            Old Member?
                        </ButtonLink>
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    )
}

export default Register

const styles = StyleSheet.create({
    imageBack: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    container: {
        padding: 20,
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: Colors.opacityHalf
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
    successText: {
        color: "blue",
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