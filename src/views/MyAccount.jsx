import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { colors } from '../../generalColors.js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, database } from '../../firebaseConfig.js';
import { doc, getDoc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebaseConfig.js';
import { UserContext } from '../../App.js';
import { updateProfile } from 'firebase/auth';
import { useContext } from 'react';
import { playSound } from '../utils/tapSound.jsx';


export const MyAccount = ({ navigation }) => {

    const [imageState, setImageState] = useState(null);
    const { user } = useContext(UserContext);
    // console.error('User: ', user);
    useEffect(() => {
        // Once the component is mounted, the image is downloaded
        // from the firebase Storage
        playSound();
        downloadImage();
    }, []);

    const selectImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            selectionLimit: 1,
        });
        if (!image.cancelled) {
            returnedImage = await uploadImage(image.assets[0].uri);
            setImageState(image.assets[0].uri);
            changePhotoURL(image.assets[0].uri);
        }
    }

    const changePhotoURL = async (urlNewImage) => {
        const user = auth.currentUser;
        try {
            const newPhotoURL = urlNewImage;
            await updateProfile(user, {
                photoURL: newPhotoURL,
            });
            console.log('Photo URL updated successfully:', urlNewImage);
        } catch (error) {
            console.error('Error updating photo URL:', error);
        }
    };

    const uploadImage = async (fileUri) => {

        const metadata = {
            contentType: 'image/jpeg' // MIME type of the file
        };

        const storageRef = ref(storage, `users/${auth.currentUser.uid}/profileImage.jpg`);
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log('Upload is done');
            },
            (error) => {
                console.log('Error at uploading the image', error);
            },
            () => {
                console.log('Image uploaded');
            }
        );
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                return downloadURL;
            })
        };
    }

    const downloadImage = async () => {
        const storageRef = ref(storage, `users/${auth.currentUser.uid}/profileImage.jpg`);
        const url = await getDownloadURL(storageRef);
        setImageState(url);
        console.log(url);
    }

    const [userData, setUserData] = useState(null) // The actual user data

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
        });
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(database, "users", auth.currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUserData(userDocSnapshot.data());
                    console.log("User data: ", userDocSnapshot.data());
                } else {
                    console.log("The document of the user does not exist Chat.jsx");
                }
            } catch (error) {
                console.error("Error obtaining the data user at Chat.jsx", error.message);
            }
        };

        fetchUserData();
    }, []);


    return (
        <View style={styles.background}>
            <Text style={styles.text}>{userData?.username}</Text>
            <Image source={{ uri: imageState }} style={styles.image} />
            <Button title="Update Profile Image" onPress={selectImage} />
        </View>
    )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5,10,15,0.97)',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        margin: 50
    }
})