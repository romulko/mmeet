import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenderType, User, ZodiacSign } from '../entity/user.entity';
import { Repository } from 'typeorm';
import {
  UserAgeRangeInput,
  UserBirthdayInput,
  UserCityInput,
  UserContactInfoInput,
  UserFindPeopleInput,
  UserGenderInput,
  UserInviteFriendInput,
  UserLanguageInput,
  UserLookingForInput,
  UserNameInput,
  UserZodiacSignsInput,
} from '../entity/user.input';
import { FileUpload } from 'graphql-upload';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { Match } from '../../match/entity/match.entity';
import { streamToBufferPromise } from '../../../utils/buffer.utils';
import { UpdateFCMTokenDTO } from '../controller/dto/user.dto';
import { readFileSync } from 'fs';
import { MatchService } from '../../match/service/match.service';
import { QuestionsService } from '../../questions/service/questions.service';
import { S3Service } from '../../s3/service/S3.service';
import { ApolloError } from 'apollo-server-express';
import { birthdayToZodiacSign } from './utils/birthdayToZodiacSign.utils';
import { Answer } from '../../questions/entity/answer.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly matchService: MatchService,
    private readonly questionsService: QuestionsService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.setupTestUser();
  }

  registerUser(
    userInput: Pick<User, 'googleId' | 'appleUserId' | 'name' | 'email'>,
  ) {
    console.log(`registerUser, ${JSON.stringify(userInput)}`);

    const user = this.userRepository.create();
    user.googleId = userInput.googleId;
    user.appleUserId = userInput.appleUserId;
    user.name = userInput.name;
    user.email = userInput.email;
    user.gender = GenderType.MALE;
    user.lookingFor = GenderType.FEMALE;
    user.ageRange = '20-35';
    user.availableMeetings = 8;
    user.language = 'uk';

    return this.userRepository.save(user);
  }

  async findPeople(input: UserFindPeopleInput) {
    const { userId, fromAge, toAge, cityId, lookingFor, zodiacSigns } = input;

    const query = this.userRepository
      .createQueryBuilder('partner')
      .leftJoinAndSelect(
        Match,
        'match',
        '(match.fromUserId = :userId AND match.toUserId = partner.id) OR (match.toUserId = :userId AND match.fromUserId = partner.id)',
        { userId },
      )
      .where('partner.id != :userId', { userId })

      .andWhere('partner.cityId = :cityId', {
        cityId,
      })
      .andWhere('partner.gender::text = :lookingFor', {
        lookingFor,
      })
      .andWhere(
        '(match IS NULL OR (match.fromUserId = partner.id AND match.fromUserInterestedPhoto IS NOT FALSE AND match.toUserInterestedPhoto IS NULL) OR (match.toUserId = partner.id AND match.fromUserInterestedPhoto IS NULL))',
      )
      .andWhere(
        '(partner.birthday::date >= :fromAge AND partner.birthday::date <= :toAge)',
        { fromAge, toAge },
      );

    if (zodiacSigns) {
      query.andWhere('partner.zodiacSign = ANY (:zodiacSigns)', {
        zodiacSigns,
      });
    }

    return query.orderBy('partner.id').limit(10).getMany();
  }

  findOne({ id }: Pick<User, 'id'>) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneByEmail({ email }: Pick<User, 'email'>) {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  findOneByAppleUserId({ appleUserId }: Pick<User, 'appleUserId'>) {
    return this.userRepository.findOne({
      where: { appleUserId },
    });
  }

  async deleteAccount(authUser: AuthUser) {
    await this.questionsService.deleteAnswers(authUser);

    await this.deleteS3UserFolder(authUser);

    await this.matchService.deleteMatches(authUser);

    const user = await this.findOne(authUser);
    await this.userRepository.remove([{ ...user }]);
    return user;
  }

  private async deleteS3UserFolder(authUser: AuthUser) {
    const result = await this.s3Service.listObjectsV2({
      Prefix: `${authUser.id}`,
    });

    result.Contents.forEach((value) =>
      this.s3Service.deleteObject({ Key: value.Key }),
    );
  }

  async updateFCMToken({ userId, fcmToken }: UpdateFCMTokenDTO) {
    const user = await this.findOne({ id: userId });
    user.fcmToken = fcmToken;
    return this.userRepository.save(user);
  }

  async updateName(authUser: AuthUser, userNameInput: UserNameInput) {
    const user = await this.findOne(authUser);
    user.name = userNameInput.name;
    return this.userRepository.save(user);
  }

  async updateBirthday(
    authUser: AuthUser,
    userBirthdayInput: UserBirthdayInput,
  ) {
    const user = await this.findOne(authUser);
    user.birthday = userBirthdayInput.birthday;
    user.zodiacSign = birthdayToZodiacSign(user.birthday);
    return this.userRepository.save(user);
  }

  async updateGender(authUser: AuthUser, userGendersInput: UserGenderInput) {
    const user = await this.findOne(authUser);
    user.gender = userGendersInput.gender;
    return this.userRepository.save(user);
  }

  async updateContactInfo(authUser: AuthUser, input: UserContactInfoInput) {
    const user = await this.findOne(authUser);
    user.contactInfo = input.contactInfo;
    return this.userRepository.save(user);
  }

  async updateLookingFor(
    authUser: AuthUser,
    userLookingForInput: UserLookingForInput,
  ) {
    const user = await this.findOne(authUser);
    user.lookingFor = userLookingForInput.lookingFor;
    return this.userRepository.save(user);
  }

  async updatePhoto(authUser: AuthUser, { createReadStream }: FileUpload) {
    const user = await this.findOne(authUser);

    await this.s3Service.putObject({
      Key: `${authUser.id}/photo.jpeg`,
      Body: await streamToBufferPromise(createReadStream),
      ContentType: 'image/jpeg',
    });

    user.isPhotoAvailable = true;

    return this.userRepository.save(user);
  }

  async updateAgeRange(
    authUser: AuthUser,
    userAgeRangeInput: UserAgeRangeInput,
  ) {
    const user = await this.findOne(authUser);
    user.ageRange = `${userAgeRangeInput.from}-${userAgeRangeInput.to}`;
    return this.userRepository.save(user);
  }

  async updateCity(authUser: AuthUser, input: UserCityInput) {
    const user = await this.findOne(authUser);
    user.cityId = input.cityId;
    user.cityLabel = input.cityLabel;

    const {
      geometry: {
        location: { lat, lng },
      },
    } = await this.getAddressDetails(input.cityId);
    user.cityLat = lat;
    user.cityLng = lng;

    return this.userRepository.save(user);
  }

  private async getAddressDetails(placeId: string) {
    const googleApiKey = this.configService.get('GOOGLE_API_KEY');

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`;

    const response: any = await this.httpService.get(url).toPromise();

    return response.data.result;
  }

  async updateZodiacSigns(authUser: AuthUser, input: UserZodiacSignsInput) {
    const user = await this.findOne(authUser);
    user.zodiacSigns = input.zodiacSigns;
    return this.userRepository.save(user);
  }

  async inviteFriend(authUser: AuthUser, input: UserInviteFriendInput) {
    let user = await this.findOneByEmail(input);

    if (user) {
      throw new ApolloError('User already exist');
    }

    user = this.userRepository.create();
    user.email = input.email.toLowerCase();
    user.availableMeetings = 8;
    user.invitedByUserId = authUser.id;
    user.language = 'uk';
    return this.userRepository.save(user);
  }

  async updateLanguage(authUser: AuthUser, input: UserLanguageInput) {
    const user = await this.findOne(authUser);
    user.language = input.language;
    return this.userRepository.save(user);
  }

  private async setupTestUser() {
    // pass from gmail of this user UTUosLEtyPOT
    this.createTestUser({
      ageRange: '20-30',
      gender: GenderType.MALE,
      name: 'Man',
      birthday: new Date(1990, 1, 1),
      zodiacSign: ZodiacSign.AQUARIUS,
      googleId: '104310024965242061438',
      email: 'man.omeetuser@gmail.com',
      isPhotoAvailable: true,
      lookingFor: GenderType.FEMALE,
      cityId: 'noCityLikeThatOnlyForTesting',
      cityLabel: 'noCityLikeThatOnlyForTesting',
      availableMeetings: 8,
    });

    // pass from gmail of this user UTUosLEtyPOT
    this.createTestUser({
      ageRange: '20-30',
      gender: GenderType.FEMALE,
      name: 'Woman',
      birthday: new Date(1990, 1, 1),
      zodiacSign: ZodiacSign.AQUARIUS,
      googleId: '107851944884722416658',
      email: 'woman.omeetuser@gmail.com',
      isPhotoAvailable: true,
      lookingFor: GenderType.MALE,
      cityId: 'noCityLikeThatOnlyForTesting',
      cityLabel: 'noCityLikeThatOnlyForTesting',
      availableMeetings: 8,
    });
  }

  private async createTestUser(inputUser: Omit<User, 'id'>) {
    // user
    let user = await this.userRepository.findOne({
      where: { email: inputUser.email },
    });

    if (user) {
      return;
    }

    user = this.userRepository.create(inputUser);
    await this.userRepository.save(user);

    // answer
    const answer = this.answerRepository.create({
      questionId: 1,
      user,
      duration: 0,
      lastChangedDateTime: new Date(),
    });
    this.answerRepository.save(answer);

    // spaces
    const userFolder = `${process.cwd()}/mock/user/${user.name.toLowerCase()}`;

    this.s3Service.putObject({
      Key: `${user.id}/photo.jpeg`,
      Body: readFileSync(`${userFolder}/photo.jpeg`),
      ContentType: 'image/jpeg',
    });

    this.s3Service.putObject({
      Key: `${user.id}/video/answers/1.mp4`,
      Body: readFileSync(`${userFolder}/video.mp4`),
      ContentType: 'video/mp4',
    });

    this.s3Service.putObject({
      Key: `${user.id}/video/mainVideo.mp4`,
      Body: readFileSync(`${userFolder}/video.mp4`),
      ContentType: 'video/mp4',
    });
  }
}
