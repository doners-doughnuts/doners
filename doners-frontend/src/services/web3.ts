// ? [해결] 왜 .ts 파일에서는 import가 되지 않는가. js만 지원?
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const HTTP_PROVIDER = 'http://20.196.209.2:8545';
const WEBSOCKET_PROVIDER = 'ws://20.196.209.2:6174';
const CHAIN_ID = '31221';

//* Remote Node Provider
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
export const Web3Client = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(HTTP_PROVIDER)
);
// const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER));

// The minimum ABI required to get the ERC20 Token balance
const minABI: AbiItem | AbiItem[] = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];
// todo const CONTRACT_ABI: AbiItem | AbiItem[] = [];

const tokenAddress = '0x94B52272d82689d17785FF5956D099F56612Eba8';
const walletAddress = '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367';

export const SsfContract = new Web3Client.eth.Contract(minABI, tokenAddress);
