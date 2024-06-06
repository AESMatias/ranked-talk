import React, { useEffect } from 'react';
import {
    Modal as RNModal, KeyboardAvoidingView,
    View, Text, StyleSheet, TouchableOpacity, Button,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../generalColors.js';
import { playSound } from '../utils/tapSound.jsx';
import { ToastAndroid } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export const UserModal = ({ isModalOpen, withInput, userToSee, children, ...props }) => {
    const navigation = useNavigation();



    const { onRequestClose } = props;

    const handleCloseButton = () => {
        onRequestClose();
    }

    const handleAddFriend = () => {
        onRequestClose();
        playSound();
        ToastAndroid.show(`Request send to ${userToSee.username}`, ToastAndroid.SHORT);
    }


    const handleSendMessage = () => {
        onRequestClose();
        playSound();
        ToastAndroid.show(`Message request send to ${userToSee.username}`, ToastAndroid.SHORT);

    }

    const content = withInput ? (
        <View style={styles.modalContent}>
        < KeyboardAvoidingView behavior='height' style={styles.modalContent} >
            {children}

            < Text style={styles.text} >
                {userToSee.username}
            </Text >
            <Image source={{ uri: userToSee.avatar }} style={styles.profileImage} />

<TouchableOpacity onPress={handleAddFriend}>
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={['hsl(120, 80%, 50%)', 'hsl(120, 100%, 15%)']}
        style={styles.buttonAddFriend}
    >
        <Text style={styles.buttonText}>
            Add {userToSee.username} as friend
        </Text>
    </LinearGradient>
</TouchableOpacity>


<TouchableOpacity onPress={handleSendMessage}>
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={['hsl(25, 100%, 50%)', 'hsl(45, 90%, 50%)']}
        style={styles.buttonSendMessage}
    >
        <Text style={styles.buttonText}>
            Private Message
        </Text>
    </LinearGradient>
</TouchableOpacity>

            <TouchableOpacity onPress={handleCloseButton}>
                        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={['hsl(0, 100%, 50%)', 'hsl(360, 100%, 0%)']}
        style={styles.button_close}
    >
                <Text style={styles.buttonTextClose}>
                    <FontAwesome name="close" size={30} color="white" />
                </Text>
            </LinearGradient>
            </TouchableOpacity>

        </KeyboardAvoidingView >
        </View>
    ) : (
        <View style={styles.modalContent}>

            {children}
            <Text style={styles.text}>
                Error, please try again later (Modal without content!)
            </Text>
        </View>
    );

    return (
        <RNModal
            visible={isModalOpen}
            transparent
            style={{backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            animationType='slide'
            statusBarTranslucent
            {...props}
        >
      <LinearGradient
        colors={['hsl(220,90%,15%)', 'rgba(10,10,10,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.15 }}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>{content}</View>
      </LinearGradient>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    buttonSendMessage: {
        padding: 3,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 12,
        width: '70%',
        height: 50,
        maxWidth: 1000,
        alignSelf: 'center',
    },
    profileImage: {
        width: 250,
        height: 250,
        borderRadius: 50,
        borderWidth: 0.4,
        borderColor: 'white',
        alignSelf: 'center',
        marginVertical: 60,
        //hacemos un fit 
        resizeMode: 'contain'
    },
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'end',
        alignItems: 'stretch',
        backgroundColor: colors.backgroundDense,
        borderRadius: 0,
        width: '100%',
        marginTop: 90,

    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        
    },
    
    button_close: {
        padding: 10,
        borderColor: 'white',
        borderRadius: 500,
        borderWidth: 0,
        width: '15%',
        height: 60,
        maxWidth: 60,
        marginTop: 25,
        marginRight: 50,
        alignSelf: 'flex-end',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        textShadowColor: 'black', // Color del borde
        textShadowOffset: { width: 0.5, height: 0.5 }, // Desplazamiento del borde
        textShadowRadius: 0.1, // Radio del borde
    },
    buttonTextClose : {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 7,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonAddFriend: {
        padding: 3,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 5,
        width: '70%',
        height: 50,
        maxWidth: 1000,
        alignSelf: 'center',
    },
});
