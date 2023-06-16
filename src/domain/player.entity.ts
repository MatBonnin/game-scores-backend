import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { PlayerLevel } from './playerLever.enum';

registerEnumType(PlayerLevel, {
  name: 'PlayerLevel',
});

@ObjectType() 
@Entity()
export class Player {
  @Field() 
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => PlayerLevel)
  @Column({type: 'enum', enum: PlayerLevel})
  level: PlayerLevel;

  @Field()
  @Column('int')
  nbVictoires: number;

  @Field()
  @Column('int')
  nbFailures: number;

  @Field()
  @Column('date')
  @CreateDateColumn()
  firstTime: Date;

  @Field()
  @Column('date')
  @UpdateDateColumn()
  lastTime: Date;
}
