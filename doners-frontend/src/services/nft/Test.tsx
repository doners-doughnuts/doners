import { useEffect } from 'react';
import { getBalance } from 'services/blockchain/SsfApi';

export default function Test() {
  // async function foo() {
  //   console.log(Web3Client.eth)
  //   const accounts = Web3Client.eth.requestAccounts().then(console.log).catch(console.log);
  //   console.log(accounts)
  // }
  useEffect(() => { getBalance('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367') }, []);

  return <></>
}
