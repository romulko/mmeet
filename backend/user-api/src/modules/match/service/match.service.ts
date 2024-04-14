import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  MatchFindOneInput,
  MatchInterestingPhotoInput,
  MatchInterestingVideoInput,
  MatchSkipPhotoInput,
  MatchSkipVideoInput,
} from '../entity/match.input';
import { User } from '../../user/entity/user.entity';
import { Match } from '../entity/match.entity';
import { getPartner, getUser } from '../../../utils/match.utils';
import { Answer } from '../../questions/entity/answer.entity';
import { MessagingService } from '../../firebase/service/messaging.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly messagingService: MessagingService,
  ) {
    // this.interestingPhoto({ id: 145 }, { interestingUserId: 2 });
    // Oksana > Roman
    // this.interestingVideo({ id: 2 }, { matchId: 363 });
  }

  async findAll(user: AuthUser) {
    const matchesQueryBuilder = this.matchRepository
      .createQueryBuilder('match')
      .where('(match.fromUserId = :userId OR match.toUserId = :userId)', {
        userId: user.id,
      })
      .andWhere(
        '(match.fromUserId = :userId AND match.fromUserInterestedPhoto = true AND match.toUserInterestedPhoto = true AND (match.fromUserInterestedVideo IS NULL OR match.fromUserInterestedVideo = true) AND (match.toUserInterestedVideo IS NULL OR match.toUserInterestedVideo = true)) OR (match.toUserId = :userId AND match.toUserInterestedPhoto = true AND match.fromUserInterestedPhoto = true AND (match.toUserInterestedVideo IS NULL OR match.toUserInterestedVideo = true) AND (match.fromUserInterestedVideo IS NULL OR match.fromUserInterestedVideo = true))',
        {
          userId: user.id,
        },
      );

    const matches = await this.withJoins(matchesQueryBuilder).getMany();

    await Promise.all(matches.map(this.addHasVideo));

    const now = Date.now();

    return matches.filter(
      (value) =>
        !value?.meeting?.acceptedAddress ||
        new Date(value.meeting.acceptedAddress.time).getTime() >= now,
    );
  }

  async findOne({ matchId }: MatchFindOneInput) {
    const match = await this.withJoins(
      this.matchRepository
        .createQueryBuilder('match')
        .where('"match"."id" = :matchId', { matchId }),
    ).getOne();

    await this.addHasVideo(match);

    return match;
  }

  addHasVideo = async (match: Match) => {
    match.isFromUserHasVideo =
      (await this.answerRepository.count({
        where: { user: { id: match.fromUser.id } },
      })) > 0;

    match.isToUserHasVideo =
      (await this.answerRepository.count({
        where: { user: { id: match.toUser.id } },
      })) > 0;
  };

  deleteMatches(user: AuthUser) {
    return this.matchRepository.query(
      `DELETE FROM match WHERE "fromUserId"=${user.id} OR "toUserId"=${user.id}`,
    );
  }

  async interestingPhoto(
    authUser: AuthUser,
    input: MatchInterestingPhotoInput,
  ) {
    let match = await this.findByUserIds(authUser.id, input.interestingUserId);

    if (match) {
      match.toUserInterestedPhoto = true;

      if (match.fromUserInterestedPhoto) {
        const data = {
          type: 'IT_IS_MATCH',
          fromUserName: match.fromUser.name,
          toUserName: match.toUser.name,
        };

        this.messagingService.notify(match.fromUser, data);
        this.messagingService.notify(match.toUser, data);
      }
    } else {
      match = this.matchRepository.create();
      match.fromUser = authUser as User;
      match.fromUserInterestedPhoto = true;
      match.toUser = { id: input.interestingUserId } as User;
    }

    return this.matchRepository.save(match);
  }

  async skipPhoto(authUser: AuthUser, input: MatchSkipPhotoInput) {
    let match = await this.findByUserIds(authUser.id, input.skipUserId);

    if (!match) {
      match = this.matchRepository.create();
      match.fromUser = authUser as User;
      match.toUser = { id: input.skipUserId } as User;
    }

    if (match.fromUser.id === authUser.id) {
      match.fromUserInterestedPhoto = false;
    } else {
      match.toUserInterestedPhoto = false;
    }

    return this.matchRepository.save(match);
  }

  async interestingVideo(
    authUser: AuthUser,
    input: MatchInterestingVideoInput,
  ) {
    const match = await this.findOne(input);

    if (match.fromUser.id === authUser.id) {
      match.fromUserInterestedVideo = true;
    } else {
      match.toUserInterestedVideo = true;
    }

    const partner = getPartner(match, authUser);

    this.messagingService.notify(partner, {
      type: 'MATCH_INTERESTING_VIDEO',
      userName: getUser(match, authUser).name,
      data: match.id.toString(),
    });

    return this.matchRepository.save(match);
  }

  async skipVideo(authUser: AuthUser, input: MatchSkipVideoInput) {
    const match = await this.findOne(input);

    if (match.fromUser.id === authUser.id) {
      match.fromUserInterestedVideo = false;
    } else {
      match.toUserInterestedVideo = false;
    }

    return this.matchRepository.save(match);
  }

  private findByUserIds(userId1: User['id'], userId2: User['id']) {
    const userWhere = {
      userId1,
      userId2,
    };

    return this.withJoins(
      this.matchRepository
        .createQueryBuilder('match')
        .where(
          '("match"."fromUserId" = :userId1 AND "match"."toUserId" = :userId2)',
          userWhere,
        )
        .orWhere(
          '("match"."toUserId" = :userId1 AND "match"."fromUserId" = :userId2)',
          userWhere,
        ),
    ).getOne();
  }

  private withJoins(queryBuilder: SelectQueryBuilder<Match>) {
    queryBuilder
      .leftJoinAndSelect('match.fromUser', 'fromUser')
      .leftJoinAndSelect('match.toUser', 'toUser')
      .leftJoinAndSelect('match.meeting', 'meeting')
      .leftJoinAndSelect('meeting.fromUserAddress', 'fromUserAddress')
      .leftJoinAndSelect('meeting.toUserAddress', 'toUserAddress')
      .leftJoinAndSelect('meeting.acceptedAddress', 'acceptedAddress');

    return queryBuilder;
  }
}
