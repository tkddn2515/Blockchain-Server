import { polTestProvider } from "src/util/provider";
import { ContractData, EventTracker } from "../event_tracker";

import { contractPolTestWorldA } from "src/app/play/WorldA/worldA_event_tracker";
import { networkHexPolTest } from "src/util/network";
import { title } from "process";

let tracker: EventTracker;
const network = networkHexPolTest;
const interval = 5 * 1000;

export const main = () => {
	const ContractDatas: ContractData[] = [
		contractPolTestWorldA
	]

	tracker = new EventTracker(
		network,
		polTestProvider()[0],
		ContractDatas,
		title,
		interval
	)

	tracker.startSync();
}

export const stop = () => {
	tracker.cancelSync();
}