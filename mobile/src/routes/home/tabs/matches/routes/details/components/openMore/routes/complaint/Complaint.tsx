import {ScreenContainer} from '../../../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../../../components/screenHeader';
import {useSelectedMatch} from '../../../../../../state/useSelectedMatch';
import {Label} from '../../../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../../../components/spacer';
import {Button} from '../../../../../../../../../../components/button';
import {Input} from './Styles';
import {showMessage} from 'react-native-flash-message';
import {useMe} from '../../../../../../../../../../state/useMe';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export const Complaint = () => {
    const {t} = useTranslation();
    const {me} = useMe();
    const {partner} = useSelectedMatch();
    const [reason, setReason] = useState('');
    const navigation = useNavigation<any>();

    const sendPressHandler = () => {
        const data = {userId: me.id, complaintUserId: partner!.id, reason};

        fetch('https://api.mmeet.app/mail/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            showMessage({
                message: t('complaint.successSentMessage'),
                type: 'success',
            });
            navigation.goBack();
        });
    };

    return (
        <ScreenContainer>
            <ScreenHeader
                title={t('complaint.title').replace(
                    '{partnerName}',
                    partner?.name || '',
                )}
            />

            <Spacer hVariant="h2" />

            <Label>{t('complaint.reason')}</Label>

            <Spacer hVariant="h2" />

            <Input multiline value={reason} onChangeText={setReason} />

            <Spacer hVariant="h2" />

            <Button
                title={t('complaint.sendButton')}
                onPress={sendPressHandler}
            />
        </ScreenContainer>
    );
};
