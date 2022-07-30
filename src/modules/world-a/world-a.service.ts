import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bsc_testnet_addr,abi } from 'src/app/play/WorldA/contract';
import { Web3Service } from 'src/app/web3-service';
import { CreateWorldADto } from './dto/create-worldA.dto';
import { WorldA } from './world-a.entity';
import { WorldARepository } from './world-a.repository';


@Injectable()
export class WorldAService {
  constructor(
    @InjectRepository(WorldARepository)
    private readonly worldARepository: WorldARepository,
    private readonly web3Service: Web3Service
  ) {}

  contract = null;

  async createWorldA(createWorldADto: CreateWorldADto): Promise<string> {
    return this.worldARepository.createWorldA(createWorldADto);
  }

  async getWorldA() {
    if(this.contract == null) {
      this.contract = this.web3Service.getContract(this.web3Service.getWebBscTest(), bsc_testnet_addr, abi);
    }
    return this.web3Service.call(this.contract, "getA", {});
  }

  async setWorldA(a: number) {
    if(this.contract == null) {
      this.contract = this.web3Service.getContract(this.web3Service.getWebBscTest(), bsc_testnet_addr, abi);
    }
    return this.web3Service.sendTranscation(this.web3Service.getWebBscTest(), this.contract, "setA", bsc_testnet_addr, "6576d50eec989e58e636c2fad6d2d2d129bbd564b87a3029910a10b16a4baf02", { newA: a });
  }
}