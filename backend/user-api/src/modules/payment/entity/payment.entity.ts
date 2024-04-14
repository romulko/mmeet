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
export class Payment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column()
  productId: string;

  @Field(() => String)
  @Column({ type: 'jsonb' })
  purchase: any;
}

@ObjectType()
export class AvailableMeetingsPerWeek {
  @Field()
  count: number;
}

@ObjectType()
export class AvailableMeetingsInThisWeek {
  @Field()
  count: number;
}
