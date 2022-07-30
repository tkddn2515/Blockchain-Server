import { Injectable } from '@nestjs/common';
import { stopEventTracker } from './main';

@Injectable()
export class AppService {
  stop() {
    stopEventTracker();
  }
}
