import { bscTestProvider } from "src/util/provider";
import { ContractData, EventTracker } from "./event_tracker";

import { contractBscTestWorldA } from "src/app/play/WorldA/worldA_event_tracker";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";

export class EventTrackerStarter {

	tracker: EventTracker;
	trackerScheduler: EventTracker;
	interval: number = 5 * 1000;
	schedulerRegistry: SchedulerRegistry;
	
	constructor(private network: string, private providers: string[][], private ContractDatas: ContractData[]) 
	{
		this.schedulerRegistry = new SchedulerRegistry();
	}

	schedule(time, startMinuteFromNow, howMinute): CronJob {
		const job = new CronJob(time, () => {
			this.trackerScheduler.startSchedule(startMinuteFromNow, howMinute);
    });
		return job;
	}

	start = () => {
		this.ContractDatas = [
			contractBscTestWorldA
		]

		this.tracker = new EventTracker(
			this.network,
			this.providers[0],
			this.ContractDatas,
			this.interval,
			false
		)
		this.tracker.startSync();

		this.trackerScheduler = new EventTracker(
			this.network,
			this.providers[1],
			this.ContractDatas,
			this.interval,
			true
		)
		const name1 = '5 minutes';
		const job1 = this.schedule(`0 4,9,14,19,24,29,34,39,44,49,54,59 * * * *`, 10, 5);
		const name2 = '60 minutes';
		const job2 = this.schedule(`0 20 * * * *`, 60 * 2, 60);
		const name3 = 'one days';
		const job3 = this.schedule(`0 40 0 * * *`, 60 * 24 * 2, 60 * 24);

		this.schedulerRegistry.addCronJob(name1, job1);
		this.schedulerRegistry.addCronJob(name2, job2);
		this.schedulerRegistry.addCronJob(name3, job3);

		const j1 = this.schedulerRegistry.getCronJob(name1);
		const j2 = this.schedulerRegistry.getCronJob(name2);
		const j3 = this.schedulerRegistry.getCronJob(name3);

		j1.start();
		j2.start();
		j3.start();
	}

	stop = () => {
		this.tracker.cancelSync();
	}
}

