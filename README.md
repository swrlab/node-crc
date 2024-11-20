# CRC For Node.js

[![CI](https://github.com/magiclen/node-crc/actions/workflows/ci.yml/badge.svg)](https://github.com/magiclen/node-crc/actions/workflows/ci.yml)

To compute CRC values by providing the length of bits, expression, reflection, an initial value and a final xor value. It has many built-in CRC functions.

For versions 2.0.0 - 2.0.13 you need to set up the Rust development environment: [rustup](https://rustup.rs/)

Since version 2.0.15 pre-build [binaries](./bin) for following platforms can be used:

- macOS x64
- macOS ARM64
- Linux x64 (gnu/musl)
- Linux x86 (gnu/musl)
- Linux ARM64 (gnu/musl)
- Windows x64
- Windows x86

## Usage

You can use `crc` function to compute a CRC value by providing the length of bits, expression, reflection, an initial value and a final xor value. For example, if you want to compute a CRC-24 value.

```javascript
const result = crc
  .crc(
    0x00864cfb,
    0x00000000,
    24,
    0x00b704ce,
    0x00000000,
    0x00000000,
    0x00000000,
    false,
    Buffer.from('hello', 'utf8')
  )
  .toString('hex')
// Arguments: low bits of expression, high bits of expression, the length of bits, low bits of the initial value, high bits of the initial value, low bits of the final xor value, high bits of the final xor value, reflection, the source data buffer
```

To simplify the usage, there are several common versions of CRC whose computing functions are already built-in.

- crc64
- crc64iso
- crc64we
- crc64jones

Input data and output data are buffers.

For instance,

```javascript
const result = crc.crc32(Buffer.from('hello', 'utf8')).toString('hex')
const result2 = crc.crc64(Buffer.from('world', 'utf8')).toString('hex')
```

## Pre-Build

To build the binaries, install Docker, [Cross](https://github.com/cross-rs/cross#installation) and [Rust-Toolchain](https://www.rust-lang.org/learn/get-started). Then execute `npm run build:bin`.

## TODO

1. CRC class to compute large data
2. Build binaries with github actions

## License

[MIT](LICENSE)
