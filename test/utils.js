"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var assert = __importStar(require("assert"));
require("mocha");
describe('Utils', function () {
    describe('Address Conversion and Network Detection', function () {
        it("buildSlpUri()", function () {
            var expected_uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk";
            var uri = utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(expected_uri, uri);
        });
        it("buildSlpUri()", function () {
            var expected_uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk";
            var uri = utils_1.Utils.buildSlpUri("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(expected_uri, uri);
        });
        it("buildSlpUri()", function () {
            var expected_uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.1";
            var uri = utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk", 10.1);
            assert.equal(expected_uri, uri);
        });
        it("buildSlpUri()", function () {
            var expected_uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=1.01-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f";
            var uri = utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk", undefined, 1.01, "fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f");
            assert.equal(expected_uri, uri);
        });
        it("buildSlpUri()", function () {
            var expected_uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.1&amount1=1.01-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f";
            var uri = utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk", 10.1, 1.01, "fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f");
            assert.equal(expected_uri, uri);
        });
        it("buildSlpUri()", function () {
            var f = function () {
                utils_1.Utils.buildSlpUri("abc");
            };
            assert.throws(f, Error("Not a valid SLP address"));
        });
        it("buildSlpUri()", function () {
            var f = function () {
                utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk", undefined, 1.01);
            };
            assert.throws(f, Error("Missing tokenId parameter"));
        });
        it("buildSlpUri()", function () {
            var f = function () {
                utils_1.Utils.buildSlpUri("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk", undefined, 1.01, "abc");
            };
            assert.throws(f, Error("TokenId is invalid, must be 32-byte hexidecimal string"));
        });
        it("parseSlpUri()", function () {
            var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk";
            var r = utils_1.Utils.parseSlpUri(uri);
            var r_expected = {
                address: "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk"
            };
            assert.deepEqual(r, r_expected);
        });
        it("parseSlpUri()", function () {
            var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=1.01&amount1=10.123-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f";
            var r = utils_1.Utils.parseSlpUri(uri);
            var r_expected = {
                address: "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk",
                amountBch: 1.01,
                amountToken: 10.123,
                tokenId: "fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f"
            };
            assert.deepEqual(r, r_expected);
        });
        it("parseSlpUri()", function () {
            var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.123-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f";
            var r = utils_1.Utils.parseSlpUri(uri);
            var r_expected = {
                address: "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk",
                amountToken: 10.123,
                tokenId: "fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f"
            };
            assert.deepEqual(r, r_expected);
        });
        it("parseSlpUri()", function () {
            var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.123";
            var r = utils_1.Utils.parseSlpUri(uri);
            var r_expected = {
                address: "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk",
                amountBch: 10.123
            };
            assert.deepEqual(r, r_expected);
        });
        it("parseSlpUri()", function () {
            var f = function () {
                var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.123-abch";
                utils_1.Utils.parseSlpUri(uri);
            };
            assert.throws(f, Error("Token id in URI is not a valid 32-byte hexidecimal string"));
        });
        it("parseSlpUri()", function () {
            var f = function () {
                var uri = "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk?amount=10.123-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f-isgroup";
                utils_1.Utils.parseSlpUri(uri);
            };
            assert.throws(f, Error("Token flags params not yet implemented."));
        });
        it("parseSlpUri()", function () {
            var f = function () {
                var uri = "simpleledger:qra3uard8aqxxc9tswlsugad9x0uglyehc74puah4w?amount=10.123-fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f";
                utils_1.Utils.parseSlpUri(uri);
            };
            assert.throws(f, Error("Address is not an SLP formatted address."));
        });
        it("parseSlpUri()", function () {
            var f = function () {
                var uri = "simpleledger:qra3uard8aqxxc9tswlsugad9x0uglyehc74puah4w?amount=10.123?fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f-isgroup";
                utils_1.Utils.parseSlpUri(uri);
            };
            assert.throws(f, Error("Cannot have character '?' more than once."));
        });
        it("parseSlpUri()", function () {
            var f = function () {
                var uri = "bitcoincash:qra3uard8aqxxc9tswlsugad9x0uglyehc74puah4w?amount=10.123";
                utils_1.Utils.parseSlpUri(uri);
            };
            assert.throws(f, Error("Input does not start with 'simpleledger:'"));
        });
        it("slpAddressFromHash160()", function () {
            var hash160 = Buffer.from("e9d42fb8b90cc1b8dcf698280bb3a066ce08876f", 'hex');
            var network = "mainnet"; // or "testnet"
            var type = "p2pkh"; // or "p2sh"
            var addr = utils_1.Utils.slpAddressFromHash160(hash160, network, type);
            assert.equal(addr, "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
        });
        it("toLegacyAddress()", function () {
            var addr = utils_1.Utils.toLegacyAddress("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB");
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB");
            assert.equal(addr, true);
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, false);
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("TEST");
            assert.equal(addr, false);
        });
        it("toCashAddress()", function () {
            var addr = utils_1.Utils.toCashAddress("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
        });
        it("isCashAddress()", function () {
            var addr = utils_1.Utils.isCashAddress("bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, true);
        });
        it("isCashAddress()", function () {
            var addr = utils_1.Utils.isCashAddress("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, false);
        });
        it("isCashAddress()", function () {
            var addr = utils_1.Utils.isCashAddress("TEST");
            assert.equal(addr, false);
        });
        it("toSlpAddress()", function () {
            var addr = utils_1.Utils.toSlpAddress("bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
        });
        it("isSlpAddress()", function () {
            var addr = utils_1.Utils.isSlpAddress("bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, false);
        });
        it("isSlpAddress()", function () {
            var addr = utils_1.Utils.isSlpAddress("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, true);
        });
        it("isSlpAddress()", function () {
            var addr = utils_1.Utils.isSlpAddress("TEST");
            assert.equal(addr, false);
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, false);
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB");
            assert.equal(addr, true);
        });
        it("isLegacyAddress()", function () {
            var addr = utils_1.Utils.isLegacyAddress("TEST");
            assert.equal(addr, false);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, true);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, true);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("1M57AyZWUxEA5ihv3vUcF3GrRKZqFN9vMT");
            assert.equal(addr, true);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk");
            assert.equal(addr, true);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg");
            assert.equal(addr, true);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l");
            assert.equal(addr, false);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("bchtest:qpwyc9jnwckntlpuslg7ncmhe2n423304uz5ll5saz");
            assert.equal(addr, false);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("movycLMazxTqG3LcPGNPRaTabi8dK4eKTX");
            assert.equal(addr, false);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l");
            assert.equal(addr, false);
        });
        it("isMainnet()", function () {
            var addr = utils_1.Utils.isMainnet("qpwyc9jnwckntlpuslg7ncmhe2n423304uz5ll5saz");
            assert.equal(addr, false);
        });
    });
});
//# sourceMappingURL=utils.js.map