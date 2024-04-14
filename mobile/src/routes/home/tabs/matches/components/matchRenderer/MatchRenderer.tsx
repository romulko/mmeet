import React, {FC} from 'react';
import {Container, DateLabel, Image} from './Styles';
import {Me} from '../../../../../../state/useMe';
import {Match} from '../../state/useMatches';
import {getPartner} from '../../utils/match.utils';
import {RESOURCE_URL} from '../../../../../../service/consts/consts';
import {Label} from '../../../../../../components/label';
import {CameraIcon} from '../cameraIcon';
import {Spacer} from '../../../../../../components/spacer';
import {
    getMatchReviewStatus,
    getMatchStatus,
    MatchStatus,
} from './utils/match/match.utils';
import {MeetingIcon} from '../meetingIcon';
import {Box} from '../../../../../../components/box';
import {getAge} from '../../../../../../utils/user.utils';
import {getDateFormatted} from '../../../../../../utils/date.utils';

interface Props {
    me: Me;
    match: Match;
    imageVariant?: 'match' | 'date';
}

export const MatchRenderer: FC<Props> = ({
    me,
    match,
    imageVariant = 'match',
}) => {
    const partner = getPartner(me!, match);

    const getIcon = () => {
        const matchReviewStatuses = getMatchReviewStatus(me, match);
        const matchStatus = getMatchStatus(me, match);

        if (
            matchReviewStatuses.includes(
                MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO,
            )
        ) {
            return <CameraIcon />;
        }

        if (
            matchReviewStatuses.includes(
                MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO,
            )
        ) {
            return <CameraIcon />;
        }

        if (
            matchStatus === MatchStatus.YOU_MUST_PROPOSE_MEETING ||
            matchStatus ===
                MatchStatus.PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING ||
            matchStatus === MatchStatus.YOU_MUST_ACCEPT_OR_DECLINE_MEETING
        ) {
            return <MeetingIcon />;
        }

        return null;
    };

    return (
        <Container>
            <Image
                variant={imageVariant}
                source={{
                    uri: `${RESOURCE_URL}/${
                        partner.id
                    }/photo.jpeg?hash=${Date.now()}`,
                }}
            />

            <Spacer hVariant="h3" />

            <Box alignItems="center">
                <Label variant="h2">
                    {partner.name}, {getAge(partner.birthday)}
                </Label>

                <Spacer wVariant="h3" />

                {getIcon()}
            </Box>

            {match.meeting?.acceptedAddress && (
                <DateLabel>
                    {getDateFormatted(match.meeting.acceptedAddress.time)}
                </DateLabel>
            )}
        </Container>
    );
};
