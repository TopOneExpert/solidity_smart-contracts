const Claims = artifacts.require('Claims');
const ClaimsData = artifacts.require('ClaimsData');
const ClaimsReward = artifacts.require('ClaimsReward');
const DAI = artifacts.require('MockDAI');
const DSValue = artifacts.require('DSValue');
const NXMaster = artifacts.require('NXMaster');
const NXMaster2 = artifacts.require('NXMaster2');
const MCR = artifacts.require('MCR');
const MCRDataMock = artifacts.require('MCRDataMock');
const NXMToken = artifacts.require('NXMToken');
const TokenData = artifacts.require('TokenData');
const TokenFunctions = artifacts.require('TokenFunctions');
const TokenController = artifacts.require('TokenController');
const Pool1 = artifacts.require('Pool1');
const Pool2 = artifacts.require('Pool2');
const PoolData = artifacts.require('PoolData');
const Quotation = artifacts.require('Quotation');
const QuotationDataMock = artifacts.require('QuotationDataMock');
const founderAddress = web3.eth.accounts[0];
const INITIAL_SUPPLY = 1500000 * 1e18;

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(Claims);
    await deployer.deploy(ClaimsData);
    await deployer.deploy(ClaimsReward);
    await deployer.deploy(DAI);
    await deployer.deploy(DSValue);
    await deployer.deploy(NXMaster);
    await deployer.deploy(NXMaster2);
    await deployer.deploy(Pool1);
    await deployer.deploy(Pool2);
    await deployer.deploy(PoolData);
    await deployer.deploy(MCR);
    await deployer.deploy(MCRDataMock);
    await deployer.deploy(TokenController);
    const tc = await TokenController.deployed();
    await deployer.deploy(NXMToken, tc.address, founderAddress, INITIAL_SUPPLY);
    await deployer.deploy(TokenData);
    await deployer.deploy(TokenFunctions);
    await deployer.deploy(Quotation);
    await deployer.deploy(QuotationDataMock);
  });
};
