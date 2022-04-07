// ? [해결] 왜 .ts 파일에서는 import가 되지 않는가. js만 지원?
import { DdHelperABI } from 'assets/abi/DdHelperABI';
import { FundraiserABI } from 'assets/abi/FundraiserABI';
import { FundraiserFactoryABI } from 'assets/abi/FundraiserFactoryABI';
import { SsfABI } from 'assets/abi/SsfABI';
import Web3 from 'web3';

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

//* NFT Contracts: Doners Doughnuts (DD)
/* Contract instance for NFT editions  */
// export const DDOwnershipContract = new Web3Client.eth.Contract(
//   DdOwnershipABI,
//   process.env.REACT_APP_DD_OWNERSHP_CONTRACT_ADDRESS
// );

export const DDHelperContract = new Web3Client.eth.Contract(
  DdHelperABI,
  process.env.REACT_APP_DD_HELPER_CONTRACT_ADDRESS
);
