import { useEffect } from 'react';
import { check, getSSFBalance } from 'services/blockchain/SsfApi';
import { createDoughnut, getMetadata, getMintedNFTCount, getTotalNFTCount, getUserNFTIdList, getUserNFTMetadataList, mint, nftTest, setApprovalForAll } from './blockchain/NftApi';

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

    // setApprovalForAll('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');

    // nftTest('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // getUserNFTList('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    // createDoughnut();
    //? (성공)
    // getMetadata(1000001);
    //? 없는 토큰 아이디일 경우 
    // getMetadata(1234);
    //? metadata가 없이 들어가버린 토큰
    // getMetadata(2000001);

    //? (성공)
    // getUserNFTIdList('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
    // getUserNFTMetadataList('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')

    //? (성공)
    // getTotalNFTCount();

    //? (4가지 모두 성공)
    // mint("covid", '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    //! 'payable'이 없어도 되는 것을 확인함. 이게 문제가 아니라 setApprovalForAll()이 해결책이었던듯.
    // mint("single", '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    // mint("warrior", '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    // mint("patient", '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')

    //? 성공
    // getMintedNFTCount();

  }, []);

  return <></>
}
