// scores/scores.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  create(@Body('pseudo') pseudo: string, @Body('score') score: number) {
    return this.scoresService.create(pseudo, score);
  }

  @Get()
  async findAll() {
    let scores = await this.scoresService.findAll();
    return scores
  }
}
