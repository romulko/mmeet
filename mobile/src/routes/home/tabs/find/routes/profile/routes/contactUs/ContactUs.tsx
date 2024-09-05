import {ScreenContainer} from '../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../components/screenHeader';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../../../../../../components/button';
import {useMe} from '../../../../../../../../state/useMe';
import {Input} from './Styles';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {Spacer} from '../../../../../../../../components/spacer';
import {Label} from '../../../../../../../../components/label';

export const ContactUs = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const [text, setText] = useState('');

    const sendPressHandler = () => {
        const data = {userId: me.id, text};

        fetch('https://api.mmeet.app/mail/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            showMessage({message: t('contactUs.successSent'), type: 'success'});
            setText('');
        });
    };

    return (
        <ScreenContainer>
            <ScreenHeader title={t('profile.contactUs')} />

            <Spacer hVariant="h2" />

            <Label>{t('contactUs.description')}</Label>

            <Spacer hVariant="h2" />

            <Input multiline value={text} onChangeText={setText} />

            <Spacer hVariant="h2" />

            <Button
                disabled={!text}
                title={t('contactUs.sendButton')}
                onPress={sendPressHandler}
            />
        </ScreenContainer>
    );
};
