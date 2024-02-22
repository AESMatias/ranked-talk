import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Button, TextInput, Image,
    SafeAreaView, TouchableOpacity, StatusBar, Alert, useCallback
} from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import _ from 'lodash';
import { addDoc, setDoc, collection, doc } from 'firebase/firestore';
import { database } from '../../firebaseConfig.js';
import { colors } from '../../generalColors.js';
import { playSound } from '../utils/tapSound.jsx';


export default function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        playSound();
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log(username, email, 'id', auth.currentUser.uid, auth.currentUser)
                    const userDocRef = doc(database, "users", auth.currentUser.uid);
                    const userUID = auth.currentUser.uid;
                    const userData = { username, email, userUID };
                    setDoc(userDocRef, userData)
                    console.log('Register sucessful!', auth.currentUser);
                    Alert.alert('Register sucessful!', username);
                })

                .catch((err) => Alert.alert("Error at register:", err.message));

            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: username,
            });
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.form}>
                <Image style={styles.logo} source={require('../../assets/icon.png')} />
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize="none"
                    autoFocus={true}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Register</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Do you have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        playSound();
                        navigation.navigate("Login")
                    }}>
                        <Text style={styles.linkDown}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',

    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.promptPanel,
        alignSelf: "center",
        paddingBottom: 24,
    },
    linkDown: {
        color: '#ff0000',
        fontWeight: '800',
        fontSize: 15
    },
    input: {
        backgroundColor: colors.inputBackground,
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: colors.promptPanel,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
});