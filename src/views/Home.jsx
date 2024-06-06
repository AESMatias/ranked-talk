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

const Home = ({ ...props }) => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth).catch(error => console.log('Error at logging out: ', error));
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
            ),
            headerLeft: () => (
                <FontAwesome5 name="home" size={20} color='white' style={{ marginLeft: 20 }} />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.containerHome}>
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
                    onPress={() => navigation.navigate("Estimates")}
                    style={styles.menuButton} >
                    <Entypo name="menu" size={30} color={colors.lightGray} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("PDF")}
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
    );
};

export default Home;

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
    },
    welcomeText:
    {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '800',
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