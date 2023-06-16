import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Player } from 'src/domain/player.entity';
import { PlayerLevel } from 'src/domain/playerLever.enum';
import { PlayerService } from 'src/services/player.service';


@Resolver(of => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  // Query to get all players
  @Query(returns => [Player])
  async players(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  // Query to get a single player by ID
  @Query(returns => Player)
  async player(@Args('id') id: number): Promise<Player> {
    return this.playerService.findOneById(id);
  }

  // Mutation to create a new player
  @Mutation(returns => Player)
  async createPlayer(
    @Args('name') name: string,
    @Args('level', { type: () => PlayerLevel }) level: PlayerLevel,
    @Args('nbVictoires') nbVictoires: number,
    @Args('nbFailures') nbFailures: number,
  ): Promise<Player> {
    return this.playerService.create(name, level, nbVictoires, nbFailures);
  }
}
