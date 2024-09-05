import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { MatchService } from '../../service/match.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../../../user/entity/user.entity';

describe('MatchResolver', () => {
  let moduleRef: TestingModule;
  let connection: Connection;
  let userRepository: Repository<User>;
  let matchService: MatchService;
  let user1: User;
  let user2: User;
  let user3: User;
  let user4: User;

  // setup
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    connection = moduleRef.get(Connection);

    userRepository = await connection.getRepository<User>('User');

    matchService = moduleRef.get(MatchService);
  });

  // clean database
  beforeEach(async () => {
    await connection.synchronize(true);
  });

  // stub users
  beforeEach(async () => {
    user1 = await userRepository.create();
    user1.googleId = 'user1';
    await userRepository.save(user1);

    user2 = await userRepository.create();
    user2.googleId = 'user2';
    await userRepository.save(user2);

    user3 = await userRepository.create();
    user3.googleId = 'user3';
    await userRepository.save(user3);

    user4 = await userRepository.create();
    user4.googleId = 'user4';
    await userRepository.save(user4);
  });

  // close connection
  afterAll(async () => {
    const connection = moduleRef.get(Connection);

    const entities = connection.entityMetadatas;

    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name);
      await repository.delete({});
    }

    connection.close();
  });

  describe('findMatches', () => {
    it('delete matches', async () => {
      // given
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      // when
      await matchService.deleteMatches(user1);

      // then
      matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);
    });

    it('findMatches', async () => {
      // given

      // when
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      // then
      let matches = await matchService.findAll(user1);

      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);

      expect(matches.length).toEqual(0);

      // when
      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      // then
      matches = await matchService.findAll(user1);

      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);

      expect(matches.length).toEqual(1);
    });

    it('findAll photo>skipPhoto', async () => {
      // given

      // when
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.skipPhoto(user2, {
        skipUserId: user1.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>skipVideo', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.skipVideo(user1, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video>video', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      await matchService.interestingVideo(user2, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video>skipVideo', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      await matchService.skipVideo(user2, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });
  });

  describe('findAll', () => {
    /*
    findAll photo>photo
    findAll photo>skipPhoto
    findAll photo>photo>video
    findAll photo>photo>skipVideo
    findAll photo>photo>video>video
    findAll photo>photo>video>skipVideo
     */
    it('findAll photo>photo', async () => {
      // given

      // when
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      // when
      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      // then
      matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>skipPhoto', async () => {
      // given

      // when
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.skipPhoto(user2, {
        skipUserId: user1.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>skipVideo', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.skipVideo(user1, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video>video', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      await matchService.interestingVideo(user2, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(1);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });

    it('findAll photo>photo>video>skipVideo', async () => {
      // given

      // when
      const match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      await matchService.skipVideo(user2, {
        matchId: match.id,
      });

      // then
      let matches = await matchService.findAll(user1);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user2);
      expect(matches.length).toEqual(0);

      matches = await matchService.findAll(user3);
      expect(matches.length).toEqual(0);
    });
  });

  describe('interesting', () => {
    /*
  photo>photo>video>video
  photo>skipPhoto
  photo>photo>skipVideo
  photo>photo>video>skipVideo
   */

    it('photo>photo>video>video', async () => {
      // given

      // when
      let match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeNull();
      expect(match.fromUserInterestedVideo).toBeNull();
      expect(match.toUserInterestedVideo).toBeNull();

      // when
      match = await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeTruthy();
      expect(match.fromUserInterestedVideo).toBeNull();
      expect(match.toUserInterestedVideo).toBeNull();

      // when
      match = await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeTruthy();
      expect(match.fromUserInterestedVideo).toBeTruthy();
      expect(match.toUserInterestedVideo).toBeNull();

      // when
      match = await matchService.interestingVideo(user2, {
        matchId: match.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeTruthy();
      expect(match.fromUserInterestedVideo).toBeTruthy();
      expect(match.toUserInterestedVideo).toBeTruthy();
    });

    it('photo>skipPhoto', async () => {
      // given

      // when
      await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      const match = await matchService.skipPhoto(user2, {
        skipUserId: user1.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeFalsy();
      expect(match.fromUserInterestedVideo).toBeNull();
      expect(match.toUserInterestedVideo).toBeNull();
    });

    it('photo>photo>skipVideo', async () => {
      // given

      // when
      let match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      match = await matchService.skipVideo(user1, {
        matchId: match.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeTruthy();
      expect(match.fromUserInterestedVideo).toBeFalsy();
      expect(match.toUserInterestedVideo).toBeNull();
    });

    it('photo>photo>video>skipVideo', async () => {
      // given

      // when
      let match = await matchService.interestingPhoto(user1, {
        interestingUserId: user2.id,
      });

      await matchService.interestingPhoto(user2, {
        interestingUserId: user1.id,
      });

      await matchService.interestingVideo(user1, {
        matchId: match.id,
      });

      match = await matchService.skipVideo(user2, {
        matchId: match.id,
      });

      // then
      expect(match.fromUser.id).toEqual(user1.id);
      expect(match.toUser.id).toEqual(user2.id);
      expect(match.fromUserInterestedPhoto).toBeTruthy();
      expect(match.toUserInterestedPhoto).toBeTruthy();
      expect(match.fromUserInterestedVideo).toBeTruthy();
      expect(match.toUserInterestedVideo).toBeFalsy();
    });
  });
});
