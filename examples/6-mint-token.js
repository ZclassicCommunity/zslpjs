"use strict";
/***************************************************************************************
 *
 *  Example 6: Minting for a Type 1 or NFT1 Parent token
 *
 *  Instructions:
 *      (1) - Send some BCH to simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu
 *            or tBCH to slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l
 *      (2) - Select Network and Address by commenting/uncommenting the desired
 *              NETWORK section and providing valid BCH address.
 *
 *      (3) - Select a Validation method by commenting/uncommenting the desired
 *              VALIDATOR section. Chose from remote validator or local validator.
 *              Both options rely on remote JSON RPC calls to rest.bitcoin.com.
 *                  - Option 1: REMOTE VALIDATION (rest.bitcoin.com/v2/slp/isTxidValid/)
 *                  - Option 2: LOCAL VALIDATOR / REST JSON RPC
 *                  - Option 3: LOCAL VALIDATOR / LOCAL FULL NODE
 *
 *      (4) - Run `tsc && node <file-name.js>` just before script execution, or for
 *              debugger just run `tsc` in the console and then use vscode debugger
 *              with "Launch Current File" mode.
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var BITBOX, fundingAddress, fundingWif, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, tokenIdHexToMint, additionalTokenQty, logger, RpcClient, connectionString, rpc, slpValidator, bitboxNetwork, balances, tokenInfo, tokenDecimals, mintQty, inputUtxos, mintTxid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BITBOX = new BITBOXSDK.BITBOX({ restURL: "https://rest.bitcoin.com/v2/" });
                fundingAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                fundingWif = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";
                tokenReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                batonReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
                tokenIdHexToMint = "112f967519e18083c8e4bd7ba67ebc04d72aaaa941826d38655c53d677e6a5be";
                additionalTokenQty = 1000;
                logger = console;
                RpcClient = require("bitcoin-rpc-promise");
                connectionString = "http://bitcoin:password@localhost:8332";
                rpc = new RpcClient(connectionString);
                slpValidator = new index_1.LocalValidator(BITBOX, function (txids) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, rpc.getRawTransaction(txids[0])];
                        case 1: return [2 /*return*/, [_a.sent()]];
                    }
                }); }); }, logger);
                bitboxNetwork = new index_1.BitboxNetwork(BITBOX, slpValidator);
                return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
            case 1:
                balances = _a.sent();
                console.log("'balances' variable is set.");
                if (balances.slpBatonUtxos[tokenIdHexToMint]) {
                    console.log("You have the minting baton for this token");
                }
                else {
                    throw Error("You don't have the minting baton for this token");
                }
                return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenIdHexToMint)];
            case 2:
                tokenInfo = _a.sent();
                tokenDecimals = tokenInfo.decimals;
                console.log("Token precision: " + tokenDecimals.toString());
                mintQty = (new bignumber_js_1.BigNumber(additionalTokenQty)).times(Math.pow(10, tokenDecimals));
                inputUtxos = balances.slpBatonUtxos[tokenIdHexToMint];
                // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
                inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                // 6) Set the proper private key for each Utxo
                inputUtxos.forEach(function (txo) { return txo.wif = fundingWif; });
                return [4 /*yield*/, bitboxNetwork.simpleTokenMint(tokenIdHexToMint, mintQty, inputUtxos, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress)];
            case 3:
                mintTxid = _a.sent();
                console.log("MINT txn complete:", mintTxid);
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=6-mint-token.js.map