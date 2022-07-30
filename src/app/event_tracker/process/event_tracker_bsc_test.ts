import { bscTestProvider } from "src/util/provider";
import { ContractData, EventTracker } from "../event_tracker";

import { contractBscTestWorldA } from "src/app/play/WorldA/worldA_event_tracker";
import { networkHexBscTest } from "src/util/network";
import { title } from "process";
import { Cron } from "@nestjs/schedule";

let tracker: EventTracker;
const network = networkHexBscTest;
const interval = 5 * 1000;

export const main = () => {
	const ContractDatas: ContractData[] = [
		contractBscTestWorldA
	]

	tracker = new EventTracker(
		network,
		bscTestProvider()[0],
		ContractDatas,
		title,
		interval
	)

	tracker.startSync();

	
}

export const stop = () => {
	tracker.cancelSync();
}