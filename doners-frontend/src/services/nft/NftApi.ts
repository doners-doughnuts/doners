// import Web3 from 'web3';
import {
  DonersDoughnutsCovid,
  DonersDoughnutsPatient,
  DonersDoughnutsSingle,
  DonersDoughnutsWarrior,
} from './config';

// for each NFT edition
// DonersDoughnutsCovid.methods.call();
// DonersDoughnutsSingle.methods.call();
// DonersDoughnutsWarrior.methods.call();
// DonersDoughnutsPatient.methods.call();

// root Doners NFT Contract

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

type NftApiProps = {};

enum NftEditions {
  covid = 1,
  single = 2,
  warrior = 3,
  patient = 4,
}

export const getMetadata = async (edition: NftEditions) => {
  switch (edition) {
    case 1:
      (await DonersDoughnutsCovid()).methods.foo().call();
      break;
  }
};

// TODO 파일 옮기기
export const getSSFBalance = async () => {};
