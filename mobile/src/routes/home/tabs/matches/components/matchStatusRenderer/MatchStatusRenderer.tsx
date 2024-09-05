import React, {FC} from 'react';
import {
    getMatchStatus,
    MatchStatus,
} from '../matchRenderer/utils/match/match.utils';
import {Linking, Platform, Pressable} from 'react-native';
import {Label} from '../../../../../../components/label';
import {useMe} from '../../../../../../state/useMe';
import {getPartner} from '../../utils/match.utils';
import {Match} from '../../state/useMatches';
import {View} from 'react-native';
import {getDateTimeFormatted} from '../../../../../../utils/date.utils';
import {Spacer} from '../../../../../../components/spacer';
import {useTranslation} from 'react-i18next';

interface Props {
    match: Match;
}

export const MatchStatusRenderer: FC<Props> = ({match}) => {
    const {t} = useTranslation();
    const {me} = useMe();

    const matchStatus = getMatchStatus(me, match);
    const partner = getPartner(me, match);

    if (matchStatus === MatchStatus.MEETING_SETUP) {
        const addressPressHandler = () => {
            const address = match.meeting?.acceptedAddress;

            if (!address) {
                return;
            }

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
            <View>
                <Label>
                    {getDateTimeFormatted(match.meeting?.acceptedAddress?.time)}
                </Label>

                <Spacer hVariant="h4" />

                <Pressable onPress={addressPressHandler}>
                    <Label>{match.meeting?.acceptedAddress?.placeLabel}</Label>
                </Pressable>
            </View>
        );
    } else {
        const matchStatusString = MatchStatus[matchStatus as number];

        const text = t(
            `home.tabs.matches.statues.${matchStatusString}`,
        ).replace('{partnerName}', partner.name!);

        return <Label testID={`${partner.name}MatchStatus`}>{text}</Label>;
    }
};
