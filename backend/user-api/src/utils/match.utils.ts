import { Match } from '../modules/match/entity/match.entity';
import { AuthUser } from '../modules/auth/entity/authUser.entity';

export const getUser = (match: Match, authUser: AuthUser) =>
  match.fromUser.id === authUser.id ? match.fromUser : match.toUser;

export const getPartner = (match: Match, authUser: AuthUser) =>
  match.fromUser.id === authUser.id ? match.toUser : match.fromUser;
