"use strict";
/***************************************************************************************
 *
 *  Example 9: Send any type of token using P2SH multisig
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
        var BITBOX, slp, helpers, pubkey_signer_1, pubkey_signer_2, wifs, tokenReceiverAddress, bchChangeReceiverAddress, tokenId, sendAmounts, bitboxNetwork, tokenInfo, tokenDecimals, fundingAddress, balances, inputUtxos, extraFee, unsignedTxnHex, redeemData, scriptSigs, signedTxn, sendTxid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
                    slp = new index_1.Slp(BITBOX);
                    helpers = new index_1.TransactionHelpers(slp);
                    pubkey_signer_1 = "02471e07bcf7d47afd40e0bf4f806347f9e8af4dfbbb3c45691bbaefd4ea926307";
                    pubkey_signer_2 = "03472cfca5da3bf06a85c5fd860ffe911ef374cf2a9b754fd861d1ead668b15a32";
                    wifs = ["Ky6iiLSL2K9stMd4G5dLeXfpVKu5YRB6dhjCsHyof3eaB2cDngSr", "L2AdfmxwsYu3KnRASZ51C3UEnduUDy1b21sSF9JbLNVEPzsxEZib"] //[ "Ky6iiLSL2K9stMd4G5dLeXfpVKu5YRB6dhjCsHyof3eaB2cDngSr", null ];
                    ;
                    tokenReceiverAddress = ["simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn"];
                    bchChangeReceiverAddress = "simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn";
                    tokenId = "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7";
                    sendAmounts = [1];
                    bitboxNetwork = new index_1.BitboxNetwork(BITBOX);
                    return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                case 1:
                    tokenInfo = _a.sent();
                    tokenDecimals = tokenInfo.decimals;
                    console.log("Token precision: " + tokenDecimals.toString());
                    fundingAddress = "simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn";
                    return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                case 2:
                    balances = _a.sent();
                    console.log("'balances' variable is set.");
                    console.log(balances);
                    if (balances.slpTokenBalances[tokenId] === undefined)
                        console.log("You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required.");
                    console.log("Token balance:", balances.slpTokenBalances[tokenId].toFixed() / Math.pow(10, tokenDecimals));
                    // Wait for network responses...
                    // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
                    sendAmounts = sendAmounts.map(function (a) { return (new bignumber_js_1.BigNumber(a)).times(Math.pow(10, tokenDecimals)); }); // Don't forget to account for token precision
                    inputUtxos = balances.slpTokenUtxos[tokenId];
                    // 5) Simply sweep our BCH utxos to fuel the transaction
                    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                    extraFee = (2 * 33 + // two pub keys in each redeemScript
                        2 * 72 + // two signatures in scriptSig
                        10) * // for OP_CMS and various length bytes
                        inputUtxos.length // this many times since we swept inputs from p2sh address
                    ;
                    unsignedTxnHex = helpers.simpleTokenSend({ tokenId: tokenId, sendAmounts: sendAmounts, inputUtxos: inputUtxos, tokenReceiverAddresses: tokenReceiverAddress, changeReceiverAddress: bchChangeReceiverAddress, extraFee: extraFee });
                    redeemData = helpers.build_P2SH_multisig_redeem_data(2, [pubkey_signer_1, pubkey_signer_2]);
                    scriptSigs = inputUtxos.map(function (txo, i) {
                        var sigData = redeemData.pubKeys.map(function (pk, j) {
                            if (wifs[j]) {
                                return helpers.get_transaction_sig_p2sh(unsignedTxnHex, wifs[j], i, txo.satoshis, redeemData.lockingScript, redeemData.lockingScript);
                            }
                            else {
                                return helpers.get_transaction_sig_filler(i, pk);
                            }
                        });
                        return helpers.build_P2SH_multisig_scriptSig(redeemData, i, sigData);
                    });
                    signedTxn = helpers.addScriptSigs(unsignedTxnHex, scriptSigs);
                    return [4 /*yield*/, bitboxNetwork.sendTx(signedTxn)];
                case 3:
                    sendTxid = _a.sent();
                    console.log("SEND txn complete:", sendTxid);
                    return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=9-send-token-p2sh-multisig.js.map