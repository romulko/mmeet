import {useApolloClient} from '@apollo/client';
import {MeDocument, MeQuery} from '../../../service/apollo/generated';
import {HOME, REGISTRATION} from '../../routes';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useRedirectToRightScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const apolloClient = useApolloClient();

    const redirect = useCallback(async () => {
        const meResult = await apolloClient.query<MeQuery>({
            query: MeDocument,
        });

        if (meResult.data.me?.isPhotoAvailable) {
            navigation.replace(HOME);
        } else {
            navigation.replace(REGISTRATION, {replace: true});
        }
    }, [navigation, apolloClient]);

    return {redirect};
};
