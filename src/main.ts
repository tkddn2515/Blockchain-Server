import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EventTrackerApp } from './app/event_tracker/event_tracker_app';

const eventTrackerApp: EventTrackerApp = new EventTrackerApp();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,  // DTO에 없는 파라미터가 들어왔을 시 알려줌
    transform: true // 타입 변환을 자동으로 시켜줌
  }))

  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`Blockchain Server Listen port ${port}`);

  // 이벤트 트랙킹 서버 시작
  eventTrackerApp.startEventTracker();
}

export function stopEventTracker() {
  eventTrackerApp.stopEventTracker();
}

bootstrap();