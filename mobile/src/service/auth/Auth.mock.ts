import {LaunchArguments} from 'react-native-launch-arguments';

export const SET_TOKEN = (inputToken: string) => {};

export const REMOVE_TOKEN = () => {};

export const GET_TOKEN = () => {
    const user = LaunchArguments.value<{user: 'man' | 'woman'}>().user;
    return tokens[user];
};

export const GET_TOKEN_ASYNC = async () => {
    return GET_TOKEN();
};

const tokens = {
    man: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY2Mzc1NDEwNSwiZXhwIjoxNjY2MzQ2MTA1fQ.rkuUicgpOjYv0Z7nU7fD2IHXMoTHXDrZeAMaYojO-ag',
    woman: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImlhdCI6MTY2Mzc1NDAwNiwiZXhwIjoxNjY2MzQ2MDA2fQ.pFS2jTCje_6cf-Pq6LriUNguYfp7mbiZZoxTN8dHgaE',
};
