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
  return balance;
};

/* 기부금 만들기 */
// fundRaisingCloses -> 초단위로 변환!!
export const createFundraiser = async (
  factoryAddress: string, // 팩토리 컨트랙트 주소
  walletAddress: string, // 현재 지갑주소
  title: string, // 글 제목
  id: string, // 글 url
  imageURL: string, // 썸네일 image url
  description: string, // 글 내용
  donationsGoal: number, // 모금 목표 금액
  fundRaisingCloses: number, // 마감기한
  beneficiary: string // 수혜자(수령자) 주소
) => {
  await FundraiserFactoryContract(factoryAddress)
    .methods.createFundraiser(
      title,
      id,
      imageURL,
      description,
      donationsGoal,
      fundRaisingCloses,
      beneficiary
    )
    .send({ from: walletAddress });

  const AddressCount = await FundraiserFactoryContract(factoryAddress)
    .methods.fundraisersCount()
    .call();

  const fundraisers = await FundraiserFactoryContract(factoryAddress)
    .methods.getFundraisers()
    .call();

  const createFundraiserAddress = fundraisers[AddressCount - 1]; // 생성된 Fundraiser Contract 주소
  return createFundraiserAddress;
};

// /* 기부 컨트랙트 배열 */
export const getFundraiserFactoryArray = async (factoryAddress: string) => {
  const Fundraisers = await FundraiserFactoryContract(factoryAddress)
    .methods.getFundraisers()
    .call();
  return Fundraisers;
};

// /* 기부 모금하기 */
// export const donate = async (
//   fundraiserAddress: string,
//   walletAddress: string,
//   donateAmount: number
// ) => {
//   //  contract에 송금 및 인출 가능하게 ssafycontract를 approve하는코드
//   const result = await SSFContract.methods
//     .approve(fundraiserAddress, donateAmount)
//     .send({ from: walletAddress });

//   console.log(result);

//   // 기부하는 코드
//   await FundraiserContract(fundraiserAddress)
//     .methods.donate(donateAmount)
//     .send({ from: walletAddress });
// };

export const approveTransaction = async (
  fundraiserAddress: string,
  walletAddress: string,
  donateAmount: number
) => {
  const result = await SSFContract.methods
    .approve(fundraiserAddress, donateAmount)
    .send({ from: walletAddress });

  return result;
};

export const donate = async (
  fundraiserAddress: string,
  walletAddress: string,
  donateAmount: number
) => {
  const result = await FundraiserContract(fundraiserAddress)
    .methods.donate(donateAmount)
    .send({ from: walletAddress });

  return result;
};

// /* 기부 수령하기 */
export const withdraw = async (
  fundraiserAddress: string,
  walletAddress: string
) => {
  // 인출코드
  const response = await FundraiserContract(fundraiserAddress)
    .methods.withdraw()
    .send({ from: walletAddress });

  console.log(response);
  return response;
};
// /* 현재 기부금 */
export const nowBalance = async (fundraiserAddress: string) => {
  const nowFundraiserBalance = await SSFContract.methods
    .balanceOf(fundraiserAddress)
    .call();
  return nowFundraiserBalance;
};

// /* 현재 컨트랙트 기부한 내역 */
export const nowFundraiserData = async (fundraiserAddress: string) => {
  const nowData = await FundraiserContract(fundraiserAddress)
    .methods.getDonations()
    .call();
  return nowData;
};

// /* 지정된 컨트랙트 내가 기부한 내역 */
export const nowFundraiserMyDonationData = async (
  fundraiserAddress: string,
  walletAddress: string
) => {
  const nowMyDonationData = await FundraiserContract(fundraiserAddress)
    .methods.myDonations(walletAddress)
    .call();
  return nowMyDonationData;
};

// /* 지정된 컨트랙트 수령한 내역 */
export const nowFundraiserWithdraw = async (fundraiserAddress: string) => {
  return await FundraiserContract(fundraiserAddress)
    .methods.withdrawData()
    .call();
};

// /* 모든 컨트랙트 기부한 내역 */
export const allFundraiserData = async (fundraiserFactoryAddress: string) => {
  const fundraisers = await FundraiserFactoryContract(fundraiserFactoryAddress)
    .methods.getFundraisers()
    .call();
  const allFundData = []; // 각 컨트랙트별 모든 기부내역

  for (let i = 0; i < fundraisers.length; i++) {
    let fund = fundraisers[i]; // 각 컨트랙트별 컨트랙트 어드레스
    let FundraiserData = await nowFundraiserData(fund); // 컨트랙트별 기부내역
    for (let j = 0; j < FundraiserData.length; j++) {
      allFundData.push(FundraiserData[j]);
    }
  }
  return allFundData;
};

// /* 모든 컨트랙트 내가 참여한 기부한 내역 */
export const allFundraiserMyDonationData = async (
  // fundraiserFactoryAddress: string,
  walletAddress: string
) => {
  const fundraisers = await FundraiserFactoryContract(
    process.env.REACT_APP_DONATIONFACTORY_CONTRACT_ADDRESS!
  )
    .methods.getFundraisers()
    .call();
  const allFundData = []; // 각 컨트랙트별 모든 나의 기부내역

  for (let i = 0; i < fundraisers.length; i++) {
    let fund = fundraisers[i]; // 각 컨트랙트별 컨트랙트 어드레스
    let FundraiserData = await nowFundraiserMyDonationData(fund, walletAddress); // 컨트랙트별 나의 기부내역
    for (let j = 0; j < FundraiserData.length; j++) {
      allFundData.push(FundraiserData[j]);
    }
  }
  console.log(allFundData);
  return allFundData;
};

// /* 모든 컨트랙트 수령한 내역 */
export const allWithdrawData = async (fundraiserFactoryAddress: string) => {
  const fundraisers = await FundraiserFactoryContract(fundraiserFactoryAddress)
    .methods.getFundraisers()
    .call();
  const allWithraws = []; // 각 컨트랙트별 모든 수령내역

  for (let i = 0; i < fundraisers.length; i++) {
    let fund = fundraisers[i]; // 각 컨트랙트별 컨트랙트 어드레스
    let withdrawData = await nowFundraiserWithdraw(fund); // 컨트랙트별 수령내역
    allWithraws.push(withdrawData);
  }
  return allWithraws;
};

// /* 나의 모금 수령 내역 */
export const allWithdrawMyData = async (
  fundraiserFactoryAddress: string,
  walletAddress: string
) => {
  const fundraisers = await FundraiserFactoryContract(fundraiserFactoryAddress)
    .methods.getFundraisers()
    .call();
  const allWithraws = []; // 나의 모든 수령 내역

  for (let i = 0; i < fundraisers.length; i++) {
    let fund = fundraisers[i]; // 각 컨트랙트별 컨트랙트 어드레스
    let withdrawData = await nowFundraiserWithdraw(fund); // 컨트랙트별 수령내역
    if (withdrawData.account === walletAddress) {
      allWithraws.push(withdrawData);
    }
  }
  return allWithraws;
};

// /* Fundraiser 기부한 총원 */
export const nowFundraiserCount = async (fundraiserAddress: string) => {
  return await FundraiserContract(fundraiserAddress)
    .methods.donationsCount()
    .call();
};

// /* Fundraiser 수령 여부 */
export const fundraiserIsWithdraw = async (fundraiserAddress: string) => {
  return await FundraiserContract(fundraiserAddress)
    .methods.isWithdraw()
    .call();
};

// TODO delete (test code)
export const check = async () => {
  const account = await Web3Client.eth.requestAccounts();
};
