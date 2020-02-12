"use strict";
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
var bitcore = __importStar(require("bitcore-lib-cash"));
var grpc_bchrpc_node_1 = require("grpc-bchrpc-node");
var gprc = new grpc_bchrpc_node_1.GrpcClient();
// user variables
var tokenId = "";
var address = "";
var xpub = "xpub661MyMwAqRbcEmunind5AZXnevFW66TB3vq5MHM5Asq8UNaEdTsgk4njwUXW4RGywGK68au91R1rvjQ6SmJQEUwUinjYZPnJA7o72bG5HFr";
// @ts-ignore
var hdPublickey = new bitcore.HDPublicKey(xpub);
var accountDerivation = "m/0/"; //  this is the account part of the non-hardened HD path so, "/<account>/<address>/"
var lastFoundActiveAddressIndex = 0;
var addressGapScanDepth = 10; // this is the gap that will be maintained past the "lastActiveAddressIndex"
var transactionHistory = [];
// main scanning loop
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, orderPublickey, pubkey, address_1, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < lastFoundActiveAddressIndex + addressGapScanDepth)) return [3 /*break*/, 4];
                orderPublickey = hdPublickey.deriveChild(accountDerivation + i.toFixed());
                pubkey = new bitcore.PublicKey(orderPublickey.publicKey);
                address_1 = bitcore.Address.fromPublicKey(pubkey, bitcore.Networks.mainnet).toString();
                console.log(address_1);
                return [4 /*yield*/, gprc.getAddressTransactions({ address: address_1 })];
            case 2:
                res = _a.sent();
                if (res.getConfirmedTransactionsList().length > 0) {
                    lastFoundActiveAddressIndex = i;
                    transactionHistory.push.apply(transactionHistory, __spread(res.getConfirmedTransactionsList()));
                    console.log("Has transactions!");
                }
                console.log(transactionHistory.length);
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=11-get-txns-from-xpub-grpc.js.map