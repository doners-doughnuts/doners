// ? 왜 .ts 파일에서는 import가 되지 않는가. js만 지원?
import Web3 from 'web3';

// const web3 = new Web3('ws://localhost:8546');

const HTTP_PROVIDER = 'http://20.196.209.2:8545';
const PROVIDER = 'ws://20.196.209.2:6174';

//* Remote Node Provider
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
const Web3Client = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(PROVIDER)
);

// TODO 따로 환경변수 파일에 정의 (4종류)
const COVID_CONTRACT_ADDRESS = '0x94B52272d82689d17785FF5956D099F56612Eba8';

// todo
const CONTRACT_ABI = '';

/* Config for 'covid' NFT editions  */
export const DonersDoughnutsCovid = () => {
  // return new Web3.eth.Contract(abi, COVID_CONTRACT_ADDRESS);
};

/* Config for 'single' NFT editions  */
export const DonersDoughnutsSingle = () => {
  // return new Web3.eth.Contract(abi, COVID_CONTRACT_ADDRESS);
};

/* Config for 'warrior' NFT editions  */
export const DonersDoughnutsWarrior = () => {
  // return new Web3.eth.Contract(abi, COVID_CONTRACT_ADDRESS);
};

/* Config for 'patient' NFT editions  */
export const DonersDoughnutsPatient = () => {
  // return new Web3.eth.Contract(abi, COVID_CONTRACT_ADDRESS);
};

/* Root Contract */
export const DonersNFT = () => {
  // return new Web.eth.Contract(abi, COVID_CONTRACT_ADDRESS)
};

// The minimum ABI required to get the ERC20 Token balance
// const minABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function",
//   },
// ];
// const tokenAddress = "0x94B52272d82689d17785FF5956D099F56612Eba8";
// const walletAddress = "0xb72207EB8c21c7698d493Da3bB273F6C8a76E367";

// const contract = new Web3Client.eth.Contract(minABI, tokenAddress);

// export const getBalance = async () => {
//   const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659

//   const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659

//   console.log(format);
// }

// // getBalance();
