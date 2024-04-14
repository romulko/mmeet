import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Match } from '../../match/entity/match.entity';

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  placeId: string;

  @Field()
  @Column()
  placeLabel: string;

  @Field()
  @Column({ type: 'decimal' })
  lat: number;

  @Field()
  @Column({ type: 'decimal' })
  lng: number;

  @Field()
  @Column({ type: 'timestamptz' })
  time: Date;
}

@ObjectType()
@Entity()
export class Meeting extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Match)
  @OneToOne(() => Match)
  match: Match;

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  fromUserAddress: Address;

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  toUserAddress: Address;

  @Field(() => Address, { nullable: true })
  @OneToOne(() => Address, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  acceptedAddress: Address;
}
