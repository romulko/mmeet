import React from 'react';
import {NameEditor} from '../../../../../components/editors/nameEditor';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {Label} from '../../../../../components/label';
import {Spacer} from '../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

export const Name = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    useUpdateEnabled(!!me.name);

    return (
        <>
            <Label color="gray">{t('profile.name')}</Label>

            <Spacer hVariant="h3" />

            <NameEditor />
        </>
    );
};
