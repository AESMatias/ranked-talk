import { StyleSheet, Text, View, Button, Image, Alert, ToastAndroid } from 'react-native'
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
import { LinearGradient } from 'expo-linear-gradient';
import HeaderBackground from '../components/HeaderBackground';

export const MyAccount = ({ navigation }) => {

    const [imageState, setImageState] = useState(null);
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null) // The actual user data
    const defaultImage = 'https://github.com/AESMatias/ranked-talk/blob/main/assets/icon.png?raw=true';


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
            await downloadImage();
            await updateProfile(user, {
                photoURL: imageState,
            });
            console.log('Photo URL updated successfully:', imageState);
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
        //TODO: Fix the image reload, the code line below is not working
        downloadImage();
        navigation.navigate('MyAccount');
        ToastAndroid.show('Image changed, please reload the page', ToastAndroid.SHORT);
    }

    const downloadImage = async () => {
        const storageRef = ref(storage, `users/${auth.currentUser.uid}/profileImage.jpg`);
        const url = await getDownloadURL(storageRef);
        // Actualizar el URL de la imagen
        console.log('User updated with the new image URL:', url);
        await updateProfile(user, {
            photoURL: url,
        });
        setImageState(url);
    }

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background, // Not in use
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
            },
            headerBackground: () => <HeaderBackground />,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: `RateTalk - My Account`,
            headerTitleStyle: {
                fontWeight: 'bold', // Agrega negrita al título
              },
        });
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(database, "users", auth.currentUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUserData(userDocSnapshot.data());
                    console.log("User data: ", userDocSnapshot.data());
                    const res = await downloadImage();
                } else {
                    console.log("The document of the user does not exist Chat.jsx");
                }
            } catch (error) {
                console.error("Error obtaining the data user at MyAccount.jsx", error.message);
                // console.alert('No image found, setting default image: ',error)
                returnedImage = await uploadImage(defaultImage);
                setImageState(returnedImage);
                console.log('Image state:', imageState)
            }
        };
        fetchUserData();
    }, []);

    return (
        <View style={styles.background}>
            <Text style={styles.text}>{userData?.username}</Text>

            <TouchableOpacity onPress={selectImage}>
                <Image source={{ uri: imageState }} style={styles.image}/>
            </TouchableOpacity>
            {/* <TouchableOpacity title="Update Profile Image" onPress={selectImage}>
                <Text style={styles.textButtonUpload}>Update Profile Image</Text>
            </TouchableOpacity> */}
        <TouchableOpacity onPress={selectImage}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                colors={['hsl(210, 80%, 50%)', 'hsl(210, 100%, 15%)']}
                style={styles.buttonUpdateProfile}
            >
                <Text style={styles.buttonText}>
                    Update Profile Image
                </Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: 230,
        height: 70,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E90FF', // Color de fondo azul oscuro
        borderWidth: 2,
        borderColor: '#4169E1', // Color del borde azul más claro
        shadowColor: '#000000', // Color de la sombra
        shadowOpacity: 0.5, // Opacidad de la sombra
        shadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
        shadowRadius: 5, // Radio de la sombra
        elevation: 5, // Elevación para efecto de elevación en Android
      },
      buttonText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 0,
        fontWeight: 'bold',
        alignSelf: 'center',
        textShadowColor: 'black', // Color del borde
        textShadowOffset: { width: 0.5, height: 0.5 }, // Desplazamiento del borde
        textShadowRadius: 0.1, // Radio del borde
        height: 60,
        width: 250,
      },
      buttonUpdateProfile: {
        padding: 3,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 5,
        maxWidth: 1000,
        alignSelf: 'center',
    },
    
    // textButtonUpload: {
    //     color: 'white',
    //     fontSize: 25,
    //     fontWeight: '900',
    //     backgroundColor: 'rgb(20, 60, 220)',
    //     padding: 1,
    //     borderRadius: 50,
    //     borderBottomWidth: 1,
    //     borderLeftWidth: 0.5,
    //     borderRightWidth: 0.5,
    //     borderTopWidth: 1,
    //     borderColor: 'white',
    //     textAlignVertical: 'center',
    //     textAlign: 'center',
    //     width: 280,
    //     height: 80,
    //     // Definir el degradado
    //     // backgroundColor: 'transparent',
    //     // backgroundImage: 'linear-gradient(45deg, rgb(20, 60, 220), rgb(120, 30, 220))',
    // },
    background: {
        flex: 1,
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
        width: 250,
        height: 250,
        borderRadius: 500,
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 50
    }
})