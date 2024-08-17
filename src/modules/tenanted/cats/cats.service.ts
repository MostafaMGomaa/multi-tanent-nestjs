import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly catsRepo: Repository<Cat>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.catsRepo = this.dataSource.getRepository(Cat);
  }

  async create(data: CreateCatDto): Promise<Cat> {
    console.log(this.catsRepo);
    const cat = this.catsRepo.create({ name: data.name });
    return await this.catsRepo.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catsRepo.find();
  }
}
