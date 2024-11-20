import { describe, it } from 'mocha'
import { expect } from 'chai'

import * as crc from '../lib/lib.js'

describe('CRC-64 Family', () => {
	it('should calculate CRC-64(CRC-64-ECMA)', () => {
		const result = crc.crc64(Buffer.from('hello', 'utf8')).toString('hex')
		expect(result).to.equal('40544a306137b6ec')
	})
	it('should calculate CRC-64-ISO', () => {
		const result = crc.crc64iso(Buffer.from('hello', 'utf8')).toString('hex')
		expect(result).to.equal('3c3eeee2d8100000')
	})
	it('should calculate CRC-64-WE', () => {
		const result = crc.crc64we(Buffer.from('hello', 'utf8')).toString('hex')
		expect(result).to.equal('ec5388479a7c913f')
	})
	it('should calculate CRC-64-JONES', () => {
		const result = crc
			.crc64jones(Buffer.from('123456789', 'utf8'))
			.toString('hex')
		expect(result).to.equal('e9c6d914c4b8d9ca')
	})
})
