/**
 * 필요한 기능
 * [NFT(DD)]
 * - metadata 호출해서 조회
 * - minting (각 카테고리 별)
 * - 전체 NFT 리스트 및 개수 (전체 | 코로나 | 미혼모 | 참전용사 | 희귀병환자)
 * - 해당 account에서 보유하고 있는 NFT들의 리스트
 * - isOwner (커뮤니티 입장 권한 확인용)
 * - dontating 모금 기능
 * - burn
 * - transaction stages (DD)
 * [Doation(SSF)]
 * - 현재 ETH 시세
 * - 지갑 balance
 * - 오늘 거래된 SSF 총향
 * - transaction stages (SSF)
 */

import chalk from 'chalk';
import { DDHelperContract } from 'services/web3';
import { MakeMinty } from './NftApiMintyTemp';
//! metadata.json import 받아와서 loop 돌림
// (https://nodejs.dev/learn/reading-files-with-nodejs)
import fs from 'fs';
import { Metadata } from 'assets/metadata/_ipfsMetadatas';
const basePath = process.cwd();

type NftApiProps = {};

enum NftEditions {
  covid = 1,
  single = 2,
  warrior = 3,
  patient = 4,
}

export const nftTest = async (walletAddress: string) => {
  // const result = await DDHelperContract.methods
  //   .getTokensByOwner(walletAddress)
  //   .call();

  // const result = await getUserNFTList(walletAddress);
  const result = await DDHelperContract.methods.getTotalCnt().call();
  console.log('보유 NFT 목록: ', result);
};

export const getMetadata = async (edition: NftEditions, tokenId: number) => {
  let metadata, metadataURI;

  // switch (edition) {
  //   case 1:
  //     // (await DonersDoughnutsCovid()).methods.foo().call();
  //     metadataURI = await DDHelperContract.methods.tokenURI(tokenId).call();
  //     metadata = JSON.parse(await getIPFSJson(metadataURI));
  //     break;
  //   case 2:
  //     break;
  //   case 3:
  //     break;
  //   case 4:
  //     break;
  // }

  return { metadata, metadataURI };
};

// //https://github.com/yusefnapora/minty/blob/master/src/index.js
// export async function getNFT(
//   tokenId: string,
//   options: { creationInfo: { creatorAddress: string } }
// ) {
//   const { creationInfo: fetchCreationInfo } = options;
//   const minty = await MakeMinty();
//   const nft = await minty.getNFT(tokenId, { fetchCreationInfo });

//   const output = [
//     ['Token ID:', chalk.green(nft.tokenId)],
//     ['Owner Address:', chalk.yellow(nft.ownerAddress)],
//   ];
//   if (nft.creationInfo) {
//     output.push([
//       'Creator Address:',
//       chalk.yellow(nft.creationInfo.creatorAddress),
//     ]);
//     output.push(['Block Number:', nft.creationInfo.blockNumber]);
//   }
//   output.push(['Metadata Address:', chalk.blue(nft.metadataURI)]);
//   output.push(['Metadata Gateway URL:', chalk.blue(nft.metadataGatewayURL)]);
//   output.push(['Asset Address:', chalk.blue(nft.assetURI)]);
//   output.push(['Asset Gateway URL:', chalk.blue(nft.assetGatewayURL)]);
//   // alignOutput(output);
//   //
//   // function alignOutput(labelValuePairs) {
//   //   const maxLabelLength = labelValuePairs
//   //     .map(([l, _]) => l.length)
//   //     .reduce((len, max) => (len > max ? len : max));
//   //   for (const [label, value] of labelValuePairs) {
//   //     console.log(label.padEnd(maxLabelLength + 1), value);
//   //   }
//   // }

//   console.log('NFT Metadata:');
//   console.log(JSON.stringify(nft.metadata));
// }

// export async function transferNFT(tokenId: string, toAddress: string) {
//   const minty = await MakeMinty();

//   await minty.transferToken(tokenId, toAddress);
//   console.log(
//     `🌿 Transferred token ${chalk.green(tokenId)} to ${chalk.yellow(toAddress)}`
//   );
// }

// export async function pinNFTData(tokenId: string) {
//   const minty = await MakeMinty();
//   const { assetURI, metadataURI } = await minty.pinTokenData(tokenId);
//   console.log(`🌿 Pinned all data for token id ${chalk.green(tokenId)}`);
// }

// // TODO 파일 옮기기
// export const getSSFBalance = async () => {};

// // metatdata 조회
// 그냥 uri 반환받아와서  web3에서 직접 호출. 컨트랙트에서 가져와주지 않음 (비용이 비싸질수도 있기 때문에)

/* 커뮤니티 접근 권한 검사 */
export const isMembership = async (walletAddress: string) => {
  const result = await DDHelperContract.methods
    .isMembership(walletAddress)
    .call();
  console.log('도너스 커뮤니티 멤버: ', result);
};

/* 사용자 보유 NFT(DD) 리스트 */
// (https://ethereum.stackexchange.com/a/98495)
export const getUserNFTList = async (walletAddress: string) => {
  const result = await DDHelperContract.methods.userOwnedTokens.call(
    walletAddress,
    function (err: any, res: any) {
      console.log(res);
    }
  );
  console.log('보유 NFT 목록: ', result);
};

// export const createDoughnut = async (metadata: Array<string>) => {
export const createDoughnut = async () => {
  console.log('CREATING DD TOKENS...');

  /* 'Covid' EDITION */

  for (let idx in Metadata) {
    DDHelperContract.methods
      .mint(Metadata[idx].metadata_uri)
      .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' })
      .then(console.log)
      .catch(console.log);
  }
  // fs.readFile(
  //   `${basePath}/web3/_ipfsMetadatas.json`,
  //   'utf8',
  //   (err: string, data: string) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     const metadata = JSON.parse(data);
  //     /* Generate NFT with the metadata */
  //     // parse data and RPC call for each token.
  //     // console.log(metadata[idx])
  //     // console.log(typeof metadata[idx].custom_fields.tokenId);
  //     // const result =
  //     // DDHelperContract.methods.createDoughnut(metadata[idx].custom_fields.tokenId, metadata[idx].metadata_uri).call().then(console.log);
  //     // createDoughnut(metadata); //, metadata[idx].custom_fields.tokenId, metadata[idx].metadata_uri);
  //     // for (idx in metadata) {
  //     // DDHelperContract.methods.createDoughnut(parseInt(metadata[idx].custom_fields.tokenId), metadata[idx].metadata_uri).call().then(console.log);

  //     // }
  //     // console.log(result)
  //     // }
  //   }
  // );
  // DDHelperContract.methods.getMetadataUri(1000001).call().then(console.log).catch(console.log);
};

// const createDoughnut = async (metadata) => {
//   // for (idx in metadata) {
//   // DDHelperContract.methods.createDoughnut(parseInt(metadata[idx].custom_fields.tokenId), metadata[idx].metadata_uri).call().then(console.log);
//   DDHelperContract.methods
//     .mint(metadata[0].metadata_uri)
//     .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' })
//     .then(console.log)
//     .catch(console.log);
//   // }
//   // DDHelperContract.methods.createDoughnut(tokenId, metadataUri).call().then(console.log).catch(console.log);
// };
