import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
    const router = useRouter();
    const [render, setRender] = useState(false);

    const moveTo = () => {

        const timeout = setTimeout(() => {

            router.replace('/src/pages/H'); // ⏩ Navigate after 5s
        }, 1000); // 5 seconds
        setRender(true);

    }

    return (



        <View style={styles.container}>
            {
                render ?
                    (
                        <ActivityIndicator size="large" color="#007AFF" />
                    )
                    :
                    (
                        moveTo()
                    )
            }

        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
