import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum GenderType {
  MALE,
  FEMALE,
}

export enum ZodiacSign {
  ARIES,
  TAURUS,
  GEMINI,
  CANCER,
  LEO,
  VIRGO,
  LIBRA,
  SCORPIUS,
  SAGITTARIUS,
  CAPRICORNUS,
  AQUARIUS,
  PISCES,
}

registerEnumType(GenderType, {
  name: 'GenderType',
});

registerEnumType(ZodiacSign, {
  name: 'ZodiacSign',
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fcmToken?: string;

  @Field({ nullable: true })
  @Index()
  @Column({ nullable: true })
  googleId?: string;

  @Field({ nullable: true })
  @Index()
  @Column({ nullable: true })
  appleUserId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  invitedByUserId?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => GenderType, { nullable: true })
  @Column({
    type: 'enum',
    enum: GenderType,
    default: GenderType.MALE,
    nullable: true,
  })
  gender?: GenderType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfo?: string;

  @Field(() => GenderType, { nullable: true })
  @Column({
    type: 'enum',
    enum: GenderType,
    default: GenderType.FEMALE,
    nullable: true,
  })
  lookingFor?: GenderType;

  @Field({ nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  birthday?: Date;

  @Field(() => ZodiacSign, { nullable: true })
  @Column({
    type: 'enum',
    enum: ZodiacSign,
    nullable: true,
  })
  zodiacSign?: ZodiacSign;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cityId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'decimal' })
  cityLat?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'decimal' })
  cityLng?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cityLabel?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isPhotoAvailable?: boolean;

  // 20-30
  @Field({ nullable: true })
  @Column({ nullable: true })
  ageRange?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  availableMeetings?: number;

  @Field(() => [ZodiacSign], { nullable: true })
  @Column({ type: 'numeric', array: true, nullable: true })
  zodiacSigns?: ZodiacSign[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  language?: string;
}
