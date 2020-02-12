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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var localvalidator_1 = require("../lib/localvalidator");
var assert = __importStar(require("assert"));
require("mocha");
var bitbox_sdk_1 = require("bitbox-sdk");
var bitbox = new bitbox_sdk_1.BITBOX();
var txUnitTestData = require('slp-unit-test-data/tx_input_tests.json');
describe('Slp', function () {
    describe('isValidSlpTxid() -- SLP Transaction Validation Unit Tests', function () {
        var _this = this;
        txUnitTestData.forEach(function (test) {
            it(test.description, function () { return __awaiter(_this, void 0, void 0, function () {
                var getRawUnitTestTransactions, slpValidator, txid, shouldBeValid, isValid, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getRawUnitTestTransactions = function (txids) { return __awaiter(_this, void 0, void 0, function () {
                                var allTxns, txn;
                                return __generator(this, function (_a) {
                                    allTxns = test.when.concat(test.should);
                                    txn = allTxns.find(function (i) {
                                        var hash = bitbox.Crypto.sha256(bitbox.Crypto.sha256(Buffer.from(i.tx, 'hex'))).reverse().toString('hex');
                                        return hash === txids[0];
                                    });
                                    if (txn)
                                        return [2 /*return*/, [txn.tx]];
                                    throw Error("Transaction data for the provided txid not found (txid: " + txids[0] + ")");
                                });
                            }); };
                            slpValidator = new localvalidator_1.LocalValidator(bitbox, getRawUnitTestTransactions);
                            // Pre-Load Validator the unit-test inputs
                            test.when.forEach(function (w) {
                                slpValidator.addValidationFromStore(w.tx, w.valid);
                            });
                            txid = bitbox.Crypto.sha256(bitbox.Crypto.sha256(Buffer.from(test.should[0].tx, 'hex'))).reverse().toString('hex');
                            shouldBeValid = test.should[0].valid;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, slpValidator.isValidSlpTxid(txid)];
                        case 2:
                            isValid = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            if (error_1.message.includes("Transaction data for the provided txid not found") &&
                                test.allow_inconclusive && test.inconclusive_reason === "missing-txn") {
                                isValid = false;
                            }
                            else {
                                throw error_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (isValid === false)
                                console.log('invalid reason:', slpValidator.cachedValidations[txid].invalidReason);
                            assert.equal(isValid, shouldBeValid);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=localvalidator.js.map