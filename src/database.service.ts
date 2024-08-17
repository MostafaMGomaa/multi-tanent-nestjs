import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import ormConfig from './orm.config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private _defaultDataSource: DataSource;

  constructor() {
    this._defaultDataSource = new DataSource(ormConfig);
  }

  public get defaultDataSource(): DataSource {
    return this._defaultDataSource;
  }

  async onModuleInit() {
    await this._defaultDataSource.initialize();
  }

  async onModuleDestroy() {
    await this._defaultDataSource.destroy();
  }
}
