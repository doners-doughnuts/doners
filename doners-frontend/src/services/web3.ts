// ? [해결] 왜 .ts 파일에서는 import가 되지 않는가. js만 지원?
import { FundraiserABI } from 'assets/abi/FundraiserABI';
import { FundraiserFactoryABI } from 'assets/abi/FundraiserFactoryABI';
import { SsfABI } from 'assets/abi/SsfABI';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// TODO move to .env
const HTTP_PROVIDER = 'http://20.196.209.2:8545';
const WEBSOCKET_PROVIDER = 'ws://20.196.209.2:6174';
const CHAIN_ID = '31221';

const SSF_ERC20_CONTRACT_ADDRESS = '0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333';

//* Remote Node Provider
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
export const Web3Client = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(HTTP_PROVIDER)
);
// web-socket
//// const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER));

export const FundraiserContract = (contractAddress: string) => {
  return new Web3Client.eth.Contract(FundraiserABI, contractAddress);
};
export const FundraiserFactoryContract = (contractAddress: string) => {
  return new Web3Client.eth.Contract(FundraiserFactoryABI, contractAddress);
};

export const SSFContract = new Web3Client.eth.Contract(
  SsfABI,
  SSF_ERC20_CONTRACT_ADDRESS
);

// TODO 삭제
// The minimum ABI required to get the ERC20 Token balance
// const minABI: AbiItem | AbiItem[] = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: '_owner', type: 'address' }],
//     name: 'balanceOf',
//     outputs: [{ name: 'balance', type: 'uint256' }],
//     type: 'function',
//   },
// ];

// const minABI: AbiItem | AbiItem[] = ABI;
// const CONTRACT_ABI: AbiItem | AbiItem[] = [];

// const tokenAddress = '0xFacc3F3032642F08F239F8f2e1f0Cf70c855933b';
// const walletAddress = '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367';

// export const SsfContract = new Web3Client.eth.Contract(minABI, tokenAddress);
