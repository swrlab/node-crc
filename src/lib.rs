use neon::handle::Managed;
use neon::prelude::*;
use neon::types::buffer::TypedArray;

use crc_any::*;

fn js_number_to_u8<'a, T: Managed>(
    cx: &mut FunctionContext<'a>,
    value: Handle<JsNumber>,
) -> Result<u8, JsResult<'a, T>> {
    let value = value.value(cx);

    if value.is_infinite() || value.is_nan() || value.fract() > f64::EPSILON {
        return Err(cx.throw_type_error(format!("{} is not an integer", value)));
    }

    let value = value as i64;

    // use `u8` here to check because the input may be in **0b**, **0o** or **0x** formats, which may be bigger than **2^7 - 1** but smaller than **2^8 - 1** and therefore is negative in i8
    if value > u8::MAX as i64 {
        Err(cx.throw_range_error(format!("{} is bigger than {}", value, u8::MAX)))
    } else if value < i8::MIN as i64 {
        Err(cx.throw_range_error(format!("{} is smaller than {}", value, u8::MIN)))
    } else {
        Ok(value as u8)
    }
}

fn js_number_to_u32<'a, T: Managed>(
    cx: &mut FunctionContext<'a>,
    value: Handle<JsNumber>,
) -> Result<u32, JsResult<'a, T>> {
    let value = value.value(cx);

    if value.is_infinite() || value.is_nan() || value.fract() > f64::EPSILON {
        return Err(cx.throw_type_error(format!("{} is not an integer", value)));
    }

    let value = value as i64;

    // use `u32` here to check because the input may be in **0b**, **0o** or **0x** formats, which may be bigger than **2^31 - 1** but smaller than **2^32 - 1** and therefore is negative in i32
    if value > u32::MAX as i64 {
        Err(cx.throw_range_error(format!("{} is bigger than {}", value, u32::MAX)))
    } else if value < i32::MIN as i64 {
        Err(cx.throw_range_error(format!("{} is smaller than {}", value, i32::MIN)))
    } else {
        Ok(value as u32)
    }
}

fn to_js_buffer_8<'a>(cx: &mut FunctionContext<'a>, u: u64) -> JsResult<'a, JsBuffer> {
    let mut buffer = unsafe { JsBuffer::uninitialized(cx, 8)? };

    let slice = buffer.as_mut_slice(cx);

    slice.copy_from_slice(&u.to_be_bytes());

    Ok(buffer)
}

fn crc(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let poly = {
        let low = cx.argument::<JsNumber>(0)?;
        let high = cx.argument::<JsNumber>(1)?;

        let low = match js_number_to_u32(&mut cx, low) {
            Ok(v) => v,
            Err(err) => return err,
        };

        let high = match js_number_to_u32(&mut cx, high) {
            Ok(v) => v,
            Err(err) => return err,
        };

        ((high as u64) << 32) | (low as u64)
    };

    let bit = {
        let bit = cx.argument::<JsNumber>(2)?;

        match js_number_to_u8(&mut cx, bit) {
            Ok(v) => v,
            Err(err) => return err,
        }
    };

    let initial = {
        let low = cx.argument::<JsNumber>(3)?;
        let high = cx.argument::<JsNumber>(4)?;

        let low = match js_number_to_u32(&mut cx, low) {
            Ok(v) => v,
            Err(err) => return err,
        };

        let high = match js_number_to_u32(&mut cx, high) {
            Ok(v) => v,
            Err(err) => return err,
        };

        ((high as u64) << 32) | (low as u64)
    };

    let final_xor = {
        let low = cx.argument::<JsNumber>(5)?;
        let high = cx.argument::<JsNumber>(6)?;

        let low = match js_number_to_u32(&mut cx, low) {
            Ok(v) => v,
            Err(err) => return err,
        };

        let high = match js_number_to_u32(&mut cx, high) {
            Ok(v) => v,
            Err(err) => return err,
        };

        ((high as u64) << 32) | (low as u64)
    };

    let reflect = cx.argument::<JsBoolean>(7)?.value(&mut cx);

    let buffer = cx.argument::<JsBuffer>(8)?;

    let crc =  {
        let data = buffer.as_slice(&cx);

        let mut crc = CRC::create_crc(poly, bit, initial, final_xor, reflect);

        crc.digest(data);

        crc.get_crc_heapless_vec_be()
    };

    let mut buffer = unsafe { JsBuffer::uninitialized(&mut cx, crc.len())? };

    let slice = buffer.as_mut_slice(&mut cx);

    slice.copy_from_slice(&crc);

    Ok(buffer)
}

macro_rules! crc_functions_8 {
    (@inner $cx:expr, $f:ident) => {
        fn $f(mut cx: FunctionContext) -> JsResult<JsBuffer> {
            let buffer = cx.argument::<JsBuffer>(0)?;

            let crc = {
                let data = buffer.as_slice(&cx);

                let mut crc = CRCu64::$f();

                crc.digest(data);

                crc.get_crc()
            };

            to_js_buffer_8(&mut cx, crc)
        }

        $cx.export_function(stringify!($f), $f)?;
    };
    ($cx:expr; $($f:ident),+ $(,)* ) => {
        $(
            crc_functions_8!(@inner $cx, $f);
        )+
    };
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("crc", crc)?;

    crc_functions_8!(cx;
        crc64,
        crc64iso,
        crc64we,
        crc64jones,
    );

    Ok(())
}
