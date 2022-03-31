const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

//! MAJOR updates from v.1
// this is the only code that we have to edit now. (in v.2 :)
/** This file contains the following info(i.e. Configurations!)...:
 * - condig details for our NFT layers
 * - contract details
 * - minting details
 */


// General metadata for Ethereum
const namePrefix = "Doners Doughnuts";
const description = "NFT collection for the 'Doners'";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    // 생성할 이미지의 총 개수 (테스트로 20개만 우선적으로 해봄)
    growTokenSizeTo: 20,
    // NFT 이미지의 layer. 순서에 유의: 위의 것이 가장 아래에 배치됨
    layersOrder: [
      { name: "Background" },
      { name: "Frosting" },
      { name: "Decoration" },
      { name: "Expression" },
      { name: "Edition" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

// Step 2. edit the format
// (this is the size of the resulting image in 'px'(pixels))
const format = {
  // 크기 400 -> 1000으로 키우자
  width: 1000,
  height: 1000,
  smoothing: false,
};

// Step 3. add the metadata field
// (if you have extra metadatas to include to the NFTs, edit here)
const extraMetadata = {
  // ex. (우리가 쓸 것) configure layers to create several different types
  // (see 'HashLips NFT youtube channel' for detail...)  by layer configurations (13'40" 참고)
  // (03.23) 여기가 아니라 main.js addMetadata() 함수 부분에 추가했음. 여기에 들어갈 수 있는 것들은 Hashlips에서 정의된 것들만 가능한 듯 했음.
  external_url: 'https://j6a404.p.ssafy.io', // Replace with your website or remove this line if you do not have one.
};

// [Notion 2.1] NFTPort Info
// ** REQUIRED **
const AUTH = '78f3720d-dce5-483d-8590-29089bfd508f'; // NFTport API key
const LIMIT = 2; // Your API key rate limit (amount of requests we can send every second. 우리는 free plan이라 최대가 2이다.)
const CONTRACT_NAME = 'Doners Doughnuts'; // must be same as the name prefix (line 17)
const CONTRACT_SYMBOL = 'DD'; // something like a 'stock symbol' (a shorter version for your contract name (윗 줄) => "D.oners D.ougnuts")
const CONTRACT_TYPE = 'erc721'; // NFTport supports ERC1155 too. (그냥 혹시나 해서 적어둠. ERC721 -> ERC1155 쓸지도..?)
const MINT_TO_ADDRESS = '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367'; //! our Metamask wallet account addresss!
const CHAIN = 'rinkeby'; //! the blockchain we want to deploy to. NFTport supports: rinkeby(testnet임), polygon(mainnet임)
const METADATA_UPDATABLE = true; // for NFT reveals: set to false if you don't want to allow metadata updates after minting
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367'; // Address that will receive the royalty
// ** OPTIONAL **
let CONTRACT_ADDRESS = 'YOUR CONTRACT ADDRESS'; // If you want to manually include it (OTHERWISE, we get this when we create our contract)
// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = false; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = 'Unknown'; // Replace with what you want the generic titles to say.
const GENERIC_DESCRIPTION = 'Unknown'; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = [
  'https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh',
]; // Replace with your generic image(s). If multiple, separate with a comma.
const REVEAL_PROMPT = false; // Set to false if you want to disable the prompt to confirm each reveal.
const INTERVAL = 900000; // Milliseconds. This is the interval for it to check for sales and reveal the NFT. 900000 = 15 minutes.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === 'OK' && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: 'YC',
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: 'https://www.youtube.com/c/hashlipsnft',
  creators: [
    {
      address: '7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC',
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: '#ffffff',
  size: 20,
  xGap: 40,
  yGap: 40,
  align: 'left',
  baseline: 'top',
  weight: 'regular',
  family: 'Courier',
  spacer: ' => ',
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: '80%',
  static: false,
  default: '#000000',
};

const rarityDelimiter = '#';

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: 'preview.png',
};

const preview_gif = {
  numberOfImages: 5,
  order: 'ASC', // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: 'preview.gif',
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  MINT_TO_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  INTERVAL,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  CONTRACT_TYPE,
  REVEAL_PROMPT,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
};
