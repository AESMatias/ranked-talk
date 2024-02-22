import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, MessageText, Time } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../firebaseConfig.js';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { colors } from '../../generalColors.js';
import { UserModal } from '../components/UserModal.jsx';
import { playSound } from '../utils/tapSound.jsx';
// import { CustomMessage } from '../components/CustomMessage';


// export const CustomMessage = ({ currentMessage }) => {
//     return (
//         <View>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Text>{currentMessage.user.name}</Text>
//                 <Time textStyle={{ textAlign: 'right' }} time={currentMessage.createdAt} />
//             </View>
//             <Bubble
//                 {...this.props}
//             >
//                 <MessageText {...this.props} />
//             </Bubble>
//         </View>
//     );
// };

export default function Chat({ navigation }) {

    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null) // The actual user data
    const [isModalOpen, setIsModalOpen] = useState(false);
    [userToSee, setUserToSee] = useState(null);


    useEffect(() => {
        playSound();
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


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
            },
            headerTitle: `Chat ${userData ? `- ${userData?.username}` : ''}`,
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        });

    }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(database, 'chat');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            // console.log('Snapshot updated: ', querySnapshot.docs[0].data());
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    //TODO: Conditional rendering here, only if the user is the same as the current user
                    text: `${doc.data().user.username}:\n${doc.data().text}`,
                    user: doc.data().user,
                }))
            );
        });
        return unsubscribe;
    }, []);

    const sendMessage = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        const modifiedUser = {
            ...user,
            _id: auth?.currentUser?.uid,
        };
        // We send the user without the email, for security reasons
        addDoc(collection(database, 'chat'), { _id, text, user: modifiedUser, createdAt, });
    }, [])



    return (
        isModalOpen ? (
            <UserModal
                id='modal_id'
                isModalOpen={isModalOpen}
                withInput
                onRequestClose={() => setIsModalOpen(false)}
                userData={userData}
                userToSee={userToSee}
            />
        ) : (
            messages.length > -1 ? ( //TODO: Explain -1
                <GiftedChat
                    messages={messages}
                    showUserAvatar={true}
                    onSend={messages => sendMessage(messages)}
                    messagesContainerStyle={{
                        backgroundColor: colors.backgroundDense,
                    }}
                    textInputStyle={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        paddingHorizontal: 5,
                        marginRight: 10
                    }}
                    user={{
                        _id: auth?.currentUser?.uid,
                        avatar: auth?.currentUser?.photoURL,
                        username: userData?.username,
                    }}
                    isLoadingEarlier={true}
                    onPressAvatar={(user) => {
                        playSound();
                        setIsModalOpen(true);
                        setUserToSee(user);
                        console.log('message', user)
                    }}
                    onLongPress={(context, message) => {
                        console.log('User Info:', message.user);
                    }}
                    onPress={() => console.log('Message pressed')}
                // renderUsernameOnMessage={true} TODO: Fix the username rendering
                />
            ) : (
                <View style={{ backgroundColor: colors.background, flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size={100} color="#ffffff" />
                    <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 18, color: 'white', marginTop: 10 }}>
                        Loading messages...
                    </Text>
                </View>
            )
        )
    );
}