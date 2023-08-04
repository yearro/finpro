import { DataSource } from 'typeorm';

export abstract class Bootstrap {
  //Facade
  abstract initialize(): Promise<string | Error | DataSource>;
}
