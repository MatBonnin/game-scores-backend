// scores/scores.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}

  async create(pseudo: string, score: number): Promise<Score> {
    const newScore = new Score();
    newScore.pseudo = pseudo;
    newScore.score = score;
    newScore.date = new Date()
    return this.scoresRepository.save(newScore);
  }
  
  findAll(): Promise<any> {
    return this.scoresRepository
        .createQueryBuilder("score")
        .select("score.pseudo")
        .addSelect("MAX(score.score)", "maxScore")
        .groupBy("score.pseudo")
        .orderBy("maxScore", "DESC")
        .getRawMany();
}
}
