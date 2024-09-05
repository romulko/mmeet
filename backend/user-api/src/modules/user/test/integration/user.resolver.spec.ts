import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { Connection, Repository } from 'typeorm';
import { GenderType, User, ZodiacSign } from '../../entity/user.entity';
import { UserService } from '../../service/user.service';
import { MatchService } from '../../../match/service/match.service';
import { UserFindPeopleInput } from '../../entity/user.input';

describe('UserTests', () => {
  let moduleRef: TestingModule;
  let connection: Connection;
  let userRepository: Repository<User>;
  let userService: UserService;
  let matchService: MatchService;
  let man1: User;
  let man2: User;
  let woman1: User;
  let woman2: User;

  // setup
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    connection = moduleRef.get(Connection);
    userRepository = await connection.getRepository<User>('User');
    userService = moduleRef.get(UserService);
    matchService = moduleRef.get(MatchService);
  });

  // clean database
  beforeEach(async () => {
    await connection.synchronize(true);
  });

  // stub users
  beforeEach(async () => {
    const createUser = (
      user: Pick<User, 'googleId' | 'gender' | 'lookingFor' | 'cityId'>,
    ) => {
      return userRepository.save(
        userRepository.create({
          ...user,
          ageRange: '10-50',
          birthday: new Date(1990, 6, 6),
          availableMeetings: 8,
        }),
      );
    };

    man1 = await createUser({
      googleId: 'man1',
      gender: GenderType.MALE,
      lookingFor: GenderType.FEMALE,
      cityId: 'cityId',
    });

    man2 = await createUser({
      googleId: 'man2',
      gender: GenderType.MALE,
      lookingFor: GenderType.FEMALE,
      cityId: 'cityId',
    });

    woman1 = await createUser({
      googleId: 'woman1',
      gender: GenderType.FEMALE,
      lookingFor: GenderType.MALE,
      cityId: 'cityId',
    });

    woman2 = await createUser({
      googleId: 'woman2',
      gender: GenderType.FEMALE,
      lookingFor: GenderType.MALE,
      cityId: 'cityId',
    });
  });

  // close connection
  afterAll(async () => {
    const connection = moduleRef.get(Connection);
    // await connection.synchronize(true);
    connection.close();
  });

  describe('findPeople', () => {
    it('zodiac signs - nobody has zodiacSigns', async () => {
      // when
      const users = await userService.findPeople(getInputFromUser(man1));

      // then
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);
    });

    it('zodiac signs - has zodiacSigns', async () => {
      // given
      man1.zodiacSigns = [ZodiacSign.AQUARIUS];
      await userRepository.save(man1);

      woman1.zodiacSign = ZodiacSign.AQUARIUS;
      await userRepository.save(woman1);

      woman2.zodiacSign = ZodiacSign.LIBRA;
      await userRepository.save(woman2);

      // when
      const users = await userService.findPeople(getInputFromUser(man1));

      // then
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman1.id);
    });

    it('ageRange', async () => {
      // given
      man1.ageRange = '31-32';

      woman1.birthday = new Date(1985, 6, 6);
      await userRepository.save(woman1);

      // when
      let users = await userService.findPeople(getInputFromUser(man1));

      // then
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman2.id);

      // given
      woman1.birthday = new Date(1990, 6, 6);
      await userRepository.save(woman1);

      // when
      users = await userService.findPeople(getInputFromUser(man1));

      // then
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);
    });

    it('no like', async () => {
      // when
      let users = await userService.findPeople(getInputFromUser(man1));

      // then
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(man2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(woman1));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);

      users = await userService.findPeople(getInputFromUser(woman2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);
    });

    it('man like woman', async () => {
      // when
      await matchService.interestingPhoto(man1, {
        interestingUserId: woman1.id,
      });

      // then
      let users = await userService.findPeople(getInputFromUser(man1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(man2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(woman1));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);

      users = await userService.findPeople(getInputFromUser(woman2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);
    });

    it('man like woman, woman like man', async () => {
      // when
      await matchService.interestingPhoto(man1, {
        interestingUserId: woman1.id,
      });

      await matchService.interestingPhoto(woman1, {
        interestingUserId: man1.id,
      });

      // then
      let users = await userService.findPeople(getInputFromUser(man1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(man2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(woman1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(man2.id);

      users = await userService.findPeople(getInputFromUser(woman2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);
    });

    it('man skip woman', async () => {
      // when
      await matchService.skipPhoto(man1, {
        skipUserId: woman1.id,
      });

      // then
      let users = await userService.findPeople(getInputFromUser(man1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(man2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(woman1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(man2.id);

      users = await userService.findPeople(getInputFromUser(woman2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);
    });

    it('man skip woman, woman skip man', async () => {
      // when
      await matchService.skipPhoto(man1, {
        skipUserId: woman1.id,
      });

      await matchService.skipPhoto(woman1, {
        skipUserId: man1.id,
      });

      // then
      let users = await userService.findPeople(getInputFromUser(man1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(man2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(woman1.id);
      expect(users[1].id).toEqual(woman2.id);

      users = await userService.findPeople(getInputFromUser(woman1));
      expect(users.length).toEqual(1);
      expect(users[0].id).toEqual(man2.id);

      users = await userService.findPeople(getInputFromUser(woman2));
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(man1.id);
      expect(users[1].id).toEqual(man2.id);
    });
  });
});

const getInputFromUser = (user: User): UserFindPeopleInput => {
  const { fromAge, toAge } = ageRangeToDates(
    new Date(user.birthday),
    user.ageRange,
  );

  return {
    userId: user.id,
    cityId: user.cityId,
    lookingFor: user.lookingFor,
    zodiacSigns: user.zodiacSigns,
    fromAge,
    toAge,
  };
};

const ageRangeToDates = (birthday: Date, ageRange: string) => {
  const split = ageRange.split('-');
  const now = new Date();
  const nowYear = now.getFullYear(); // 2020
  const ageRangeFrom = parseInt(split[0], 10); // 20
  const ageRangeTo = parseInt(split[1], 10); // 30
  const fromYears = nowYear - ageRangeTo; // 2020 - 30 = 1990
  const toYears = nowYear - ageRangeFrom; // 2020 - 20 = 2000
  const fromAge = new Date(fromYears, birthday.getMonth(), 0);
  const toAge = new Date(toYears, birthday.getMonth(), 31);

  return { fromAge, toAge };
};
