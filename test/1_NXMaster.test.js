const Claims = artifacts.require("Claims");
const ClaimsData = artifacts.require("ClaimsData");
const ClaimsReward = artifacts.require("ClaimsReward");
const DAI = artifacts.require("DAI");
const NXMaster = artifacts.require("NXMaster");
const NXMaster2 = artifacts.require("NXMaster2");
const MCR = artifacts.require("MCR");
const MCRData = artifacts.require("MCRData");
const NXMToken1 = artifacts.require("NXMToken1");
const NXMToken2 = artifacts.require("NXMToken2");
const NXMTokenData = artifacts.require("NXMTokenData");
const Pool1 = artifacts.require("Pool1");
const Pool2 = artifacts.require("Pool2");
const Pool3 = artifacts.require("Pool3");
const PoolData = artifacts.require("PoolData");
const Quotation = artifacts.require("Quotation");
const QuotationData = artifacts.require("QuotationData");
const MemberRoles = artifacts.require("MemberRoles");
let nxms;
let nxms2;
let nxmt1;
let nxmt2;
let nxmtd;
let pl1;
let pl2;
let pl3;
let pd;
let qt;
let qd;
let cl;
let cr;
let cd;
let mcr;
let mcrd;
let addr = [];
let newMaster;

const QE = web3.eth.accounts[19];
const WETH_0x = web3.eth.accounts[18];
const Exchange_0x = web3.eth.accounts[17];
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract("NXMaster", function ([owner]) {
	it('should add a new version', async function () {
		nxms = await NXMaster.deployed();
		qd = await QuotationData.new();
		nxmtd = await NXMTokenData.new("0","NXM","18","NXM");
		cd = await ClaimsData.new();
		pd = await PoolData.new();
		mcrd = await MCRData.new();
		qt = await Quotation.new();
		nxmt1 = await NXMToken1.new();
		nxmt2 = await NXMToken2.new();
		cl = await Claims.new();
		cr = await ClaimsReward.new();
		pl1 = await Pool1.new();
		pl2 = await Pool2.new();
		mcr = await MCR.new();
		nxms2 = await NXMaster2.new();
		pl3 = await Pool3.new();
		addr.push(qd.address);
		addr.push(nxmtd.address);
		addr.push(cd.address);
		addr.push(pd.address);
		addr.push(mcrd.address);
		addr.push(qt.address);
		addr.push(nxmt1.address);
		addr.push(nxmt2.address);
		addr.push(cl.address);
		addr.push(cr.address);
		addr.push(pl1.address);
		addr.push(pl2.address);
		addr.push(nxms2.address);
		addr.push(mcr.address);
		addr.push(pl3.address);
		const ver = new BigNumber(1);
		const versionLength = await nxms.versionLength();
		await nxms.addNewVersion(addr);
		const newVersionLength = await nxms.versionLength();
		newVersionLength.should.be.bignumber.equal(versionLength.plus(ver));
  	});
	it('should switch to new version', async function () {
		const currentVersion = await nxms.currentVersion();
		const newVer = new BigNumber(1);
		await nxms.switchToRecentVersion();
		const newCurrentVersion = await nxms.currentVersion();
		newCurrentVersion.should.be.bignumber.equal(currentVersion.plus(newVer));
	});
	it('should change master address', async function () {
		newMaster = await NXMaster.new();
		let newMasterAddr = await newMaster.address;
		await nxms.changeMasterAddress(newMasterAddr);
		await newMaster.addNewVersion(addr);
		await newMaster.switchToRecentVersion();
		let verifyMasterAddress = await nxms2.masterAddress();
		verifyMasterAddress.should.equal(newMasterAddr);
	});
	it('should change MemberRole Address', async function () {
		let memberRoles = await MemberRoles.deployed();
		let MRAddress = await memberRoles.address;
		await newMaster.changeMemberRolesAddress(MRAddress);
		let verifyMRAddress = await newMaster.memberRolesAddress();
		verifyMRAddress.should.equal(MRAddress);
	});
	it('should reinitialize', async function () {
		await pl1.takeEthersOnly( {from: owner, value: 9000000000000000000});
		await nxmtd.setWalletAddress(owner); //"0x7266c50f1f461d2748e675b907ef22987f6b5358");
		await qd.changeAuthQuoteEngine(QE);//"0xb24919181daead6635e613576ca11c5aa5a4e133");
		await nxms2.addCoverStatus();
		await nxms2.callPoolDataMethods();
		await nxms2.addStatusInClaims();
		await nxms2.addMCRCurr();
		await nxms2.addStatusInClaims();
		await pd.changeWETHAddress(WETH_0x);//"0xd0a1e359811322d97991e03f863a0c30c2cf029c");
		let dai = await DAI.new();
		await pd.changeCurrencyAssetAddress("0x444149",dai.address);
		await pd.change0xMakerAddress(owner); //"0x7266C50F1f461d2748e675B907eF22987F6B5358");
		await pl2.changeExchangeContractAddress(Exchange_0x);//"0x90fe2af704b34e0224bf2299c838e04d4dcf1364");
		await pl3.changeExchangeContractAddress(Exchange_0x);//"0x90fe2af704b34e0224bf2299c838e04d4dcf1364");
		await mcr.changenotariseAddress(owner); //"0x7266c50f1f461d2748e675b907ef22987f6b5358");   
		var arg1 = 18000;
		var arg2 = 10000;
		var arg3 = 2;
		var arg4 = ["0x455448","0x444149"];
		var arg5 = [100,65407];
		var arg6 = 20180807;
		await mcr.addMCRData(arg1,arg2,arg3,arg4,arg5,arg6);
	});	
});
