import { useEffect } from 'react';
import { check, getSSFBalance } from 'services/blockchain/SsfApi';

//! DELETE AFTER USE
export default function Web3Test() {
  // async function foo() {
  //   console.log(Web3Client.eth)
  //   const accounts = Web3Client.eth.requestAccounts().then(console.log).catch(console.log);
  //   console.log(accounts)
  // }
  useEffect(() => {
    getSSFBalance('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // withdraw();
    check();


  }, []);

  return <></>
}
