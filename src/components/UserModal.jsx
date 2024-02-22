import React, { useEffect } from 'react';
import {
    Modal as RNModal, KeyboardAvoidingView,
    View, Text, StyleSheet, TouchableOpacity, Button,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../generalColors.js';
import { playSound } from '../utils/tapSound.jsx';


export const UserModal = ({ isModalOpen, withInput, userToSee, children, ...props }) => {

    const { onRequestClose } = props;
    const handleCloseButton = () => {
        playSound();
        onRequestClose();
    }

    const content = withInput ? (

        < KeyboardAvoidingView behavior='height' style={styles.modalContent} >
            {children}

            < Text style={styles.text} >
                {userToSee.username}
            </Text >
            <Image source={{ uri: userToSee.avatar }} style={styles.profileImage} />


            <TouchableOpacity onPress={handleCloseButton}
                style={styles.button}>
                <Text style={styles.button_text}>
                    <FontAwesome name="close" size={20} color="white" />
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    ) : (
        <View style={styles.modalContent}>

            {children}
            <Text style={styles.text}>
                MODAL WITH CONTENT IN THE MODAL!
            </Text>
        </View>
    );

    return (
        <RNModal
            visible={isModalOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...props}
        >
            {content}
        </RNModal>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 280,
        height: 280,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        marginVertical: 30,
        //hacemos un fit 
        resizeMode: 'contain'
    },
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: colors.background,
        borderRadius: 0,
        paddingVertical: 200,
        width: '100%',
        marginTop: 90,

    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: 'rgba(220,40,50,1)',
        padding: 10,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 0.5,
        marginTop: 10,
        width: '80%',
        maxWidth: 1000,
        marginTop: 70,
        alignSelf: 'center',
    },
    button_text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});
