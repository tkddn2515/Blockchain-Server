import { Injectable, InternalServerErrorException } from "@nestjs/common";
import Web3 from "web3";
import * as providers from '../util/provider';

export let webEthMain: Web3;
export let webBscMain: Web3;
export let webPolMain: Web3;
export let webEthTest: Web3;
export let webBscTest: Web3;
export let webPolTest: Web3;

@Injectable()
export class Web3Service {

  constructor() {
    webEthMain = this.getWeb3(providers.ethMainProvider()[2]);
    webBscMain = this.getWeb3(providers.bscMainProvider()[2]);
    webPolMain = this.getWeb3(providers.polMainProvider()[2]);
    webEthTest = this.getWeb3(providers.ethRinkProvider()[2]);
    webBscTest = this.getWeb3(providers.bscTestProvider()[2]);
    webPolTest = this.getWeb3(providers.polTestProvider()[2]);
  }

  getWebEthMain(): Web3 {
    return webEthMain;
  }

  getWebBscMain(): Web3 {
    return webBscMain;
  }

  getWebPolMain(): Web3 {
    return webPolMain;
  }

  getWebEthTest(): Web3 {
    return webEthTest;
  }

  getWebBscTest(): Web3 {
    return webBscTest;
  }

  getWebPolTest(): Web3 {
    return webPolTest;
  }

  getWeb3(provider): Web3 {
    try{
      return new Web3(provider);
    } catch(e) {
      throw new InternalServerErrorException(e);
    }
  }

  getContract(web3: Web3, addr: string, abi: any) {
    try {
      return new web3.eth.Contract(abi, addr)
    } catch(e) {
      throw new InternalServerErrorException(e);
    }
  }

  async call(contract: any, method: string, params: object = {}) {
    const keys = Object.keys(params);
    switch(keys.length) {
      case 0:
        return await contract.methods[method]().call();
      case 1:
        return await contract.methods[method](params[keys[0]]).call();
      case 2:
        return await contract.methods[method](params[keys[0]], params[keys[1]]).call();
      case 3:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]]).call();
      case 4:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]]).call();
      case 5:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]]).call();
      case 6:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]]).call();
      case 7:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]]).call();
      case 8:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]]).call();
      case 9:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]], params[keys[8]]).call();
      case 10:
        return await contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]], params[keys[8]], params[keys[9]]).call();
    }
  }

  async sendTranscation(web3: Web3, contract: any, method: string, addr: string, privateKey: string, params: object) {
    let encodedABI = this.encodedABI(contract, method, params);
    const txObject = {
			// gasPrice: web3.eth.getGasPrice(),
			to: addr, // 컨트랙트 주소
			gas: 2100000,
			value: web3.utils.toWei("0", "ether"), // payable 함수 호출시 값 넣을 것.
			data: encodedABI,
		};

    const signed = await web3.eth.accounts.signTransaction(
			txObject,
			privateKey
		);

		let transaction = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return transaction;
  }

  encodedABI(contract, method, params) {
    const keys = Object.keys(params);
    switch(keys.length) {
      case 0:
        return contract.methods[method]().encodeABI();
      case 1:
        return contract.methods[method](params[keys[0]]).encodeABI();
      case 2:
        return contract.methods[method](params[keys[0]], params[keys[1]]).encodeABI();
      case 3:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]]).encodeABI();
      case 4:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]]).encodeABI();
      case 5:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]]).encodeABI();
      case 6:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]]).encodeABI();
      case 7:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]]).encodeABI();
      case 8:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]]).encodeABI();
      case 9:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]], params[keys[8]]).encodeABI();
      case 10:
        return contract.methods[method](params[keys[0]], params[keys[1]], params[keys[2]], params[keys[3]], params[keys[4]], params[keys[5]], params[keys[6]], params[keys[7]], params[keys[8]], params[keys[9]]).encodeABI();
    }
  }
}