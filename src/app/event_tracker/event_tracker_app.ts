import { EventTrackerStarter } from './event_tracker_starter';
import * as providers from '../../util/provider';

import * as worldA from '../play/WorldA/worldA_event_tracker';

export class EventTrackerApp {
  event_tracker_eth_main: EventTrackerStarter;
  event_tracker_bsc_main: EventTrackerStarter;
  event_tracker_pol_main: EventTrackerStarter;

  event_tracker_eth_test: EventTrackerStarter;
  event_tracker_bsc_test: EventTrackerStarter;
  event_tracker_pol_test: EventTrackerStarter;

  constructor() {
    this.event_tracker_bsc_test = new EventTrackerStarter(
      '0x61',
      providers.bscTestProvider(),
      [worldA.contractBscTestWorldA]
    );

    // this.event_tracker_pol_test = new EventTrackerStarter(
    //   '0x13881',
    //   providers.polTestProvider(),
    //   [worldA.contractPolTestWorldA]
    // );
  }

  startEventTracker = () => {
    this.event_tracker_bsc_test.start();
    // this.event_tracker_pol_test.start();
  };

  stopEventTracker = () => {
    this.event_tracker_bsc_test.stop();
    // this.event_tracker_pol_test.stop();
  };
}
