import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmExModule } from 'src/databases/typeorm-ex.module';
import { WorldARepository } from 'src/modules/world-a/world-a.repository';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CheckLog, CheckLogSchema } from './schemas/check-log.schema';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      WorldARepository
    ]),
    MongooseModule.forFeature([{ name: CheckLog.name, schema: CheckLogSchema }])
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
