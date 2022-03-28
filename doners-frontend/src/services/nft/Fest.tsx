import { useEffect } from 'react';
import Web3 from 'web3';

const HTTP_PROVIDER = "http://20.196.209.2:8545";
const WEBSOCKET_PROVIDER = "ws://20.196.209.2:6174";
const CHAIN_ID = "31221";

const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(HTTP_PROVIDER));
// const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER));

export default function Fest() {
  async function foo() {
    console.log(Web3Client.eth)
    const accounts = Web3Client.eth.requestAccounts().then(console.log).catch(console.log);
    console.log(accounts)
  }
  useEffect(() => { foo() }, []);

  return <></>
}
