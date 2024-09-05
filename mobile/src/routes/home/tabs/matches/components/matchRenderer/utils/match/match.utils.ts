import {Me} from '../../../../../../../../state/useMe';
import {Match} from '../../../../state/useMatches';

export enum MatchStatus {
    YOU_MUST_VIEW_PARTNER_VIDEO,
    PARTNER_MUST_VIEW_YOUR_VIDEO,
    YOU_MUST_PROPOSE_MEETING,
    PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING,
    YOU_MUST_ACCEPT_OR_DECLINE_MEETING,
    MEETING_SETUP,
}

export const getMatchStatus = (me: Me, match: Match) => {
    if (!me || !match.fromUser || !match.toUser) {
        return;
    }

    if (match.meeting?.acceptedAddress) {
        return MatchStatus.MEETING_SETUP;
    }

    if (me.id === match.fromUser.id) {
        if (!match.fromUserInterestedVideo) {
            return MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO;
        }

        if (!match.toUserInterestedVideo) {
            return MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO;
        }

        if (match.meeting?.toUserAddress) {
            return MatchStatus.YOU_MUST_ACCEPT_OR_DECLINE_MEETING;
        }

        if (!match.meeting || !match.meeting.fromUserAddress) {
            return MatchStatus.YOU_MUST_PROPOSE_MEETING;
        }

        if (match.meeting.fromUserAddress) {
            return MatchStatus.PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING;
        }
    } else {
        if (!match.toUserInterestedVideo) {
            return MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO;
        }

        if (!match.fromUserInterestedVideo) {
            return MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO;
        }

        if (match.meeting?.fromUserAddress) {
            return MatchStatus.YOU_MUST_ACCEPT_OR_DECLINE_MEETING;
        }

        if (!match.meeting || !match.meeting.toUserAddress) {
            return MatchStatus.YOU_MUST_PROPOSE_MEETING;
        }

        if (match.meeting.toUserAddress) {
            return MatchStatus.PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING;
        }
    }
};

export const getMatchReviewStatus = (me: Me, match: Match) => {
    const result: MatchStatus[] = [];

    if (!me || !match.fromUser || !match.toUser) {
        return result;
    }

    if (match.meeting?.acceptedAddress) {
        return result;
    }

    if (me.id === match.fromUser.id) {
        if (!match.fromUserInterestedVideo) {
            result.push(MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO);
        }

        if (!match.toUserInterestedVideo) {
            result.push(MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO);
        }
    } else {
        if (!match.toUserInterestedVideo) {
            result.push(MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO);
        }

        if (!match.fromUserInterestedVideo) {
            result.push(MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO);
        }
    }

    return result;
};

export const getUserHasVideo = (me: Me, match: Match) => {
    return me?.id === match.fromUser?.id
        ? match.isToUserHasVideo
        : match.isFromUserHasVideo;
};
