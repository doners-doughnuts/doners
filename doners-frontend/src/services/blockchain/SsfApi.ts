import { SSFContract, FundraiserContract, Web3Client } from 'services/web3';

/**
 * 필요한 기능
 * [Doation(SSF)]
 * - 현재 ETH 시세
 * - 지갑 balance
 * - 오늘 거래된 SSF 총향
 * - transaction stages (SSF)
 * - 기부금 수령하기
 * -
 */

/* Wallet balance 조회 */
export const getSSFBalance = async (walletAddress: string) => {
  const balance = await Web3Client.eth.getBalance(walletAddress);
  console.log(balance, 'SSF');
  // TIL: (위 2줄과 동일함, 그냥 값 찍어보는 용도라면 await 안 걸고 then()에서 찍어봐도 됨)
  //// Web3Client.eth.getBalance(walletAddress).then(console.log);
  // const result = await SsfContract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  // const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
};

/* 기부금 수령하기 */
// export const withdraw = async () => {
//   SsfContract.methods.withdraw().call().then(console.log);
// };

// /* 기부 모금하기 */
// export const donate = () => {
//   SsfContract.methods.donate().call().then(console.log);
// };

let name = '신지우';
let url =
  'https://www.fnnews.com/resource/media/image/2022/02/04/202202041545370304_l.jpg';
let imageURL =
  'https://www.fnnews.com/resource/media/image/2022/02/04/202202041545370304_l.jpg';
let description = 'test description 입니다람쥐';
let beneficiary = '0x80585b94098034488F58ede15BFa106EF229d6Ea';

export const check = async () => {
  // await Web3Client.eth.requestAccounts().then(console.log).catch(console.log);
  // SsfContract.methods
  //   .createFundraiser(name, url, imageURL, description, beneficiary)
  //   .send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' })
  //   .then(console.log)
  //   .catch(console.log);

  const kk = await SSFContract.methods
    .balanceOf('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367')
    .call();
  // const kkk = await FundraiserContract(
  //   '0xFacc3F3032642F08F239F8f2e1f0Cf70c855933b'
  // )
  //   .methods.name()
  //   .call();
  // ;fundraisers(10, 0).call();

  // const kkk = await SsfContract.methods.fundraisersCount().call();
  // .then(console.log)
  // .catch(console.log);
  console.log('TOTAL:   ', kk);
};
