import React from 'react';
import {CityEditor} from '../../../../../components/editors/cityEditor';
import {FormItem} from '../../../../../components/formItem';
import {useMe} from '../../../../../state/useMe';
import {useUpdateEnabled} from '../hooks/useUpdateEnabled';
import {useTranslation} from 'react-i18next';

export const City = () => {
    const {me} = useMe();
    const {t} = useTranslation();

    useUpdateEnabled(!!me.cityId);

    return (
        <FormItem
            label={t('findOptions.city')}
            value={me.cityLabel}
            editor={closeModal => <CityEditor closeModal={closeModal} />}
        />
    );
};
