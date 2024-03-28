import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('MONGO_SERVICE') private mongoService: ClientProxy,
    @Inject('SEARCH_SERVICE') private searchService: ClientProxy,
  ) {}

  @Get('/sectors')
  getAllSectors() {
    return this.mongoService.send({ cmd: 'get_sectors' }, {});
  }

  @Post('/search')
  addSearch(@Body() body) {
    return this.mongoService.send({ cmd: 'create_search' }, body);
  }

  @Get('/searchs')
  getAllSearch(@Query() query) {
    return this.mongoService.send({ cmd: 'get_searchs' }, query.userId);
  }

  @Get('/process')
  process() {
    return this.searchService.send({ cmd: 'process_searchs' }, {});
  }
}
