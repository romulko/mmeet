import React from 'react';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {Label} from '../../../../../components/label';
import {Spacer} from '../../../../../components/spacer';
import {useTranslation} from 'react-i18next';
import {getDateFormatted} from '../../../../../utils/date.utils';
import {DateChooser} from '../../../../../components/dateChooser';
import {useUserUpdateBirthdayMutation} from '../../../../../service/apollo/generated';
import {birthdayToZodiacSign} from '../../../../../components/editors/birthdayEditor/utils/birthdayToZodiacSign.utils';

export const Birthday = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    const [userUpdateBirthdayMutation] = useUserUpdateBirthdayMutation();

    useUpdateEnabled(!!me.birthday);

    const birthdayDateChange = (birthday: Date) => {
        userUpdateBirthdayMutation({
            variables: {userBirthdayInput: {birthday}},
            optimisticResponse: {
                userUpdateBirthday: {
                    id: me.id,
                    birthday,
                    zodiacSign: birthdayToZodiacSign(birthday),
                    __typename: 'User',
                },
            },
        });
    };

    return (
        <>
            <Label color="gray">{t('profile.birthday')}</Label>

            <Spacer hVariant="h2" />

            <DateChooser
                showLineAlways
                hideLabel
                label={t('profile.birthday')}
                value={getDateFormatted(me.birthday)}
                date={
                    me.birthday ? new Date(me.birthday) : new Date(1995, 1, 1)
                }
                onDateChange={birthdayDateChange}
            />
        </>
    );
};
