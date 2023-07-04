import { Controller, Get, Header } from '@nestjs/common';
import { Item } from './test.interface';

@Controller('test')
export class TestController {
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getData(): Item[] {
    // Renvoyer des données fictives à des fins de démonstration
    const items: Item[] = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    return items;
  }
}
