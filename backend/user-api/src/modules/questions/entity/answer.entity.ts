import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType()
@Entity()
export class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  questionId: number;

  @Field()
  @Column()
  duration: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
