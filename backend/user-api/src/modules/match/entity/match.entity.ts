import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Meeting } from '../../meeting/entity/meeting.entity';

@ObjectType()
@Entity()
export class Match extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fromUserInterestedPhoto?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  toUserInterestedPhoto?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fromUserInterestedVideo?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  toUserInterestedVideo?: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  fromUser: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  toUser: User;

  @Field(() => Meeting, { nullable: true })
  @OneToOne(() => Meeting, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  meeting: Meeting;

  @Field({ nullable: true })
  isFromUserHasVideo?: boolean;

  @Field({ nullable: true })
  isToUserHasVideo?: boolean;
}
