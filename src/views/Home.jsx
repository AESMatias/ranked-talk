import React, { useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';;
import { colors } from '../../generalColors.js';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig.js';
import { signOut } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderBackground from '../components/HeaderBackground';
import { FontAwesome6 } from '@expo/vector-icons';
import { Share } from 'react-native';
import { Linking } from 'react-native';
import { playSound } from '../utils/tapSound.jsx';
import {LinearGradient} from 'expo-linear-gradient';

const Home = ({ ...props }) => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth).catch(error => console.log('Error at logging out: ', error));
    };

    
        const URL = 'https://play.google.com/store/apps/details?id=com.aesmatias.ratetalkapp'
    
        const onShare = async () => {
    

            playSound();
    
            try {
                const result = await Share.share({
                    message:
                        `Rate Talk App! Try it now on the Play Store! ${URL}`,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        };
    
        const openPlayStoreForRating = async () => {
            playSound();

    
            const packageName = 'com.aesmatias.ratetalkapp';
            const playStoreUrl = `market://details?id=${packageName}`;
    
            try {
                await Linking.openURL(playStoreUrl);
            } catch (error) {
                console.error('Error at opening the application on Play Store:', error);
            }
        };

    
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.primary,//
                borderBottomWidth: 1,
                borderBottomColor: 'white',
            },
            headerBackground: () => <HeaderBackground />,
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: `RateTalk - Home`,
            headerTitleStyle: {
                fontWeight: 'bold', // Agrega negrita al título
              },
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={handleSignOut}
                >
                    <MaterialCommunityIcons name="exit-to-app" size={30} color='white' />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <LinearGradient
        colors={['hsl(210, 100%, 5%)', 'hsl(210, 60%, 70%)', 'hsl(210, 100%, 10%)']}
        style={styles.containerHome}
      >
        <View >
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                    {`Welcome to Ranked Talk!`}
                </Text>
                <Image
                    style={styles.image}
                    source={require('../../assets/icon.png')}
                />

            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("My Account")}
                    style={styles.accountButton} >
                    <MaterialIcons name="account-circle" size={45} color={colors.lightGray} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("LocationsPUCSJ")}
                    style={styles.menuButton} >
                    <FontAwesome6 name="map" size={30} color={colors.lightGray} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => openPlayStoreForRating()}
                    style={styles.menuButton} >
                    <Entypo name="star" size={30} color={colors.lightGray} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton} >
                    <Entypo name="chat" size={30} color={colors.lightGray} />
                </TouchableOpacity>

            </View>

        </View>
        </LinearGradient>
    );
};

export default Home;

const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '45%',
        marginBottom: 0,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        bottom: 0,
        marginTop: '40%',
    },
    welcomeText:
    {
        
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        textShadowColor: 'rgba(0,0,0,1)', // Colour of the shadow
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 10, // Radius of the shadow
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        width: '100%',
    },
    image: {
        width: 200, height: 200,
        alignSelf: 'center', borderRadius: 10, marginTop: 50
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        backgroundColor: colors.background,
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        marginRight: 30,
        marginBottom: 50,
    },
    menuButton: {
        backgroundColor: colors.primary,
        height: 60,
        width: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        marginRight: 0,
        marginBottom: 0,
    },
    accountButton: {
        backgroundColor: colors.primary,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        marginLeft: 30,
        marginBottom: 50,
    }
});