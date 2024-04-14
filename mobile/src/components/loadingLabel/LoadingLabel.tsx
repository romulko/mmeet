import React, {FC} from 'react';
import {Label} from '../label';
import {useTranslation} from 'react-i18next';

interface Props {
    label?: string;
}

export const LoadingLabel: FC<Props> = ({label}) => {
    const {t} = useTranslation();

    const labelInternal = label ? label : t('labels.loading');

    return (
        <Label variant="h2" color="gray">
            {labelInternal}
        </Label>
    );
};
