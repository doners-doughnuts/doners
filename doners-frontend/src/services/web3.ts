// ? [해결] 왜 .ts 파일에서는 import가 되지 않는가. js만 지원?
import { DdABI } from 'assets/abi/DdABI';
import { FundraiserABI } from 'assets/abi/FundraiserABI';
import { FundraiserFactoryABI } from 'assets/abi/FundraiserFactoryABI';
import { SsfABI } from 'assets/abi/SsfABI';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

//* Remote Node Provider
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
export const Web3Client = new Web3(
  Web3.givenProvider ||
    new Web3.providers.HttpProvider(process.env.REACT_APP_HTTP_PROVIDER!)
);
// web-socket
//// const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER));

//* SSF ERC20 Contracts
export const SSFContract = new Web3Client.eth.Contract(
  SsfABI,
  process.env.REACT_APP_SSF_CONTRACT_ADDRESS
);

//* Donation Contracts
export const FundraiserContract = (contractAddress: string) => {
  return new Web3Client.eth.Contract(FundraiserABI, contractAddress);
};
export const FundraiserFactoryContract = (contractAddress: string) => {
  return new Web3Client.eth.Contract(FundraiserFactoryABI, contractAddress);
};

//* NFT Contracts: Doners Doughnuts
export const DDContract = () => {
  return new Web3Client.eth.Contract(
    DdABI,
    process.env.REACT_APP_DD_CONTRACT_ADDRESS
  );
};

/* Contract instance for 'covid' NFT editions  */
export const DDCovidContract = new Web3Client.eth.Contract(
  SsABI,
  process.env.REACT_APP_DONERS_COVID_CONTRACT_ADDRESS
);

/* Contract instance for 'single' NFT editions  */
export const DDSingleContract = new Web3Client.eth.Contract(
  SsABI,
  process.env.REACT_APP_DONERS_SINGLE_CONTRACT_ADDRESS
);

/* Contract instance for 'warrior' NFT editions  */
export const DDWarriorContract = new Web3Client.eth.Contract(
  SsfAI,
  process.env.REACT_APP_DONERS_WARRIOR_CONTRACT_ADDRESS
);

/* Contract instance for 'patient' NFT editions  */
export const DDPatientContract = new Web3Client.eth.Contract(
  SsfAI,
  process.env.REACT_APP_DONERS_PATIENT_CONTRACT_ADDRESS
);
