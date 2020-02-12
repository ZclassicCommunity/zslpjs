"use strict";
/***************************************************************************************
 *
 *  Example 8: Send any type of token using P2SH frozen address
 *
 *      redeemScript (locking script):
 *              `<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubkey> OP_CHECKSIG`
 *      unlocking script:
 *              `<signature>`
 *
 *  Instructions:
 *      (1) - Select Network and Address by commenting/uncommenting the desired
 *              NETWORK section and providing valid BCH address.
 *      (2) - Select a Validation method by commenting/uncommenting the desired
 *              VALIDATOR section. Chose from remote validator or local validator.
 *              Both options rely on remote JSON RPC calls to rest.bitcoin.com.
 *      (3) - Run `tsc && node <file-name.js>` just before script execution
 *      (4) - Optional: Use vscode debugger w/ launch.json settings
 *
 * ************************************************************************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSDK = __importStar(require("bitbox-sdk"));
var bignumber_js_1 = require("bignumber.js");
var index_1 = require("../index");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var BITBOX, slp, helpers, opcodes, pubkey, wif, tokenReceiverAddress, bchChangeReceiverAddress, tokenId, sendAmounts, time_delay_seconds, locktime, locktimeBip62, redeemScript, fundingAddress, bitboxNetwork, tokenInfo, tokenDecimals, balances, sendAmountsBN, inputUtxos, extraFee, unsignedTxnHex, scriptSigs, signedTxn, sendTxid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
                    slp = new index_1.Slp(BITBOX);
                    helpers = new index_1.TransactionHelpers(slp);
                    opcodes = BITBOX.Script.opcodes;
                    pubkey = "0286d74c6fb92cb7b70b817094f48bf8fd398e64663bc3ddd7acc0a709212b9f69";
                    wif = "cPamRLmPyuuwgRAbB6JHhXvrGwvHtmw9LpVi8QnUZYBubCeyjgs1";
                    tokenReceiverAddress = ["slptest:prk685k6r508xkj7u9g8v9p3f97hrmgr2qp7r4safs"];
                    bchChangeReceiverAddress = "slptest:prk685k6r508xkj7u9g8v9p3f97hrmgr2qp7r4safs";
                    tokenId = "f0c7a8a7addc29edbc193212057d91c3eb004678e15e4662773146bdd51f8d7a";
                    sendAmounts = [1];
                    time_delay_seconds = 0;
                    return [4 /*yield*/, BITBOX.Blockchain.getBlockchainInfo()];
                case 1:
                    locktime = (_a.sent()).mediantime + time_delay_seconds - 3600;
                    locktimeBip62 = 'c808f05c' //slpjs.Utils.get_BIP62_locktime_hex(locktime);  
                    ;
                    redeemScript = BITBOX.Script.encode([
                        Buffer.from(locktimeBip62, 'hex'),
                        opcodes.OP_CHECKLOCKTIMEVERIFY,
                        opcodes.OP_DROP,
                        Buffer.from(pubkey, 'hex'),
                        opcodes.OP_CHECKSIG
                    ]);
                    fundingAddress = index_1.Utils.slpAddressFromHash160(BITBOX.Crypto.hash160(redeemScript), 'testnet', 'p2sh');
                    bitboxNetwork = new index_1.BitboxNetwork(BITBOX);
                    return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                case 2:
                    tokenInfo = _a.sent();
                    tokenDecimals = tokenInfo.decimals;
                    console.log("Token precision: " + tokenDecimals.toString());
                    return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                case 3:
                    balances = _a.sent();
                    console.log("'balances' variable is set.");
                    console.log(balances);
                    if (balances.slpTokenBalances[tokenId] === undefined)
                        console.log("You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required.");
                    console.log("Token balance:", balances.slpTokenBalances[tokenId].toFixed() / Math.pow(10, tokenDecimals));
                    sendAmountsBN = sendAmounts.map(function (a) { return (new bignumber_js_1.BigNumber(a)).times(Math.pow(10, tokenDecimals)); });
                    inputUtxos = balances.slpTokenUtxos[tokenId];
                    // Simply sweep our BCH utxos to fuel the transaction
                    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                    extraFee = (8) * // for OP_CTLV and timelock data push
                        inputUtxos.length // this many times since we swept inputs from p2sh address
                    ;
                    unsignedTxnHex = helpers.simpleTokenSend({ tokenId: tokenId, sendAmounts: sendAmountsBN, inputUtxos: inputUtxos, tokenReceiverAddresses: tokenReceiverAddress, changeReceiverAddress: bchChangeReceiverAddress, extraFee: extraFee });
                    unsignedTxnHex = helpers.enableInputsCLTV(unsignedTxnHex);
                    unsignedTxnHex = helpers.setTxnLocktime(unsignedTxnHex, locktime);
                    scriptSigs = inputUtxos.map(function (txo, i) {
                        var sigObj = helpers.get_transaction_sig_p2sh(unsignedTxnHex, wif, i, txo.satoshis, redeemScript, redeemScript);
                        return {
                            index: i,
                            lockingScriptBuf: redeemScript,
                            unlockingScriptBufArray: [sigObj.signatureBuf]
                        };
                    });
                    signedTxn = helpers.addScriptSigs(unsignedTxnHex, scriptSigs);
                    return [4 /*yield*/, bitboxNetwork.sendTx(signedTxn)];
                case 4:
                    sendTxid = _a.sent();
                    console.log("SEND txn complete:", sendTxid);
                    return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=8-send-token-p2sh-frozen.js.map