import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
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
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AuthUser } from '../../auth/entity/authUser.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findPeople(@Args('input') input: UserFindPeopleInput) {
    return this.userService.findPeople(input);
  }

  @Query(() => User, { nullable: true })
  async me(@Context('authUser') authUser: AuthUser) {
    return this.userService.findOne(authUser);
  }

  @Mutation(() => User)
  async userDeleteAccount(@Context('authUser') authUser: AuthUser) {
    return this.userService.deleteAccount(authUser);
  }

  @Mutation(() => User)
  async userUpdateName(
    @Context('authUser') authUser: AuthUser,
    @Args('userNameInput') input: UserNameInput,
  ) {
    return this.userService.updateName(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateBirthday(
    @Context('authUser') authUser: AuthUser,
    @Args('userBirthdayInput') input: UserBirthdayInput,
  ) {
    return this.userService.updateBirthday(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateGender(
    @Context('authUser') authUser: AuthUser,
    @Args('userGenderInput') input: UserGenderInput,
  ) {
    return this.userService.updateGender(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateContactInfo(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: UserContactInfoInput,
  ) {
    return this.userService.updateContactInfo(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateLookingFor(
    @Context('authUser') authUser: AuthUser,
    @Args('userLookingForInput') input: UserLookingForInput,
  ) {
    return this.userService.updateLookingFor(authUser, input);
  }

  @Mutation(() => User)
  async userUpdatePhoto(
    @Context('authUser') authUser: AuthUser,
    @Args({ name: 'photo', type: () => GraphQLUpload })
    photo: FileUpload,
  ) {
    return this.userService.updatePhoto(authUser, photo);
  }

  @Mutation(() => User)
  async userUpdateAgeRange(
    @Context('authUser') authUser: AuthUser,
    @Args('userAgeRangeInput') input: UserAgeRangeInput,
  ) {
    return this.userService.updateAgeRange(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateCity(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: UserCityInput,
  ) {
    return this.userService.updateCity(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateZodiacSigns(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: UserZodiacSignsInput,
  ) {
    return this.userService.updateZodiacSigns(authUser, input);
  }

  @Mutation(() => User)
  async userInviteFriend(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: UserInviteFriendInput,
  ) {
    return this.userService.inviteFriend(authUser, input);
  }

  @Mutation(() => User)
  async userUpdateLanguage(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: UserLanguageInput,
  ) {
    return this.userService.updateLanguage(authUser, input);
  }
}
