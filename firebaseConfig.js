// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { browserSessionPersistence, signInWithEmailAndPassword, getAuth, setPersistence } from "firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import * as WebBrowser from 'expo-web-browser';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//TODO: To create the apk> eas build -p android --profile preview

export const firebaseConfig = {
    apiKey: "AIzaSyAIVEw-sU8j_7EFkojb-WyWPkJjpIHP4c4",
    authDomain: "ratetalkproject.firebaseapp.com",
    projectId: "ratetalkproject",
    storageBucket: "ratetalkproject.appspot.com",
    messagingSenderId: "734984149670",
    appId: "1:734984149670:web:08803a552603955b587267",
    measurementId: "G-EXMKPB0FN9"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage();

// WebBrowser.maybeCompleteAuthSession();


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});




export const CheckAuthStorage = async () => {

    try {
        const userData = await AsyncStorage.getItem('auth');
        const formattedUser = await JSON.parse(userData);

        if (formattedUser !== null) {
            return formattedUser;
        }
    } catch (error) {
        console.error('Error at checkAuthStorage', error);
        return null;
    }
};

CheckAuthStorage();

// export const analytics = getAnalytics(app);

