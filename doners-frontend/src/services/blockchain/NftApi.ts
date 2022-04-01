/**
 * 필요한 기능
 * [NFT(DD)]
 * [x] setApprovalForAll: 회원가입과 동시에 한번만 호출해주면 됨. (필요없는 과정일수도? *테스트 필요*)
 * [x] metadata 호출해서 조회
 * [x] minting (각 카테고리 별)
 * [x] 전체 NFT 개수 (전체 | 코로나 | 미혼모 | 참전용사 | 희귀병환자)
 * [x] 해당 account에서 보유하고 있는 NFT tokenId의 리스트
 * [x] 해당 account에서 보유하고 있는 NFT metadata의 리스트
 * [x] isMembership (커뮤니티 입장 권한 확인용)
 * [x] 총 발급된 NFT 개수 (관리자 페이지)
 * - (burn)
 * - (transaction stages (DD))
 * [Doation(SSF)]
 * - dontating 모금 기능
 * - 현재 ETH 시세
 * - 지갑 balance
 * - 오늘 거래된 SSF 총향
 * - transaction stages (SSF)
 */

import { DDHelperContract, Web3Client } from 'services/web3';
//! metadata.json import 받아와서 loop 돌림
// (https://nodejs.dev/learn/reading-files-with-nodejs)
import { Metadata } from 'assets/metadata/_ipfsMetadatas';

// enum NftEditions {
//   'covid' = 1,
//   'single' = 2,
//   'warrior' = 3,
//   'patient' = 4,
// }

// TODO DELETE AFTER USE
export const nftTest = async (walletAddress: string) => {
  //! mm setAppovalForAll 해야 ERC721 거래가능? 필요한가?
  // setApprovalForAll(walletAddress);
  // console.log('보유 NFT 목록: ', result);
};

// ==================================================================

/* contract 권한 부여 */
//! (mm에올라온 내용) setAppovalForAll 해야 ERC721 거래가능? 필요한가?
export const setApprovalForAll = async (walletAddress: string) => {
  DDHelperContract.methods
    .setApprovalForAll(walletAddress, true)
    .call()
    .then(console.log);
};

/* 각 카테고리 별 minting */
export const mint = async (edition: string, walletAddress: string) => {
  let result;
  switch (edition) {
    case 'covid':
      result = await DDHelperContract.methods
        .mintCovidToken(walletAddress)
        .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' });
      console.log(result);
      break;
    case 'single':
      result = await DDHelperContract.methods
        .mintSingleToken(walletAddress)
        .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' });
      console.log(result);
      break;
    case 'warrior':
      result = await DDHelperContract.methods
        .mintWarriorToken(walletAddress)
        .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' });
      console.log(result);
      break;
    case 'patient':
      result = await DDHelperContract.methods
        .mintPatientToken(walletAddress)
        .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' });
      console.log(result);
      break;
  }
  return result;
};

/* Metadata 가져오기 */
// 그냥 uri 반환받아와서  web3에서 직접 호출. 컨트랙트에서 가져와주지 않음 (비용이 비싸질수도 있기 때문에)
export const getMetadata = async (tokenId: number) => {
  // 위와 동일
  var metadataURI = await DDHelperContract.methods
    .getMetadataUri(tokenId)
    .call();

  metadataURI = metadataURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
  console.log(metadataURI);

  // 위의 url에서 JSON가져오기
  // (https://stackoverflow.com/a/55784549)
  var metadata: any = await (await fetch(metadataURI)).json();
  console.log(metadata);

  return metadata;
};

/* 커뮤니티 접근 권한 검사 */
export const isMembership = async (walletAddress: string) => {
  const result = await DDHelperContract.methods
    .isMembership(walletAddress)
    .call();
  console.log('도너스 커뮤니티 멤버: ', result);
  return result;
};

/* 사용자 보유 NFT(DD) tokenId 리스트 */
// (https://ethereum.stackexchange.com/a/98495)
export const getUserNFTIdList = async (walletAddress: string) => {
  //? 성공
  const result = await DDHelperContract.methods
    .getTokensByOwner(walletAddress)
    .call();

  //! (실패, 위에 성공)
  // const result = await DDHelperContract.methods
  //   .userOwnedTokens()
  //   .call(walletAddress, { from: walletAddress })
  //   .then((balance: any) => {
  //     console.log(balance.toNumber());
  //   })
  //   .catch(console.log);
  console.log('보유 NFT 목록: ', result);
  return result;
};

/* 사용자 보유 NFT(DD) metadata 리스트 (마이페이지 조회용) */
// (https://ethereum.stackexchange.com/a/98495)
export const getUserNFTMetadataList = async (walletAddress: string) => {
  //? 성공
  let result = await DDHelperContract.methods
    .getTokenMetadatasByOwner(walletAddress)
    .call();

  // fetch()로 호출할 수 있게 uri 형태 변경
  result = result.map((uri: string, idx: number) =>
    uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
  );

  console.log('보유 NFT의 Metadata 목록: ', result);
  return result;
};

/* 총 발행된 NFT(DD) 개수 (관리자페이지용) */
export const getTotalNFTCount = async () => {
  const result = await DDHelperContract.methods.getTotalCnt().call();
  console.log('총 발행된 NFT 개수: ', result);
  return result;
};

/* 맨 초기에 DD Token creation (한번만 실행하면 된다) */
// export const createDoughnut = async (metadata: Array<string>) => {
export const createDoughnut = async () => {
  console.log('CREATING DD TOKENS...');

  /* All 4 EDITIONs */
  for (let idx in Metadata) {
    DDHelperContract.methods
      .createDoughnut(
        Metadata[idx].custom_fields.tokenId,
        Metadata[idx].metadata_uri
      )
      .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' })
      .then(console.log)
      .catch(console.log);
  }
};

/* 총 잔여 NFT 발급량 조회 */
export const getMintedNFTCount = async () => {
  const result = await DDHelperContract.methods.getMintedTokenCount().call();
  return result;
};
