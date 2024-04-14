import { Injectable } from '@nestjs/common';
import { InvitedUser, StatisticEntity } from '../entity/statistic.entity';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entity/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async getStatistic(authUser: AuthUser) {
    const invitedUsers: InvitedUser[] = [];

    const invitedByUsers = await this.userRepository.findBy({
      invitedByUserId: authUser.id,
      isPhotoAvailable: true,
    });

    for (const invitedUser of invitedByUsers) {
      const usersOfInvitedUser = await this.getInvitedUsersRecursively(
        invitedUser.id,
      );

      let meetingsCount = await this.getMeetingsCountOfUser(invitedUser.id);
      for (const userOfInvitedUser of usersOfInvitedUser) {
        meetingsCount += await this.getMeetingsCountOfUser(
          userOfInvitedUser.id,
        );
      }

      invitedUsers.push({
        id: invitedUser.id,
        name: invitedUser.name,
        meetingsCount,
        invitedCount: usersOfInvitedUser.length,
      });
    }

    return {
      invitedUsers,
    } as StatisticEntity;
  }

  private async getInvitedUsersRecursively(userId: User['id']) {
    return (await this.entityManager.query(`
      WITH RECURSIVE invitedByUsers AS (
          SELECT
              id,
              name
          FROM
              "user"
          WHERE
              "invitedByUserId" = ${userId}
          UNION
              SELECT
                  u.id,
                  u.name
              FROM
                  "user" u
              INNER JOIN invitedByUsers invitedBy ON invitedBy.id = u."invitedByUserId"
      ) SELECT
          *
      FROM
          invitedByUsers;
`)) as { id: number; name: string }[];
  }

  private async getMeetingsCountOfUser(userId: number) {
    const result = await this.entityManager.query(`
      SELECT count(*)
      FROM match
         RIGHT JOIN meeting m ON m.id = match."meetingId" AND m."acceptedAddressId" IS NOT NULL
      WHERE ("fromUserId" = ${userId} OR "toUserAddressId" = ${userId})
      AND "meetingId" is not null
    `);

    return parseInt(result[0].count);
  }
}
