import { Body, Controller, Get, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() data: CreateCatDto): Promise<Cat> {
    return this.catsService.create(data);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
