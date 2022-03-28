import { SsfContract, Web3Client } from 'services/web3';
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
export const withdraw = async () => {
  SsfContract.methods.withdraw().call().then(console.log);
};
