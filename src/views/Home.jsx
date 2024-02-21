import React, { useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';;
import { colors } from '../../generalColors.js';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig.js';
import { signOut } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = ({ ...props }) => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth).catch(error => console.log('Error at logging out: ', error));
    };

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
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
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={30} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        backgroundColor: colors.mediumGray,
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
    }
});