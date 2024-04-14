import {ModalComp} from '../../../../../../../../components/formItem/components/modalComp';
import React from 'react';
import {Button} from '../../../../../../../../components/button';
import {Alert, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {handlerError} from '../../../../../../../../service/errorHandler';
import {useUserDeleteAccountMutation} from '../../../../../../../../service/apollo/generated';
import {HOME_PROFILE_CONTACT_US, LOGIN} from '../../../../../../../routes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppInfo} from './components/appInfo';
import {Spacer} from '../../../../../../../../components/spacer';
import {OpenMoreIcon} from '../../../../../../../../components/icons/openMoreIcon';
import {logOut} from '../../../../../../../../service/auth/Auth';

export const OpenMore = () => {
    const {t} = useTranslation();

    const [userDeleteAccountMutation, {loading: userDeleteLoading}] =
        useUserDeleteAccountMutation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const deleteAccountPressHandler = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account?',
            [
                {
                    text: t('labels.alert.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('labels.alert.delete'),
                    style: 'destructive',
                    onPress: () => {
                        userDeleteAccountMutation()
                            .then(logOut)
                            .then(() => navigation.replace(LOGIN))
                            .catch(handlerError);
                    },
                },
            ],
        );
    };

    const contactUsPressHandler = () => {
        navigation.navigate(HOME_PROFILE_CONTACT_US);
    };

    const getModalContent = (closeModal: () => void) => {
        const openLink = (url: string) => {
            try {
                Linking.openURL(url);
            } catch (e) {
                // ignored
            }
        };

        return (
            <>
                <Button
                    title={t('profile.contactUs')}
                    onPress={() => {
                        closeModal();
                        contactUsPressHandler();
                    }}
                />

                <Spacer hVariant="h2" />

                <Button
                    title={t('profile.privacyPolicy')}
                    onPress={() => openLink('https://mmeet.app/privacyPolicy')}
                />

                <Spacer hVariant="h2" />

                <Button
                    title={t('profile.terms')}
                    onPress={() => openLink('https://mmeet.app/terms')}
                />

                <Spacer hVariant="h2" />

                <Button
                    title={t('buttons.deleteAccount')}
                    loading={userDeleteLoading}
                    colorVariant="gray"
                    onPress={deleteAccountPressHandler}
                />

                <Spacer hVariant="h2" />

                <AppInfo />
            </>
        );
    };

    return (
        <ModalComp modalContent={getModalContent}>
            <OpenMoreIcon />
        </ModalComp>
    );
};
