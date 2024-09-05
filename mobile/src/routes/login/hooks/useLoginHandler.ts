import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SET_TOKEN} from '../../../service/auth/Auth';
import {useRedirectToRightScreen} from './useRedirectToRightScreen';
import {useCallback} from 'react';
import {SERVER_URL, WEB_CLIENT_ID} from '../../../service/consts/consts';
import {handlerError} from '../../../service/errorHandler';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {showMessage} from 'react-native-flash-message';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
});

export const useLoginHandler = () => {
    const {redirect} = useRedirectToRightScreen();

    const loginHandler = useCallback(async () => {
        try {
            let user;

            try {
                const data = await GoogleSignin.signIn();
                user = data.user;
            } catch (e) {
                // ignored
            }

            if (!user) {
                return;
            }

            const loginResult: Response | void = await fetch(
                `${SERVER_URL}/user/loginGoogle`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        googleId: user.id,
                        email: user.email,
                        name: user.givenName || user.name,
                        photoUrl: user.photo,
                    }),
                },
            ).catch(handlerError);

            if (!loginResult || !loginResult.ok) {
                showMessage({
                    message:
                        'Cannot login. Please, try with another sign in method',
                    type: 'warning',
                    duration: 4000,
                });

                return;
            }

            SET_TOKEN(await loginResult.text());

            redirect();
        } catch (e) {
            handlerError(e);
        }
    }, [redirect]);

    const loginAppleHandler = useCallback(async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL],
            });

            const {user, email} = appleAuthRequestResponse;

            const loginResult: Response | void = await fetch(
                `${SERVER_URL}/user/loginApple`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        appleUserId: user,
                        email,
                    }),
                },
            ).catch(handlerError);

            if (!loginResult || !loginResult.ok) {
                showMessage({
                    message:
                        'Cannot login. Please, try with another sign in method',
                    type: 'warning',
                    duration: 4000,
                });

                return;
            }

            SET_TOKEN(await loginResult.text());

            redirect();
        } catch (e) {
            // ignored
        }
    }, [redirect]);

    return {loginHandler, loginAppleHandler};
};
