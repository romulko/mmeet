import {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {SERVER_URL} from '../../../service/consts/consts';
import {useMe} from '../../../state/useMe';

export const useRegisterFCMToken = () => {
    const {me} = useMe();

    // in case we update me we don't need to trigger again register function
    const isFCMRegistered = useRef(false);

    useEffect(() => {
        if (!me || isFCMRegistered.current) {
            return;
        }

        const register = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                const fcmToken = await messaging().getToken();

                if (!fcmToken) {
                    return;
                }

                saveFCMToken(fcmToken);

                fetch(`${SERVER_URL}/user/fcmToken`, {
                    method: 'PUT',
                    body: JSON.stringify({userId: me.id, fcmToken}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }

            isFCMRegistered.current = true;
        };

        register();
    }, [me]);
};

const saveFCMToken = async (fcmTokenNew: string) => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken === fcmTokenNew) {
        return;
    }

    AsyncStorage.setItem('fcmToken', fcmTokenNew);
};
