import { Logger } from "@nestjs/common";
import { existLog, overWriteLog, readLog } from "src/util/log";
import { getNetworkName, getPrevBlock } from "src/util/network";
import { isPromiseError, promise } from "src/util/promise";
import { sleep, getTime, getTimestampToDate } from "src/util/time";
import Web3 from "web3";

export class EventTracker {
  isRunning: boolean;
  networkName: string;
  blockMemoPath: string;
  lastSyncedBlock: number;
  contracts: any[];
  logger: Logger;
	web3: Web3;
	maxCheckCount: number;

  constructor(
    private network: string,
    private endPoint: string[],
    private contractDatas: ContractData[],
    private interval: number,
		private isScheduler: boolean
  ) {

    this.isRunning = false;
    this.networkName = getNetworkName(network);
    this.blockMemoPath = `log/${this.networkName}_block.txt`;
		this.web3 = null;
		this.lastSyncedBlock = 0;
		if(!isScheduler) {
			this.logger = new Logger(`Event Tracker ${this.networkName}`);
		} else {
			this.logger = new Logger(`Event Tracker Scheduler ${this.networkName}`);
		}
		this.maxCheckCount = 64;

		this.logger.log(`[${this.networkName}] Start Event Tracker`);
  }

  connect(endPoint): void {
		let web3;
		let contracts = [];
		web3 = new Web3(endPoint);

		for (let i = 0; i < this.contractDatas.length; i++) {
			let addr = this.contractDatas[i].address;
			let abi = this.contractDatas[i].abi;

			contracts.push(new web3.eth.Contract(abi, addr));
		}

		this.web3 = web3;
		this.contracts = contracts;
	}

  disconnect(): void {
		if (this.web3 !== null) {
			this.web3.eth.currentProvider.disconnect();
			this.web3 = null;
		}
	}

  async getBlockNumber() {
		const res =	await promise(this.web3.eth.getBlockNumber(), 2000);
		return res;
	}

  async init() {
		if (existLog(this.blockMemoPath)) {
			this.lastSyncedBlock = parseInt(readLog(this.blockMemoPath));
		} else {
			this.connect(this.endPoint[0]);

			let res = await this.getBlockNumber();
			while (isPromiseError(res)) {
				await sleep(1000);
				res = await this.getBlockNumber();
			}
			this.lastSyncedBlock = parseInt(res);
			if(!this.isScheduler) {
				overWriteLog(this.blockMemoPath, String(this.lastSyncedBlock));
			}

			await this.disconnect();
		}
		this.lastSyncedBlock -= 1;
    this.logger.log(`[${this.networkName}] ${getTime()[1]} init : ${this.lastSyncedBlock}`);
	}

  async sync(_start: number, _end: number) {
		this.logger.log(`[${this.networkName}] start sync ${_start} ~ ${_end}`);
		let maxCount: number = this.maxCheckCount;
		let _div: number = Math.floor((_end - _start) / maxCount);
		let _else = (_end - _start) % maxCount > 0 ? 1 : 0;
		let _count = _div + _else;

		let weight = _count / 30;
		weight = weight > 4 ? 4 : weight;
		let sleepTime = 1000 * (weight > 1 ? weight : 1);
		for (let a = 0; a < _count; a++) {
			for(let b = 0; b < this.endPoint.length; b++) {
				await this.disconnect();
				this.connect(this.endPoint[b]);

				let time = getTime();
				let _fromBlock = _start + a * maxCount + (a > 0 ? 1 : 0);
				let _toBlock = _start + (a + 1) * maxCount;
				_toBlock = _toBlock > _end ? _end : _toBlock;

				this.logger.log(`[${this.networkName}][${a}][${b}][${time[1]}] sync : ${_fromBlock} ~ ${_toBlock}`);

				try {
					let promises = [];
					for (let i = 0; i < this.contracts.length; i++) {
						promises.push(
							this.contracts[i].getPastEvents("allEvents", {
								fromBlock: _fromBlock,
								toBlock: _toBlock,
							})
						);
					}

					const Events = await Promise.all(promises);

					for (let i = 0; i < this.contracts.length; i++) {
						await this.contractDatas[i].funcOnEvent(
							this,
							Events[i],
							`log/${this.contractDatas[i].title}_${this.networkName}_${this.contractDatas[i].category}_${time[0]}_log.txt`,
							i
						);
					}

					if(!this.isScheduler) {
						this.lastSyncedBlock = _toBlock;
						overWriteLog(this.blockMemoPath, String(this.lastSyncedBlock));
					}
				} catch (err) {
					this.logger.error(`[${this.networkName}][${a}] ${err}`);
					a--;
				}

				await sleep(sleepTime);
			}
			
		}
	}

	async startSync() {
		this.isRunning = true;

		await this.init();

		while (this.isRunning) {
			this.connect(this.endPoint[0]);

			let curBlock;
			
			const res = await this.getBlockNumber();

			if (isPromiseError(res)) {
				this.disconnect();
				await sleep(1000);
				continue;
			}
			curBlock = res;

			this.logger.log(`[${this.networkName}] lastSyncedBlock ${this.lastSyncedBlock}, curBlock ${curBlock}`);
			if (this.lastSyncedBlock < curBlock) {
				await this.sync(this.lastSyncedBlock + 1, curBlock);
			}
			await this.disconnect();
			await sleep(this.interval);
		}

		this.logger.log(`[${this.networkName}] sync closed`);
	}

	async startSchedule(startMinuteFromNow, howMinute) {
		this.connect(this.endPoint[0]);
		const time = getTime();
		const { startBlock, endBlock } = await getPrevBlock(this.web3, startMinuteFromNow, howMinute);
		let startBlockNumber = await this.web3.eth.getBlock(startBlock);
		let startBlockTimestamp: number = Number(startBlockNumber.timestamp) * 1000;
		
		let endBlockNumber = await this.web3.eth.getBlock(endBlock);
		let endBlockTimestamp = Number(endBlockNumber.timestamp) * 1000;

		this.logger.log(`[${this.networkName}] ${time[1]} start ${howMinute} minute check block, startBlock ${startBlock} ${getTimestampToDate(startBlockTimestamp)}, endBlock ${endBlock} ${getTimestampToDate(endBlockTimestamp)}`);
		await this.sync(startBlock, endBlock);
		await this.disconnect();
	}

	cancelSync() {
		this.isRunning = false;
	}
}

export class ContractData {
  constructor(
    public address: string,
    public abi: any,
    public category: string,
    public title: string,
    public funcOnEvent: any
  ){}
}