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


export const UserModal = ({ isModalOpen, withInput, userToSee, children, ...props }) => {

    const { onRequestClose } = props;

    const handleCloseButton = () => {
        onRequestClose();
    }

    const handleAddFriend = () => {
        onRequestClose();
        ToastAndroid.show(`Request send to ${userToSee.username}`, ToastAndroid.SHORT);

    }

    const content = withInput ? (
        <View style={styles.modalContent}>
        < KeyboardAvoidingView behavior='height' style={styles.modalContent} >
            {children}

            < Text style={styles.text} >
                {userToSee.username}
            </Text >
            <Image source={{ uri: userToSee.avatar }} style={styles.profileImage} />

            <TouchableOpacity onPress={handleAddFriend}
                style={styles.buttonAddFriend}>
                <Text
                style={{textAlign:'center',
                color: 'white',
                fontSize: 15,
                textAlignVertical: 'center',
                padding: 10,
                fontWeight: 'bold',
                alignSelf: 'center'
}}>
                    Add {userToSee.username} as friend
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCloseButton}
                style={styles.button_close}>
                <Text style={styles.button_text}>
                    <FontAwesome name="close" size={30} color="white" />
                </Text>
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
            {content}
        </RNModal>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(250,10,20,0.6)',
        padding: 10,
        borderColor: 'white',
        borderRadius: 500,
        borderWidth: 0,
        marginTop: 10,
        width: '15%',
        height: 60,
        maxWidth: 60,
        marginTop: 50,
        marginRight: 25,
        alignSelf: 'flex-end',
    },
    button_text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 6,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonAddFriend: {
        backgroundColor: 'rgba(30,220,90,0.99)',
        padding: 6,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 0.5,
        marginTop: 40,
        width: '70%',
        height: 50,
        maxWidth: 1000,
        alignSelf: 'center',
    },
});
