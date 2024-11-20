"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crc64jones = exports.crc64we = exports.crc64iso = exports.crc64 = exports.crc = void 0;
const detect_libc_1 = require("detect-libc");
/**
 * Check linux family to select correct libc
 */
const getLinuxFamily = () => {
    switch ((0, detect_libc_1.familySync)()) {
        case detect_libc_1.GLIBC:
            return '-gnu';
        case detect_libc_1.MUSL:
            return '-musl';
        default:
            return '';
    }
};
/**
 * Check platform and arch to load correct prebuild binary
 */
const arch = process.arch;
const platform = process.platform;
const family = platform === 'linux' ? getLinuxFamily() : '';
const binary = `../bin/${platform}-${arch}${family}.node`;
const _crc = require(binary);
/**
 * Create a CRC instance by providing the length of bits, expression, reflection, an initial value and a final xor value.
 */
const crc = (polyLow, polyHigh, bit, initialLow, initialHigh, finalXorLow, finalXorHigh, reflect, data) => {
    return _crc.crc(polyLow, polyHigh, bit, initialLow, initialHigh, finalXorLow, finalXorHigh, reflect, data);
};
exports.crc = crc;
/**
 * Check = 0x6C40DF5F0B497347, Poly = 0x42F0E1EBA9EA3693, Init = 0x0000000000000000, Ref = false, XorOut = 0x0000000000000000
 */
const crc64 = (data) => {
    return _crc.crc64(data);
};
exports.crc64 = crc64;
/**
 * Check = 0xB90956C775A41001, Poly = 0x000000000000001B (rev: 0xD800000000000000), Init = 0xFFFFFFFFFFFFFFFF, Ref = true, XorOut = 0xFFFFFFFFFFFFFFFF
 */
const crc64iso = (data) => {
    return _crc.crc64iso(data);
};
exports.crc64iso = crc64iso;
/**
 * Check = 0x62EC59E3F1A4F00A, Poly = 0x42F0E1EBA9EA3693, Init = 0xFFFFFFFFFFFFFFFF, Ref = false, XorOut = 0xFFFFFFFFFFFFFFFF
 */
const crc64we = (data) => {
    return _crc.crc64we(data);
};
exports.crc64we = crc64we;
/**
 * Check = 0xE9C6D914C4B8D9CA, Poly = 0xAD93D23594C935A9 (rev: 0x95AC9329AC4BC9B5), Init = 0x0000000000000000, Ref = true, XorOut = 0x0000000000000000
 */
const crc64jones = (data) => {
    return _crc.crc64jones(data);
};
exports.crc64jones = crc64jones;
