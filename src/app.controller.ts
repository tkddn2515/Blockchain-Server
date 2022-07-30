import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('stop')
  stop() {
    this.appService.stop();
  }
}
