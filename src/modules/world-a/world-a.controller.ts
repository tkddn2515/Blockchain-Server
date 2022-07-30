import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateWorldADto } from './dto/create-worldA.dto';
import { WorldAService } from './world-a.service';

@Controller('world-a')
export class WorldAController {
  constructor(private readonly worldAService: WorldAService) {}
  
  @Get('/get')
  getWorldA() {
    return this.worldAService.getWorldA();
  }

  @Post('/set')
  setWorldA(@Body('a') a: number) {
    return this.worldAService.setWorldA(a);
  }
}