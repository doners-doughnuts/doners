// const DonersDoughnutsFactoryContract = artifacts.require("DonersDoughnutsFactory");
const DonersHelperContract = artifacts.require("DonersHelper");
// const DonersOwnershipiContract = artifacts.require("DonersOwnership");

module.exports = function (deployer) {
  // deployer.deploy(DonersDoughnutsFactoryContract);
  deployer.deploy(DonersHelperContract);
  // deployer.deploy(DonersOwnershipiContract);
};
