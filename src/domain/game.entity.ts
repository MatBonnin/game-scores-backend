import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Player } from './player.entity';

@ObjectType() 
@Entity()
export class Game {
  @Field() 
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Player)
  @ManyToOne(() => Player)
  @JoinColumn({ name: 'playerId' })
  player: Player;

  @Field()
  @Column('int')
  score: number;

  @Field()
  @Column('bool')
  victory: boolean;

  @Field()
  @Column('date')
  date: Date;
}
