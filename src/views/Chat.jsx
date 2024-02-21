import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
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

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null) // The actual user data

    const navigation = useNavigation();

    useEffect(() => {
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
                backgroundColor: colors.lightGray,
            },
            headerTitle: `Chat ${userData ? `- ${userData?.username}` : ''}`
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
        addDoc(collection(database, 'chat'), { _id, text, user, createdAt, });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showUserAvatar={true}
            onSend={messages => sendMessage(messages)}
            messagesContainerStyle={{
                backgroundColor: colors.background,
            }}
            textInputStyle={{
                backgroundColor: 'rgba(0,0,0,0)',
                paddingHorizontal: 5,
                marginRight: 10
            }}
            user={{
                _id: auth?.currentUser?.email, //TODO: Change this to the user UID
                //TODO: and configure the permissions to only allow the user to send messages
                avatar: 'https://avatars.githubusercontent.com/u/119653204?v=4',
                username: userData?.username,
            }}
            isLoadingEarlier={true}
            onPressAvatar={user => console.log(user)}
            onLongPress={() => console.log('long press')}
            renderUsernameOnMessage={true}
        // renderMessage={messageProps => <CustomMessage {...messageProps} />}
        />
    );
}