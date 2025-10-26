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
                <Image source={bubble5} style={styles.bubble5} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepText: {
        fontSize: 14,
        color: '#000',
    },
    skipText: {
        marginTop: 30,
        fontSize: 14,
        color: '#000',
        marginRight: 10,
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    bubble4: {
        top: -115,
        left: -188,
        width: 373,
        height: 443,
        resizeMode: 'contain',
        zIndex: 0,
    },
    bubble5: {
        position: 'absolute',
        top: -140,
        left: -188,
        width: 334,
        height: 339,
        resizeMode: 'contain',
        zIndex: 1,
    },
    betball: {
        position: 'absolute',
        top: 202,
        left: 88,
        width: 199,
        height: 199,
        resizeMode: 'contain',
        zIndex: 10,
    },
    textContainer: {
        flex: 2,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    bottomRow: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    getStartedButton: {
        backgroundColor: '#388EFF',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        marginBottom: 20,
    },
    getStartedText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#000',
        width: 20,
    },
    nextText: {
        fontSize: 14,
        color: '#388EFF',
        marginBottom: 20,
    },
});
