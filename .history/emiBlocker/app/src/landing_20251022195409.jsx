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
        <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            {/* Top Section */}
            <View style={styles.topRow}>
                <Text style={styles.stepText}>1/3</Text>
                <Link href="./landing2" asChild>
                    <TouchableOpacity>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Image Section */}
            <View style={styles.imageContainer}>
                {/* <Image source={bubble5} style={styles.bubble5} /> */}
                {/* <Image source={bubble4} style={styles.bubble4} /> */}
                {/* <Image source={betball} style={styles.betball} /> */}
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>Level Up !!!</Text>
                <Text style={styles.subtitle}>
                    Welcome to 10X Glory{"\n"}
                    Level up your adventure – Start by grabbing{"\n"}
                    your opportunities
                </Text>
            </View>

            {/* Bottom Buttons and Dots */}
            <View style={styles.bottomRow}>
                <Link href="../login/login" asChild>
                    <TouchableOpacity style={styles.getStartedButton}>
                        <Text style={styles.getStartedText}>Get Started</Text>
                    </TouchableOpacity>
                </Link>

                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                <Link href="./landing2" asChild>
                    <TouchableOpacity>
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    );
}

