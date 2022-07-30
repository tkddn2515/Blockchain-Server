import { Injectable } from "@nestjs/common";
import * as event_tracker_bsc_test from "./event_tracker/process/event_tracker_bsc_test";
import * as event_tracker_pol_test from "./event_tracker/process/event_tracker_pol_test";

@Injectable()
export class EventTrackerApp {
  startEventTracker = () => {
    event_tracker_bsc_test.main();
    event_tracker_pol_test.main();
  }
  
  stopEventTracker = () => {
    event_tracker_bsc_test.stop();
    event_tracker_pol_test.stop();
  }
}

