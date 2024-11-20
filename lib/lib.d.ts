/**
 * Create a CRC instance by providing the length of bits, expression, reflection, an initial value and a final xor value.
 */
export declare const crc: (polyLow: number, polyHigh: number, bit: number, initialLow: number, initialHigh: number, finalXorLow: number, finalXorHigh: number, reflect: boolean, data: Buffer) => Buffer;
/**
 * Check = 0x6C40DF5F0B497347, Poly = 0x42F0E1EBA9EA3693, Init = 0x0000000000000000, Ref = false, XorOut = 0x0000000000000000
 */
export declare const crc64: (data: Buffer) => Buffer;
/**
 * Check = 0xB90956C775A41001, Poly = 0x000000000000001B (rev: 0xD800000000000000), Init = 0xFFFFFFFFFFFFFFFF, Ref = true, XorOut = 0xFFFFFFFFFFFFFFFF
 */
export declare const crc64iso: (data: Buffer) => Buffer;
/**
 * Check = 0x62EC59E3F1A4F00A, Poly = 0x42F0E1EBA9EA3693, Init = 0xFFFFFFFFFFFFFFFF, Ref = false, XorOut = 0xFFFFFFFFFFFFFFFF
 */
export declare const crc64we: (data: Buffer) => Buffer;
/**
 * Check = 0xE9C6D914C4B8D9CA, Poly = 0xAD93D23594C935A9 (rev: 0x95AC9329AC4BC9B5), Init = 0x0000000000000000, Ref = true, XorOut = 0x0000000000000000
 */
export declare const crc64jones: (data: Buffer) => Buffer;
