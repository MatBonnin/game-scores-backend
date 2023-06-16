import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/domain/game.entity';
import { Player } from 'src/domain/player.entity';
import { Repository } from 'typeorm';


@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) {}

  async findOneById(id: number): Promise<Game | undefined> {
    return this.gameRepository.findOneBy({id});
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findByPlayer(playerId: number): Promise<Game[]> {
    return this.gameRepository.find({ where: { player: { id: playerId } } });
  }
  
  //Create
  async create(playerId: number, score: number, victory: boolean): Promise<Game> {
    // Find the player by ID
    const player = await this.playerRepository.findOne({where : { id : playerId } });

    if (!player) {
        throw new Error('Player not found');
    }

    // Create a new game instance
    const game = new Game();
    game.player = player;
    game.score = score;
    game.victory = victory;
    game.date = new Date();

    // Save the game in the database
    return await this.gameRepository.save(game);
}
}
