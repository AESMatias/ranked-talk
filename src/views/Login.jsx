import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";
import { colors } from '../../generalColors.js';
// const backImage = require("../assets/backImage.png");

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login success"))
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            {/* <Image source={backImage} style={styles.backImage} /> */}
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Rate Talk App</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={styles.buttonText}> Log in</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't you have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.linkDown}> Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
const styles = StyleSheet.create({
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
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        backgroundColor: '#fff',
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