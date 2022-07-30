export const networkHexEthMain = "0x1";
export const networkHexEthRops = "0x3";
export const networkHexEthRink = "0x4";
export const networkHexBscMain = "0x38";
export const networkHexBscTest = "0x61";
export const networkHexPolMain = "0x89";
export const networkHexPolTest = "0x13881";

// chainId(dec) to string
export const getNetworkName = (_network = "0x1") => {
	switch (_network) {
		case "0x1":
    case "1":
			return "ETH-MAIN";
		case "0x3":
    case "3":
			return "ETH-TEST-ROP";
		case "0x4":
    case "4":
			return "ETH-TEST-RINK";
		case "0x38":
    case "56":
			return "BSC-MAIN";
		case "0x61":
    case "97":
			return "BSC-TEST";
		case "0x89":
    case "137":
			return "POL-MAIN";
		case "0x13881":
    case "80001":
			return "POL-TEST";
		default:
			return "NOT-DEFINED";
	}
}

// string { chainId }
export const NETWORK = {
	ETH_MAIN: {
		code: "0x1",
	},
	ETH_TEST_ROP: {
		code: "0x3",
	},
	ETH_TEST_RINK: {
		code: "0x4",
	},
	BSC_MAIN: {
		code: "0x38",
	},
	BSC_TEST: {
		code: "0x61",
	},
};

// 몇분 전의 블록부터 그로부터 몇분 후의 블록 가져오기
export const getPrevBlock = async (web3, startMinuteFromNow, howMinute) => {
	let curBlock = await web3.eth.getBlockNumber();
	let today = new Date();
	let startTimestamp;
	let endTimestamp;
  startTimestamp = today.setMinutes(today.getMinutes() - startMinuteFromNow);
  let endTime = new Date(startTimestamp);
  endTimestamp = endTime.setMinutes(new Date(endTime).getMinutes() + howMinute);
	let startBlock;
	let endBlock;

	while (true) {
		curBlock -= 10000;
		let block = await web3.eth.getBlock(curBlock);
    
		let timestamp = block.timestamp * 1000;
		if (endBlock == undefined && timestamp <= endTimestamp) {
      let clear = 10000;
			while (true) {
				if (timestamp <= endTimestamp) {
          if(clear > 1000) {
            curBlock += 1000;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
        }
				if (timestamp >= endTimestamp) {
          if(clear > 100) {
            clear = 1000;
            curBlock -= 100;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
				}
        if (timestamp <= endTimestamp) {
          if(clear > 10) {
            clear = 100;
            curBlock += 10;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
        }
        if (timestamp >= endTimestamp) {
          clear = 10;
          curBlock -= 1;
          block = await web3.eth.getBlock(curBlock);
          timestamp = block.timestamp * 1000;
          if (timestamp <= endTimestamp) {
            endBlock = curBlock;
            break;
          }
        }
			}
		}
		if (startBlock == undefined && timestamp <= startTimestamp) {
      let clear = 10000;
			while (true) {
				if (timestamp <= startTimestamp) {
          if(clear > 1000) {
            curBlock += 1000;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
        }
				if (timestamp >= startTimestamp) {
          if(clear > 100) {
            clear = 1000;
            curBlock -= 100;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
				}
        if (timestamp <= startTimestamp) {
          if(clear > 10) {
            clear = 100;
            curBlock += 10;
            block = await web3.eth.getBlock(curBlock);
            timestamp = block.timestamp * 1000;
            continue;
          }
        }
        if (timestamp >= startTimestamp) {
          clear = 10;
          curBlock -= 1;
          block = await web3.eth.getBlock(curBlock);
          timestamp = block.timestamp * 1000;
          if (timestamp <= startTimestamp) {
            startBlock = curBlock;
            break;
          }
        }
			}
		}
    if(startBlock != undefined) {
      return { startBlock, endBlock };
    }
	}
}