import { Post } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  logger: Logger;
  constructor(private apiService: ApiService) {
    this.logger = new Logger("ApiController");
  }

  @Post('/createWorldA')
  async createWorldA(@Body() data) {
    return await this.apiService.createWorldA(data);
  }
}