import {MeQuery, useMeQuery} from '../service/apollo/generated';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';

export type Me = MeQuery['me'];

export const useMe = () => {
    const {data} = useMeQuery();
    const {i18n} = useTranslation();

    // setup everything based on user data
    useEffect(() => {
        if (!data?.me?.language) {
            return;
        }

        i18n.changeLanguage(data.me.language);
    }, [data, i18n]);

    return {me: data?.me!};
};
