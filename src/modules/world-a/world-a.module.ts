import { Module } from '@nestjs/common';
import { Web3Service } from 'src/app/web3-service';
import { TypeOrmExModule } from 'src/databases/typeorm-ex.module';
import { WorldAController } from './world-a.controller';
import { WorldARepository } from './world-a.repository';
import { WorldAService } from './world-a.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([WorldARepository])
  ],
  controllers: [WorldAController],
  providers: [WorldAService, Web3Service]
})
export class WorldAModule {}