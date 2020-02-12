"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var slptokentype1_1 = require("../lib/slptokentype1");
var assert = __importStar(require("assert"));
describe('SlpTokenType1', function () {
    describe('buildGenesisOpReturn()', function () {
        it('Succeeds with Minimal OP_RETURN', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber(100);
            var op_return = slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity);
            assert.equal(op_return.toString('hex'), '6a04534c500001010747454e455349534c004c004c004c0001004c00080000000000000064');
        });
        it('Throws without BigNumber', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = 100;
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Amount must be an instance of BigNumber"));
        });
        it('Throws with initial quantity too large', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551616');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Maximum genesis value exceeded. Reduce input quantity below 18446744073709551615."));
        });
        it('Throws with negative initial quantity', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('-1');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Genesis quantity must be greater than 0."));
        });
        it('Throws with a decimal initial quantity', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('1.1');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Genesis quantity must be a whole number."));
        });
        it('Throws when allocated OP_RETURN space is exceeded', function () {
            var ticker = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            var name = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            var documentUri = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Script too long, must be less than 223 bytes."));
        });
        it('Succeeds with batonVout is 2 and max inital quantity is used', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = 2;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            var op_return = slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity);
            assert.equal(op_return.toString('hex'), '6a04534c500001010747454e455349534c004c004c004c000100010208ffffffffffffffff');
        });
        it('Throws when batonVout is less than 2', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = 1;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when batonVout is less than 2', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = 0;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when batonVout is less than 2', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = -1;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when batonVout is greater than 255', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = 256;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when decimals is too high', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 10;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Decimals property must be in range 0 to 9"));
        });
        it('Throws when decimals is negative', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = -1;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Decimals property must be in range 0 to 9"));
        });
        it('Throws when decimals is null', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = null;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Decimals property must be in range 0 to 9"));
        });
        it('Throws when initialQuantity is null', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = null;
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Amount must be an instance of BigNumber"));
        });
        it('Throws when documentUri is provided as Buffer', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = Buffer.from('00', 'hex');
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Document hash must be provided as a 64 character hex string"));
        });
        it('Throws when documentUri is provided as non-hex string', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Document hash must be provided as a 64 character hex string"));
        });
        it('Throws when ticker is not a string', function () {
            var ticker = ['a'];
            var name = null;
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("ticker must be a string"));
        });
        it('Throws when name is not a string', function () {
            var ticker = null;
            var name = ['a'];
            var documentUri = null;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("name must be a string"));
        });
        it('Throws when documentUri is not a string', function () {
            var ticker = null;
            var name = null;
            var documentUri = 1;
            var documentHashHex = null;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("documentUri must be a string"));
        });
        it('Throws when documentHashHex is not a string', function () {
            var ticker = null;
            var name = null;
            var documentUri = null;
            var documentHashHex = 1;
            var decimals = 0;
            var batonVout = null;
            var initialQuantity = new bignumber_js_1.BigNumber('18446744073709551615');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildGenesisOpReturn(ticker, name, documentUri, documentHashHex, decimals, batonVout, initialQuantity); }, Error("Document hash must be provided as a 64 character hex string"));
        });
    });
    describe('buildSendOpReturn()', function () {
        it('Succeeds with 1 output', function () {
            var expectedResult = "6a04534c500001010453454e44208888888888888888888888888888888888888888888888888888888888888888080000000000000042";
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            var result = slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray).toString('hex');
            assert.equal(result, expectedResult);
        });
        it('Succeeds with 2 outputs', function () {
            var expectedResult = "6a04534c500001010453454e44208888888888888888888888888888888888888888888888888888888888888888080000000000000042080000000000000063";
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99')];
            var result = slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray).toString('hex');
            assert.equal(result, expectedResult);
        });
        it('Succeeds with 19 outputs', function () {
            var expectedResult = "6a04534c500001010453454e44208888888888888888888888888888888888888888888888888888888888888888080000000000000042080000000000000063080000000000000063080000000000000063080000000000000063080000000000000042080000000000000063080000000000000063080000000000000063080000000000000063080000000000000042080000000000000063080000000000000063080000000000000063080000000000000063080000000000000042080000000000000063080000000000000063080000000000000063";
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99')];
            var result = slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray).toString('hex');
            assert.equal(result, expectedResult);
        });
        it('Throws with 20 outputs', function () {
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'),
                new bignumber_js_1.BigNumber('66'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99'), new bignumber_js_1.BigNumber('99')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("Cannot have more than 19 SLP token outputs."));
        });
        it('Throws with 0 outputs', function () {
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("Cannot have less than 1 SLP token output."));
        });
        it('Throws with null outputs', function () {
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = null;
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, TypeError);
        });
        it('Throws with BigNumber outputs', function () {
            var tokenIdHex = "8888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = new bignumber_js_1.BigNumber('100');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, TypeError);
        });
        it('Throws with tokenIdHex too short', function () {
            var tokenIdHex = "88888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex too long', function () {
            var tokenIdHex = "888888888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex non-hex string', function () {
            var tokenIdHex = "zz88888888888888888888888888888888888888888888888888888888888888";
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex not a string', function () {
            var tokenIdHex = 1;
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex not as null', function () {
            var tokenIdHex = null;
            var outputQtyArray = [new bignumber_js_1.BigNumber('66')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildSendOpReturn(tokenIdHex, outputQtyArray); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
    });
    describe('buildMintOpReturn()', function () {
        it('Succeeds when batonVout = null', function () {
            var expectedResult = "6a04534c50000101044d494e5420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4c00080000000000000064";
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('100');
            var result = slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity).toString('hex');
            assert.equal(result, expectedResult);
        });
        it('Succeeds when batonVout is 2', function () {
            var expectedResult = "6a04534c50000101044d494e5420ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0102080000000000000064";
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = 2;
            var mintQuantity = new bignumber_js_1.BigNumber('100');
            var result = slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity).toString('hex');
            assert.equal(result, expectedResult);
        });
        it('Throws when batonVout is 1', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = 1;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            //SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity)
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when batonVout is 256', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = 256;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Baton vout must a number and greater than 1 and less than 256."));
        });
        it('Throws when mintQuantity is a number', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = 1;
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Amount must be an instance of BigNumber"));
        });
        it('Throws when mintQuantity is null', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = null;
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Amount must be an instance of BigNumber"));
        });
        it('Throws when mintQuantity is too large', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('18446744073709551616');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Maximum mint value exceeded. Reduce input quantity below 18446744073709551615."));
        });
        it('Throws when mintQuantity is negative', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('-1');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Mint quantity must be greater than 0."));
        });
        it('Throws when mintQuantity is decimal', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('1.1');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Mint quantity must be a whole number."));
        });
        it('Throws when mintQuantity is array', function () {
            var tokenIdHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
            var batonVout = null;
            var mintQuantity = [new bignumber_js_1.BigNumber('1')];
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("Amount must be an instance of BigNumber"));
        });
        it('Throws with tokenIdHex too short', function () {
            var tokenIdHex = "888888888888888888888888888888888888888888888888888888888888";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex too long', function () {
            var tokenIdHex = "888888888888888888888888888888888888888888888888888888888888888888";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex non-hex string', function () {
            var tokenIdHex = "zz88888888888888888888888888888888888888888888888888888888888888";
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex not a string', function () {
            var tokenIdHex = 1;
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
        it('Throws with tokenIdHex not as null', function () {
            var tokenIdHex = null;
            var batonVout = null;
            var mintQuantity = new bignumber_js_1.BigNumber('66');
            assert.throws(function () { slptokentype1_1.SlpTokenType1.buildMintOpReturn(tokenIdHex, batonVout, mintQuantity); }, Error("TokenIdHex must be provided as a 64 character hex string."));
        });
    });
});
//# sourceMappingURL=slptokentype1.js.map