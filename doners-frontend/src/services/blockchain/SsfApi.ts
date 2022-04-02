import {
  SSFContract,
  FundraiserContract,
  FundraiserFactoryContract,
  Web3Client,
} from 'services/web3';

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

/* Wallet ETH balance 조회 */
export const getETHBalance = async (walletAddress: string) => {
  const balance = await Web3Client.eth.getBalance(walletAddress);
  console.log(balance, 'ETH');
  // TIL: (위 2줄과 동일함, 그냥 값 찍어보는 용도라면 await 안 걸고 then()에서 찍어봐도 됨)
  //// Web3Client.eth.getBalance(walletAddress).then(console.log);
  // const result = await SsfContract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  // const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
};

/* Wallet SSF(token) balance 조회 */
export const getSSFBalance = async (walletAddress: string) => {
  const balance = await SSFContract.methods.balanceOf(walletAddress).call();
  console.log(balance, 'SSF');
};

/* 기부금 수령하기 */
// export const withdraw = async () => {
//   SsfContract.methods.withdraw().call().then(console.log);
// };
/* 기부금 만들기 */
// fundRaisingCloses -> 마감일자 초단위로 변환!!
export const createFundraiser = async (
  factoryAddress: string,
  walletAddress: string,
  title: string,
  url: string,
  imageURL: string,
  description: string,
  donationsGoal: number,
  fundRaisingCloses: number,
  beneficiary: string
) => {
  await FundraiserFactoryContract(factoryAddress)
    .methods.createFundraiser(
      title,
      url,
      imageURL,
      description,
      donationsGoal,
      fundRaisingCloses,
      beneficiary
    )
    .send({ from: walletAddress });
  let AddressCount = await FundraiserFactoryContract(factoryAddress)
    .methods.fundraisersCount()
    .call();
  let fundraisers = await FundraiserFactoryContract(factoryAddress)
    .methods.getFundraisers()
    .call();
  let createFundraiserAddress = fundraisers[AddressCount - 1]; // 생성된 Fundraiser Contract 주소
};

// /* 기부 컨트랙트 배열 */
export const getFundraiserFactoryArray = async (factoryAddress: string) => {
  await FundraiserFactoryContract(factoryAddress)
    .methods.getFundraisers()
    .call();
};

// /* 기부 모금하기 */
export const donate = async (
  fundraiserAddress: string,
  walletAddress: string,
  donateAmount: number
) => {
  //  contract에 송금 및 인출 가능하게 ssafycontract를 approve하는코드
  await SSFContract.methods
    .approve(fundraiserAddress, donateAmount)
    .send({ from: walletAddress });

  // 기부하는 코드
  await FundraiserContract(fundraiserAddress)
    .methods.donate(donateAmount)
    .send({ from: walletAddress });
};

// /* 기부 수령하기 */
export const withdraw = async (
  fundraiserAddress: string,
  walletAddress: string
) => {
  // 인출코드
  await FundraiserContract(fundraiserAddress)
    .methods.withdraw()
    .send({ from: walletAddress });
};
// /* 현재 기부금 */
export const now = async (fundraiserAddress: string) => {
  await SSFContract.methods.balanceOf(fundraiserAddress).call();
};

// /* 현재 컨트랙트 기부한 내역 */
export const nowFundraiserData = async (fundraiserAddress: string) => {
  await FundraiserContract(fundraiserAddress).methods.getDonations().call();
};

// TOTO delete (test code)

// let title = '정홍진에게 기부하시오2';
// let url =
//   'https://www.fnnews.com/resource/media/image/2022/02/04/202202041545370304_l.jpg';
// let imageURL =
//   'https://www.fnnews.com/resource/media/image/2022/02/04/202202041545370304_l.jpg';
// let description = 'test description 입니다람쥐';
// let donationsGoal = '10000';
// let fundRaisingCloses = '51651651651651651651';
// let beneficiary = '0x079dae51ae588fBe92163F75C18F030812A4979A';

// TOTO delete (test code)
export const check = async () => {
  const account = await Web3Client.eth.requestAccounts();

  // await FundraiserFactoryContract('0xBb3EACd17DbAcbd0E18B9677498A13E310333786')
  //   .methods.createFundraiser(
  //     title,
  //     url,
  //     imageURL,
  //     description,
  //     donationsGoal,
  //     fundRaisingCloses,
  //     beneficiary
  //   )
  //   .send({ from: account[0] });
  // let tmp = await FundraiserFactoryContract(
  //   '0xBb3EACd17DbAcbd0E18B9677498A13E310333786'
  // )
  //   .methods.fundraisersCount()
  //   .call();
  // console.log(
  //   await FundraiserFactoryContract(
  //     '0xBb3EACd17DbAcbd0E18B9677498A13E310333786'
  //   )
  //     .methods.getFundraisers()
  //     .call()
  // );

  // console.log(fundraisers[tmp - 1]);
  // console.log(createFundraiser);
  // console.log(
  // await FundraiserFactoryContract(
  //   '0xD67cCf7c2c3eEb4a0DA91609411f34E0805F8566'
  // )
  //   .methods.getFundraisers()
  //   .call()
  // );
  //  contract에 송금 및 인출 가능하게 ssafycontract를 approve하는코드
  // await SSFContract.methods
  //   .approve('0x423D328409502228628d0cb2f5271b2729421b9F', 5)
  //   .send({ from: account[0] });

  // // 기부하는 코드
  // await FundraiserContract('0x423D328409502228628d0cb2f5271b2729421b9F')
  //   .methods.donate(5)
  //   .send({ from: account[0] });

  // console.log(
  //   await SSFContract.methods
  //     .balanceOf('0x423D328409502228628d0cb2f5271b2729421b9F')
  //     .call()
  // );

  // console.log(
  //   await FundraiserContract('0x423D328409502228628d0cb2f5271b2729421b9F')
  //     .methods.getDonations()
  //     .call()
  // );

  // await FundraiserContract('0x423D328409502228628d0cb2f5271b2729421b9F')
  //   .methods.withdraw()
  //   .send({ from: account[0] });

  // const test = await SSFContract.methods.transfer(account[0], 10).send({
  //   from: '0x0Bba35cf70aD080f8594B58006Bc18bf2c6B1DE6',
  //   gas: 367760,
  // });
};
