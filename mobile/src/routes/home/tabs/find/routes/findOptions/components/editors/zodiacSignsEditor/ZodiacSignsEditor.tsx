import React from 'react';
import {
    UserZodiacSignsInput,
    useUserUpdateZodiacSignsMutation,
    ZodiacSign,
} from '../../../../../../../../../service/apollo/generated';
import {useMe} from '../../../../../../../../../state/useMe';
import {ScrollView, Pressable} from 'react-native';
import {ZodiacSignRenderer} from './components/zodiacSignRenderer';
import {Label} from '../../../../../../../../../components/label';
import {Spacer} from '../../../../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';
import {useZodiacSignToLabel} from './hooks/useZodiacSignToLabel';

export const ZodiacSignsEditor = () => {
    const {t} = useTranslation();
    const {zodiacSignToLabel} = useZodiacSignToLabel();
    const {
        me: {id, zodiacSigns},
    } = useMe();
    const [userUpdateZodiacSigns] = useUserUpdateZodiacSignsMutation();

    const rendererPressHandler = (value: any) => {
        let result;

        if (zodiacSigns?.includes(value)) {
            result = zodiacSigns.filter(value1 => value !== value1);
        } else {
            result = zodiacSigns ? [...zodiacSigns, value] : [value];
        }

        if (result.length) {
            result = result.sort();
        } else {
            result = null;
        }

        const input: UserZodiacSignsInput = {
            zodiacSigns: result,
        };

        userUpdateZodiacSigns({
            variables: {
                input,
            },
            optimisticResponse: {
                userUpdateZodiacSigns: {
                    ...input,
                    id,
                    __typename: 'User',
                },
            },
        });
    };

    return (
        <ScrollView>
            <Label variant="h4" color="gray">
                {t('findOptions.zodiacSigns.ifNothingMeanAll')}
            </Label>

            <Spacer hVariant="h2" />

            {ZODIAC_SIGNS.map(value => (
                <Pressable
                    key={value}
                    onPress={() => rendererPressHandler(value)}>
                    <ZodiacSignRenderer
                        label={zodiacSignToLabel(value)}
                        selected={zodiacSigns?.includes(value)}
                    />
                </Pressable>
            ))}
        </ScrollView>
    );
};

const ZODIAC_SIGNS = Object.values(ZodiacSign);
