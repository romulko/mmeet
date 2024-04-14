import {useTranslation} from 'react-i18next';
import {useCallback} from 'react';
import {ZodiacSign} from '../../../../../../../../../../service/apollo/generated';

export const useZodiacSignToLabel = () => {
    const {i18n} = useTranslation();

    const zodiacToSymbol = useCallback((zodiacSign: ZodiacSign): string => {
        return ZODIAC_SIGN_TO_SYMBOL[zodiacSign.toString()];
    }, []);

    const zodiacSignToLabel = useCallback(
        (zodiacSign: ZodiacSign): string => {
            const sign = zodiacToSymbol(zodiacSign);
            // @ts-ignore
            const label = ZODIACS[i18n.language][zodiacSign];

            return `${sign} ${label}`;
        },
        [zodiacToSymbol, i18n],
    );

    return {
        zodiacToSymbol,
        zodiacSignToLabel,
    };
};

const ZODIACS = {
    en: {
        AQUARIUS: 'Aquarius',
        ARIES: 'Aries',
        CANCER: 'Cancer',
        CAPRICORNUS: 'Capricornus',
        GEMINI: 'Gemini',
        LEO: 'Leo',
        LIBRA: 'Libra',
        PISCES: 'Pisces',
        SAGITTARIUS: 'Sagittarius',
        SCORPIUS: 'Scorpius',
        TAURUS: 'Taurus',
        VIRGO: 'Virgo',
    },
    ru: {
        AQUARIUS: 'Водолей',
        ARIES: 'Овен',
        CANCER: 'Рак',
        CAPRICORNUS: 'Козерог',
        GEMINI: 'Близнецы',
        LEO: 'Лев',
        LIBRA: 'Весы',
        PISCES: 'Рыбы',
        SAGITTARIUS: 'Стрелец',
        SCORPIUS: 'Скорпион',
        TAURUS: 'Телец',
        VIRGO: 'Дева',
    },
    uk: {
        AQUARIUS: 'Водолій',
        ARIES: 'Овен',
        CANCER: 'Рак',
        CAPRICORNUS: 'Козеріг',
        GEMINI: 'Близнюки',
        LEO: 'Лев',
        LIBRA: 'Терези',
        PISCES: 'Риби',
        SAGITTARIUS: 'Стрілець',
        SCORPIUS: 'Скорпіон',
        TAURUS: 'Телець',
        VIRGO: 'Діва',
    },
};

const ZODIAC_SIGN_TO_SYMBOL: any = {
    ARIES: '♈',
    TAURUS: '♉',
    GEMINI: '♊',
    CANCER: '♋',
    LEO: '♌',
    VIRGO: '♍',
    LIBRA: '♎',
    SCORPIUS: '♏',
    SAGITTARIUS: '♐',
    CAPRICORNUS: '♑',
    AQUARIUS: '♒',
    PISCES: '♓',
};
