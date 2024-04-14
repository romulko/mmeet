import { Field, InputType } from '@nestjs/graphql';
import { GenderType, ZodiacSign } from './user.entity';

@InputType()
export class UserFindPeopleInput {
  @Field()
  userId: number;

  @Field()
  fromAge: Date;

  @Field()
  toAge: Date;

  @Field()
  cityId: string;

  @Field(() => GenderType)
  lookingFor: GenderType;

  @Field(() => [ZodiacSign], { nullable: true })
  zodiacSigns?: ZodiacSign[];
}

@InputType()
export class UserNameInput {
  @Field()
  name: string;
}

@InputType()
export class UserBirthdayInput {
  @Field()
  birthday: Date;
}

@InputType()
export class UserGenderInput {
  @Field(() => GenderType)
  gender: GenderType;
}

@InputType()
export class UserContactInfoInput {
  @Field()
  contactInfo: string;
}

@InputType()
export class UserLookingForInput {
  @Field(() => GenderType)
  lookingFor: GenderType;
}

@InputType()
export class UserAgeRangeInput {
  @Field()
  from: number;

  @Field()
  to: number;
}

@InputType()
export class UserCityInput {
  @Field()
  cityId: string;

  @Field()
  cityLabel: string;
}

@InputType()
export class UserZodiacSignsInput {
  @Field(() => [ZodiacSign], { nullable: true })
  zodiacSigns?: ZodiacSign[];
}

@InputType()
export class UserInviteFriendInput {
  @Field()
  email: string;
}

@InputType()
export class UserLanguageInput {
  @Field()
  language: string;
}
