import {Match, User} from '../../../../../../../../../service/apollo/generated';
import {getMatchStatus, MatchStatus} from '../match.utils';

// stub
const fromUser: User = {
    id: 1,
    googleId: '',
};

const toUser: User = {
    id: 2,
    googleId: '',
};

const defaultMatch: Match = {
    id: 1,
    fromUser,
    toUser,
};

test('YOU_MUST_VIEW_PARTNER_VIDEO', () => {
    // then
    verify(fromUser, defaultMatch, MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO);
    verify(toUser, defaultMatch, MatchStatus.YOU_MUST_VIEW_PARTNER_VIDEO);
});

test('PARTNER_MUST_VIEW_YOUR_VIDEO', () => {
    // given
    let match: Match = {
        ...defaultMatch,
        fromUserInterestedVideo: true,
    };

    // then
    verify(fromUser, match, MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO);

    // given
    match = {...defaultMatch, toUserInterestedVideo: true};

    // then
    verify(toUser, match, MatchStatus.PARTNER_MUST_VIEW_YOUR_VIDEO);
});

test('YOU_MUST_PROPOSE_MEETING', () => {
    // given
    const match: Match = {
        ...defaultMatch,
        fromUserInterestedVideo: true,
        toUserInterestedVideo: true,
    };

    // then
    verify(fromUser, match, MatchStatus.YOU_MUST_PROPOSE_MEETING);
});

test('YOU_MUST_ACCEPT_OR_DECLINE_MEETING', () => {
    // given
    const match: Match = {
        ...defaultMatch,
        fromUserInterestedVideo: true,
        toUserInterestedVideo: true,
    };

    match.meeting = {
        id: 1,
        match,
        fromUserAddress: {
            id: 1,
            placeId: 'placeId',
            placeLabel: 'placeLabel',
            time: new Date(),
        },
        toUserAddress: {
            id: 2,
            placeId: 'placeId',
            placeLabel: 'placeLabel',
            time: new Date(),
        },
    };

    // then
    verify(fromUser, match, MatchStatus.YOU_MUST_ACCEPT_OR_DECLINE_MEETING);
});

test('PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING', () => {
    // given
    const match: Match = {
        ...defaultMatch,
        fromUserInterestedVideo: true,
        toUserInterestedVideo: true,
    };

    match.meeting = {
        id: 1,
        match,
        fromUserAddress: {
            id: 1,
            placeId: 'placeId',
            placeLabel: 'placeLabel',
            time: new Date(),
        },
    };

    // then
    verify(fromUser, match, MatchStatus.PARTNER_MUST_ACCEPT_OR_DECLINE_MEETING);
});

const verify = (user: User, match: Match, status: MatchStatus) =>
    expect(status).toBe(getMatchStatus(user, match));
