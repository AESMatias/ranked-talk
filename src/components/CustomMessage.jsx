import React from 'react';
import { View, Text } from 'react-native';
import { Bubble, MessageText, Time } from 'react-native-gifted-chat';

export const CustomMessage = ({ currentMessage }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{currentMessage.user.name}</Text>
                <Time textStyle={{ textAlign: 'right' }} time={currentMessage.createdAt} />
            </View>
            <Bubble
                {...this.props}
            >
                <MessageText {...this.props} />
            </Bubble>
        </View>
    );
};