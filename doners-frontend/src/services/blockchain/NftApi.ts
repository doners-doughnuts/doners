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

type NftApiProps = {};

enum NftEditions {
  covid = 1,
  single = 2,
  warrior = 3,
  patient = 4,
}

export const nftTest = async () => {
  const result = await DDHelperContract.methods
    .isMembership('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    .call();
  console.log('NFT testing: ', result);
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
