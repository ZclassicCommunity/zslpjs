"use strict";
/***************************************************************************************
 *
 *  Example 5: Genesis for a single NFT1 Child - Must have NFT1 parent first
 *
 *  Instructions:
 *      (1) - Send some BCH to simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu
 *            or tBCH to slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l
 *            to fund the example.
 *      (2) - Select Network and Address by commenting/uncommenting the desired
 *              NETWORK section and providing valid BCH address.
 *      (3) - Select a Validation method by commenting/uncommenting the desired
 *              VALIDATOR section. Chose from remote validator or local validator.
 *              Both options rely on remote JSON RPC calls to rest.bitcoin.com.
 *      (4) - Run `tsc && node <file-name.js>` just before script execution
 *      (5) - Optional: Use vscode debugger w/ launch.json settings
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var BITBOXSDK = __importStar(require("bitbox-sdk"));
var grpc_bchrpc_node_1 = require("grpc-bchrpc-node");
var index_1 = require("../index");
var name = "My NFT1 Child";
var ticker = "NFT1 Child";
var documentUri = null;
var documentHash = null;
var NFT1ParentGroupID = "112f967519e18083c8e4bd7ba67ebc04d72aaaa941826d38655c53d677e6a5be";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sleep, BITBOX, fundingAddress, fundingWif, tokenReceiverAddress, bchChangeReceiverAddress, batonReceiverAddress, grpc, getRawTransactions, logger, slpValidator, bitboxNetwork, balances, utxo, inputs_1, sendTxid, inputs, genesisTxid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
                BITBOX = new BITBOXSDK.BITBOX({ restURL: "https://rest.bitcoin.com/v2/" });
                fundingAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                fundingWif = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";
                tokenReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                batonReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                grpc = new grpc_bchrpc_node_1.GrpcClient();
                getRawTransactions = function (txids) { return __awaiter(void 0, void 0, void 0, function () {
                    var txid, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                txid = txids[0];
                                return [4 /*yield*/, grpc.getRawTransaction({ hash: txid, reversedHashOrder: true })];
                            case 1:
                                res = _a.sent();
                                return [2 /*return*/, [Buffer.from(res.getTransaction_asU8()).toString("hex")]];
                        }
                    });
                }); };
                logger = console;
                slpValidator = new index_1.LocalValidator(BITBOX, getRawTransactions, logger);
                bitboxNetwork = new index_1.BitboxNetwork(BITBOX, slpValidator);
                return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
            case 1:
                balances = _a.sent();
                console.log("'balances' variable is set.");
                console.log("BCH balance:", balances.satoshis_available_bch);
                // Look at the NFT1 Parent token balance.  Make sure its greater than 0.
                if (!balances.slpTokenBalances[NFT1ParentGroupID] ||
                    !balances.slpTokenBalances[NFT1ParentGroupID].isGreaterThan(0)) {
                    throw Error("Insufficient balance of NFT1 tokens, first you need to create NFT1 parent at this address.");
                }
                balances.slpTokenUtxos[NFT1ParentGroupID].forEach(function (txo) {
                    if (!utxo && txo.slpUtxoJudgementAmount.isEqualTo(1)) {
                        utxo = txo;
                    }
                });
                if (!!utxo) return [3 /*break*/, 5];
                inputs_1 = __spread(balances.nonSlpUtxos, balances.slpTokenUtxos[NFT1ParentGroupID]);
                inputs_1.map(function (txo) { return txo.wif = fundingWif; });
                return [4 /*yield*/, bitboxNetwork.simpleTokenSend(NFT1ParentGroupID, new bignumber_js_1.BigNumber(1), inputs_1, tokenReceiverAddress, tokenReceiverAddress)];
            case 2:
                sendTxid = _a.sent();
                // wait for transaction to hit the full node.
                console.log("Created new parent UTXO to burn:", sendTxid);
                console.log("Waiting for the Full Node to sync with transaction...");
                return [4 /*yield*/, sleep(3000)];
            case 3:
                _a.sent();
                return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
            case 4:
                // update balances and set the newly created parent TXO.
                balances = (_a.sent());
                balances.slpTokenUtxos[NFT1ParentGroupID].forEach(function (txo) {
                    if (!utxo && txo.slpUtxoJudgementAmount.isEqualTo(1)) {
                        utxo = txo;
                    }
                });
                _a.label = 5;
            case 5:
                inputs = __spread([utxo], balances.nonSlpUtxos);
                inputs.map(function (txo) { return txo.wif = fundingWif; });
                return [4 /*yield*/, bitboxNetwork.simpleNFT1ChildGenesis(NFT1ParentGroupID, name, ticker, documentUri, documentHash, tokenReceiverAddress, bchChangeReceiverAddress, inputs)];
            case 6:
                genesisTxid = _a.sent();
                console.log("NFT1 Child GENESIS txn complete:", genesisTxid);
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=5-genesis-token-type-NFT1-child.js.map