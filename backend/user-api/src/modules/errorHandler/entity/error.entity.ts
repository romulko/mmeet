import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int } from '@nestjs/graphql';

@Entity()
export class ErrorEntity extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'jsonb' })
  error: any;
}
