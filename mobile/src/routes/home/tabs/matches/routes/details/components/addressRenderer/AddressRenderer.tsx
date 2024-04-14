import React, {FC} from 'react';
import {Label} from '../../../../../../../../components/label';
import {Address} from '../../../../../../../../service/apollo/generated';
import {Linking, Platform, Pressable} from 'react-native';
import {Match} from '../../../../state/useMatches';
import {Spacer} from '../../../../../../../../components/spacer';
import {getDateTimeFormatted} from '../../../../../../../../utils/date.utils';

interface Props {
    match: Match;
    address?: Address | undefined | null;
}

export const AddressRenderer: FC<Props> = ({match, address}) => {
    if (!address) {
        return <></>;
    }

    const containerPressHandler = () => {
        const latLng = `${address.lat},${address.lng}`;
        const label = `${match.fromUser?.name}, ${match.toUser?.name} meet`;

        const url = Platform.select({
            ios: `maps:0,0?q=${label}@${latLng}`,
            android: `geo:0,0?q=${latLng}(${label})`,
        });

        try {
            Linking.openURL(url!).catch(console.log);
        } catch (e) {
            // ignored
        }
    };

    return (
        <Pressable onPress={containerPressHandler}>
            <Label variant="h3">{getDateTimeFormatted(address.time)}</Label>

            <Spacer hVariant="h4" />

            <Label variant="h3">{address.placeLabel}</Label>
        </Pressable>
    );
};
