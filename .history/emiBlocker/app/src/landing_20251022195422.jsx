import React, { useRef } from 'react';
import { Link, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    PanResponder,
    Animated,
} from 'react-native';
import betball from '../assets/betball.png';
import bubble4 from '../assets/bubble4.png';
import bubble5 from '../assets/bubble5.png';

export default function Landing() {
    const router = useRouter();
    // const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Trigger on horizontal swipe (only detect left/right)
                return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 50;
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -50) {
                    // Swiped Left
                    router.push('./landing2'); // or wherever you want to go
                }
            },
        })
    ).current;

    return (
         <TextV
    );
}

