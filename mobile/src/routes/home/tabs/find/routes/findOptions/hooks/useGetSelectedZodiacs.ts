import {useMe} from '../../../../../../../state/useMe';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useZodiacSignToLabel} from '../components/editors/zodiacSignsEditor/hooks/useZodiacSignToLabel';

export const useGetSelectedZodiacs = () => {
    const {t} = useTranslation();
    const {
        me: {zodiacSigns},
    } = useMe();
    const {zodiacSignToLabel} = useZodiacSignToLabel();
    const [selectedZodiacs, setSelectedZodiacs] = useState('');

    useEffect(() => {
        let label;

        if (zodiacSigns?.length && zodiacSigns.length > 0) {
            label = zodiacSigns?.map(zodiacSignToLabel).join(', ');
        } else {
            label = t('findOptions.zodiacSigns.allSelected');
        }

        setSelectedZodiacs(label);
    }, [t, zodiacSignToLabel, zodiacSigns]);

    return {selectedZodiacs};
};
