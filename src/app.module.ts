import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Game } from './domain/game.entity';
import { GameService } from './services/game.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { Player } from './domain/player.entity';
import { PlayerResolver } from './resolver/player.resolver';
import { PlayerService } from './services/player.service';
import { ScoresModule } from './scores/scores.module';
// import { ScoresModule } from '../../../jeuPhaser/vscode/scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'admin',
      password: 'admin',
      database: 'jeu',
      autoLoadEntities:true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/schema.gql'),
      buildSchemaOptions:{
        numberScalarMode:'integer'
      }
    }),
    TypeOrmModule.forFeature([
      Player,Game
    ]),
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [PlayerResolver, AppService,GameService,PlayerService],
})
export class AppModule {}
