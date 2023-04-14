import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Alert } from 'react-native';
import MainScreen from './components/screens/MainScreen';
import Login from './components/screens/user/Login';
import ButtonPrimary from './components/utilities/ButtonPrimary';
import { Colors } from './components/utilities/Colors';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createContext, useLayoutEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig/firebase.config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InnerScreen from './components/screens/InnerScreen';
import Profile from './components/screens/Profile';
import { BACKEND_URI } from '@env'
import Details from './components/screens/Details';
import CommentScreen from './components/screens/CommentScreen';
import LoadTimeScreen from './components/screens/LoadTimeScreen';


// create context API
const Stack = createNativeStackNavigator();
export const AuthContext = createContext('')

export default function App() {
  let [user, setUser] = useState(null)
  let [loading, setLoading] = useState(true)

  const auth = getAuth(app)

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        fetch(BACKEND_URI + `/user-info?email=${currentUser?.email}`)
          .then(res => res.json())
          .then(data => {
            setUser(data)
            setLoading(false)
            console.log(loading);
          })
          .catch(err => {
            setUser(null)
            setLoading(false)
          });
      }
      else {
        setUser(null)
        setLoading(false)
      }
    }
    )
  }, [])

  // register new USER
  let registerUser = async (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  let updateUser = async (profileInfo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, profileInfo)
  }

  let loginUser = async (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  let logoutUser = async (email, password) => {
    setLoading(true)
    return signOut(auth)
  }


  let contextValue = {
    user, loading, setLoading, registerUser, loginUser, setUser, updateUser, logoutUser
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={contextValue}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoadTimeScreen" component={LoadTimeScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="InnerScreen" component={InnerScreen} />
          <Stack.Screen name="CommentScreen" component={CommentScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
  // return (
  //   <ImageBackground
  //     source={require('./assets/images/tom_and_jerry_PNG66.png')}
  //     imageStyle={{ opacity: 0.2 }}
  //     style={styles.container}

  //   >
  //     <SafeAreaView style={styles.safeStyle}>
  //       <Login />
  //     </SafeAreaView>
  //   </ImageBackground>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  safeStyle: {
    width: "100%",

  }
});
