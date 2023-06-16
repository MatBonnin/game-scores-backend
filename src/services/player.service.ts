import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/domain/player.entity';
import { PlayerLevel } from 'src/domain/playerLever.enum';
import { Repository } from 'typeorm';


@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findOneById(id: number): Promise<Player | undefined> {
    return this.playerRepository.findOne({where : { id: id}});
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async create(name: string, level: PlayerLevel = PlayerLevel.Newbie,nbVictoires:number, nbFailures:number): Promise<Player> {
    const player = new Player();
    player.name = name;
    player.level = level;
    player.nbVictoires = nbVictoires
    player.nbFailures= nbFailures
    return this.playerRepository.save(player);
  }
}
