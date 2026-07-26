import React from 'react';
import { View, Text } from 'react-native';

export const BookingHeader = (props: any) => {
    return (
        <View>
            <Text>{props.title || 'Booking'}</Text>
        </View>
    );
};
