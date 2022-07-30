import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { WorldARepository } from 'src/modules/world-a/world-a.repository';
import { CheckLog, CheckLogDocument } from './schemas/check-log.schema';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(CheckLog.name) private readonly checkLogModel: Model<CheckLogDocument>,
    @InjectRepository(WorldARepository) private readonly worldARepository: WorldARepository
  ) {}
//#region Common
  async existLog(body): Promise<boolean> {
    const findOne = await this.checkLogModel.findOne({body}).lean();
    if(findOne) {
      return true;
    }
    return false;
  }

  async insertLog(body): Promise<void> {
    const checkLog = new this.checkLogModel({body});
    await checkLog.save();
  }
//#endregion

  async createWorldA(body): Promise<string> {
    if(await this.existLog(body)) {
      return "exist";
    }
    const result = await this.worldARepository.createWorldA(body);
    if(result == 'true') {
      await this.insertLog(body);
    }
    return result;
  }
}