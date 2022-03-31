//! metadata.json import 받아와서 loop 돌림
// (https://nodejs.dev/learn/reading-files-with-nodejs)
const fs = require("fs");
const basePath = process.cwd();
const DdHelperABI = JSON.parse(fs.readFileSync(`${basePath}/web3/DdHelperABI.json`));

const Web3 = require('web3');


const HTTP_PROVIDER = 'http://20.196.209.2:8545';


//* Remote Node Provider
// Using a remote node provider, like Alchemy (https://www.alchemyapi.io/supernode), is simple.
const Web3Client = new Web3(
  Web3.givenProvider ||
  new Web3.providers.HttpProvider(HTTP_PROVIDER)
);
// web-socket
//// const Web3Client = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER));

//* NFT Contracts: Doners Doughnuts (DD)
/* Contract instance for NFT editions  */
const DD_HELPER_CONTRACT_ADDRES = '0x63e3e2cE6C1Cf0CA2530A41E49C13Becc63cc49a';
const DDHelperContract = new Web3Client.eth.Contract(
  DdHelperABI,
  DD_HELPER_CONTRACT_ADDRES
);


function main() {
  console.log("CREATING DD TOKENS...");

  /* 'Covid' EDITION */
  fs.readFile(`${basePath}/web3/_ipfsMetadatas.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    const metadata = JSON.parse(data);
    /* Generate NFT with the metadata */
    // parse data and RPC call for each token.
    // for (idx in metadata) {
    // console.log(metadata[idx])
    // console.log(typeof metadata[idx].custom_fields.tokenId);
    // const result = 
    // DDHelperContract.methods.createDoughnut(metadata[idx].custom_fields.tokenId, metadata[idx].metadata_uri).call().then(console.log);
    createDoughnut(metadata); //, metadata[idx].custom_fields.tokenId, metadata[idx].metadata_uri);

    // console.log(result)
    // }
  });
  // DDHelperContract.methods.getMetadataUri(1000001).call().then(console.log).catch(console.log);
}

const createDoughnut = async (metadata) => {
  // for (idx in metadata) {
  // DDHelperContract.methods.createDoughnut(parseInt(metadata[idx].custom_fields.tokenId), metadata[idx].metadata_uri).call().then(console.log);
  DDHelperContract.methods.mint(metadata[0].metadata_uri).send({ from: '0xb72207EB8c21c7698d493Da3bB273F6C8a76E367' }).then(console.log).catch(console.log);
  // }
  // DDHelperContract.methods.createDoughnut(tokenId, metadataUri).call().then(console.log).catch(console.log);
}


main();