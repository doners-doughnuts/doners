const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
// const FundraiserContract = artifacts.require('Fundraiser');

module.exports = function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
  //   deployer.deploy(FundraiserContract);
};
