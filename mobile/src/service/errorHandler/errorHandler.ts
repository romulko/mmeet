import {SERVER_URL} from '../consts/consts';
import {client} from '../apollo/client';
import {MeDocument, MeQuery} from '../apollo/generated';
import {Alert} from 'react-native';

export const handlerError = async (error: any) => {
    const errorStr = JSON.stringify(error, null, 2);

    console.error(errorStr);
    Alert.alert('Error', errorStr);

    const {
        data: {me},
    } = await client.query<MeQuery>({
        query: MeDocument,
    });

    fetch(`${SERVER_URL}/errorHandler/handle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: me?.id,
            error,
        }),
    });
};
