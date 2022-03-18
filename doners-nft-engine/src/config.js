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
    growEditionSizeTo: 20,
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
  // TODO 크기 1600으로 키우자
  width: 400,
  height: 400,
  smoothing: false,
};

// Step 3. add the metadata field
// (if you have extra metadatas to include to the NFTs, edit here)
const extraMetadata = {
  //! ex. (우리가 쓸 것) configure layers to create several different types
  // (see 'HashLips NFT youtube channel' for detail...)
  // TODO
  category: "none",
  external_url: "https://codecats.xyz", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info
// ** REQUIRED **
const AUTH = "YOUR API KEY HERE";
const LIMIT = 2; // Your API key rate limit
const CONTRACT_NAME = 'CRYPTOPUNKS';
const CONTRACT_SYMBOL = 'CP';
const CONTRACT_TYPE = 'erc721';
const MINT_TO_ADDRESS = 'YOUR WALLET ADDRESS HERE';
const CHAIN = 'rinkeby';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0xd8B808A887326F45B2D0cd999709Aa6264CeF919"; // Address that will receive the royalty
// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it
// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = false; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = "Unknown"; // Replace with what you want the generic titles to say.
const GENERIC_DESCRIPTION = "Unknown"; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = [
  "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh",
]; // Replace with your generic image(s). If multiple, separate with a comma.
const REVEAL_PROMPT = true; // Set to false if you want to disable the prompt to confirm each reveal.
const INTERVAL = 900000; // Milliseconds. This is the interval for it to check for sales and reveal the NFT. 900000 = 15 minutes.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
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
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
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
