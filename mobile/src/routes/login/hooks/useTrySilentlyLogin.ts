import {useEffect, useState} from 'react';
import {GET_TOKEN_ASYNC, REMOVE_TOKEN} from '../../../service/auth/Auth';
import {useRedirectToRightScreen} from './useRedirectToRightScreen';
import {SERVER_URL} from '../../../service/consts/consts';

/**
useTrySilentlyLogin uses token to login. The algorithm is next:
 - mobile checks if it has saved token
 - if yes = it sends the token to auth/validateToken endpoint
 - if server answers token is valid = mobile redirects to home page
 */
export const useTrySilentlyLogin = () => {
    const [loading, setLoading] = useState(true);
    const {redirect} = useRedirectToRightScreen();

    useEffect(() => {
        const tryLogin = async () => {
            const token = await GET_TOKEN_ASYNC();

            if (!token) {
                REMOVE_TOKEN();
                setLoading(false);
                return;
            }

            try {
                console.log('Trying to validate token: ', token);

                const response = await fetch(
                    `${SERVER_URL}/auth/validateToken?token=${token}`,
                );

                const isTokenValid = JSON.parse(await response.text());

                if (isTokenValid) {
                    redirect();
                } else {
                    REMOVE_TOKEN();
                    setLoading(false);
                }
            } catch (e) {
                console.warn('Cannot reach the server');

                setLoading(false);
            }
        };

        tryLogin();
    }, [redirect]);

    return {loading};
};
