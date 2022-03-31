import { useEffect } from 'react';
import { check, getSSFBalance } from 'services/blockchain/SsfApi';
import { createDoughnut, getMetadata, getTotalNFTCount, getUserNFTList, nftTest } from './blockchain/NftApi';

//! DELETE AFTER USE
export default function Web3Test() {
  // async function foo() {
  //   console.log(Web3Client.eth)
  //   const accounts = Web3Client.eth.requestAccounts().then(console.log).catch(console.log);
  //   console.log(accounts)
  // }
  useEffect(() => {
    // getSSFBalance('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // withdraw();
    // check();

    nftTest('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // getUserNFTList('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    // createDoughnut();
    //? (성공)
    // getMetadata(1000001);
    //? 없는 토큰 아이디일 경우 
    // getMetadata(1234);

    //? (성공)
    // getUserNFTList('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');

    //? (성공)
    // getTotalNFTCount();

  }, []);

  return <></>
}
