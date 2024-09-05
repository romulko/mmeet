import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {cleanupFCM} from '../fcm';
import {LOGIN} from '../../routes/routes';
import {client} from '../apollo/client';

let token: string | null = null;

export const SET_TOKEN = (inputToken: string) => {
    AsyncStorage.setItem('token', inputToken);
    token = inputToken;
};

export const REMOVE_TOKEN = () => AsyncStorage.removeItem('token');

export const GET_TOKEN = () => token;

export const GET_TOKEN_ASYNC = async () => {
    const savedToken = await AsyncStorage.getItem('token').catch(reason =>
        console.error('AsyncStorage.getItem', reason),
    );
    token = savedToken || null;
    return savedToken;
};

GET_TOKEN_ASYNC();

export const logOut = async () => {
    await GoogleSignin.signOut();
    await client.clearStore();
    await REMOVE_TOKEN();
    await cleanupFCM();
};
