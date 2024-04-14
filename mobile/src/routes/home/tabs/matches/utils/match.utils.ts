import {Match} from '../state/useMatches';
import {User} from '../../../../../service/apollo/generated';

export const getPartner = (me: Pick<User, 'id'>, match: Match) =>
    match.fromUser!.id === me.id ? match.toUser! : match.fromUser!;

export const getAddress = (me: Pick<User, 'id'>, match: Match) =>
    match.fromUser?.id === me.id
        ? match.meeting?.fromUserAddress
        : match.meeting?.toUserAddress;

export const getPartnerAddress = (me: Pick<User, 'id'>, match: Match) =>
    match.fromUser?.id === me.id
        ? match.meeting?.toUserAddress
        : match.meeting?.fromUserAddress;
