import React from 'react';
import {ScreenContainer} from '../../../../../../../../../../components/screenContainer';
import {ScreenHeader} from '../../../../../../../../../../components/screenHeader';
import {useRecoilValue} from 'recoil';
import {InviteFriendState} from '../../state/inviteFriend.state';
import {Label} from '../../../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../../../components/spacer';
import {Questions as MainQuestions} from '../../../../../../../../../../components/questions';
import {useTranslation} from 'react-i18next';

export const Questions = () => {
    const inviteUser = useRecoilValue(InviteFriendState);
    const {t} = useTranslation();

    if (!inviteUser) {
        return <></>;
    }

    return (
        <ScreenContainer useScrollable>
            <ScreenHeader title={t('inviteFriend.routes.questions.title')} />

            <Spacer hVariant="h2" />

            <Label variant="h3">
                {t('inviteFriend.routes.questions.description').replace(
                    '{inviteUserEmail}',
                    inviteUser?.email || '',
                )}
            </Label>

            <Spacer hVariant="h1" />

            <MainQuestions userId={inviteUser.id} />
        </ScreenContainer>
    );
};
