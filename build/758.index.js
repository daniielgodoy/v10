export const id = 758;
export const ids = [758];
export const modules = {

/***/ 5758:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  decode: () => (/* reexport */ decode),
  encode: () => (/* reexport */ encode)
});

;// CONCATENATED MODULE: ./node_modules/@thi.ng/errors/deferror.js
const defError = (prefix, suffix = (msg) => msg !== void 0 ? ": " + msg : "") => class extends Error {
  origMessage;
  constructor(msg) {
    super(prefix(msg) + suffix(msg));
    this.origMessage = msg !== void 0 ? String(msg) : "";
  }
};


;// CONCATENATED MODULE: ./node_modules/@thi.ng/errors/illegal-arguments.js

const IllegalArgumentError = defError(() => "illegal argument(s)");
const illegalArgs = (msg) => {
  throw new IllegalArgumentError(msg);
};


;// CONCATENATED MODULE: ./node_modules/@thi.ng/errors/illegal-state.js

const IllegalStateError = defError(() => "illegal state");
const illegalState = (msg) => {
  throw new IllegalStateError(msg);
};


;// CONCATENATED MODULE: ./node_modules/@thi.ng/bitstream/input.js


const U32 = 4294967296;
class BitInputStream {
  buffer;
  start;
  limit;
  pos;
  bitPos;
  bit;
  constructor(buffer, offset = 0, limit = buffer.length << 3) {
    this.buffer = buffer;
    this.start = offset;
    this.limit = limit;
    this.seek(offset);
  }
  *[Symbol.iterator]() {
    let j = this.start;
    let i = j >>> 3;
    let b = 7 - (j & 7);
    while (j < this.limit) {
      yield this.buffer[i] >>> b & 1;
      if (--b < 0) {
        i++;
        b = 7;
      }
      j++;
    }
  }
  get length() {
    return this.limit;
  }
  get position() {
    return this.bitPos;
  }
  seek(pos) {
    if (pos < this.start || pos >= this.limit) {
      illegalArgs(`seek pos out of bounds: ${pos}`);
    }
    this.pos = pos >>> 3;
    this.bit = 8 - (pos & 7);
    this.bitPos = pos;
    return this;
  }
  read(wordSize = 1, safe = true) {
    if (wordSize > 32) {
      return this.read(wordSize - 32, safe) * U32 + this.read(32, safe);
    } else if (wordSize > 8) {
      let out = 0;
      let n = wordSize & -8;
      let msb = wordSize - n;
      if (msb > 0) {
        out = this._read(msb, safe);
      }
      while (n > 0) {
        out = (out << 8 | this._read(8, safe)) >>> 0;
        n -= 8;
      }
      return out;
    } else {
      return this._read(wordSize, safe);
    }
  }
  readFields(fields, safe = true) {
    return fields.map((word) => this.read(word, safe));
  }
  readWords(n, wordSize = 8, safe = true) {
    let out = [];
    while (n-- > 0) {
      out.push(this.read(wordSize, safe));
    }
    return out;
  }
  readStruct(fields, safe = true) {
    return fields.reduce((acc, [id, word]) => {
      return acc[id] = this.read(word, safe), acc;
    }, {});
  }
  readBit(safe = true) {
    safe && this.checkLimit(1);
    this.bit--;
    this.bitPos++;
    let out = this.buffer[this.pos] >>> this.bit & 1;
    if (this.bit === 0) {
      this.pos++;
      this.bit = 8;
    }
    return out;
  }
  _read(wordSize, safe = true) {
    safe && this.checkLimit(wordSize);
    let l = this.bit - wordSize, out;
    if (l >= 0) {
      this.bit = l;
      out = this.buffer[this.pos] >>> l & (1 << wordSize) - 1;
      if (l === 0) {
        this.pos++;
        this.bit = 8;
      }
    } else {
      out = (this.buffer[this.pos++] & (1 << this.bit) - 1) << -l;
      this.bit = 8 + l;
      out = out | this.buffer[this.pos] >>> this.bit;
    }
    this.bitPos += wordSize;
    return out;
  }
  checkLimit(requested) {
    if (this.bitPos + requested > this.limit) {
      illegalState(`can't read past EOF`);
    }
  }
}


;// CONCATENATED MODULE: ./node_modules/qoa-format/lib/common.js
const QOA_MIN_FILESIZE = 16;
const QOA_MAX_CHANNELS = 8;

const QOA_SLICE_LEN = 20;
const QOA_SLICES_PER_FRAME = 256;
const QOA_FRAME_LEN = QOA_SLICES_PER_FRAME * QOA_SLICE_LEN;
const QOA_LMS_LEN = 4;
const QOA_MAGIC = 0x716f6166; /* 'qoaf' */
const QOA_FRAME_SIZE = (channels, slices) =>
  Math.floor(8 + QOA_LMS_LEN * 4 * channels + 8 * slices * channels);

function qoa_clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function LMS(h, w) {
  const history = new Int16Array(h || 4);
  const weights = new Int16Array(w || 4);
  return { history, weights };
}

function qoa_lms_predict(weights, history) {
  return (
    (weights[0] * history[0] +
      weights[1] * history[1] +
      weights[2] * history[2] +
      weights[3] * history[3]) >>
    13
  );
}

function qoa_lms_update(weights, history, sample, residual) {
  let delta = residual >> 4;
  weights[0] += history[0] < 0 ? -delta : delta;
  weights[1] += history[1] < 0 ? -delta : delta;
  weights[2] += history[2] < 0 ? -delta : delta;
  weights[3] += history[3] < 0 ? -delta : delta;
  history[0] = history[1];
  history[1] = history[2];
  history[2] = history[3];
  history[3] = sample;
}

const qoa_round = (num) => Math.sign(num) * Math.round(Math.abs(num));

/* We have 16 different scalefactors. Like the quantized residuals these become
less accurate at the higher end. In theory, the highest scalefactor that we
would need to encode the highest 16bit residual is (2**16)/8 = 8192. However we
rely on the LMS filter to predict samples accurately enough that a maximum 
residual of one quarter of the 16 bit range is high sufficent. I.e. with the 
scalefactor 2048 times the quant range of 8 we can encode residuals up to 2**14.

The scalefactor values are computed as:
scalefactor_tab[s] <- round(pow(s + 1, 2.75)) */

const qoa_scalefactor_tab = Array(16)
  .fill()
  .map((_, s) => qoa_round(Math.pow(s + 1, 2.75)));

/* The dequant_tab maps each of the scalefactors and quantized residuals to 
their unscaled & dequantized version.

Since qoa_div rounds away from the zero, the smallest entries are mapped to 3/4
instead of 1. The dequant_tab assumes the following dequantized values for each 
of the quant_tab indices and is computed as:
float dqt[8] = {0.75, -0.75, 2.5, -2.5, 4.5, -4.5, 7, -7};
dequant_tab[s][q] <- round(scalefactor_tab[s] * dqt[q]) */

const dqt = [0.75, -0.75, 2.5, -2.5, 4.5, -4.5, 7, -7];
const qoa_dequant_tab = qoa_scalefactor_tab.map((sf) => {
  return dqt.map((dq) => qoa_round(dq * sf));
});

;// CONCATENATED MODULE: ./node_modules/qoa-format/decode.js



function decodeHeader(stream) {
  const magic = stream.read(32);
  if (magic !== QOA_MAGIC) {
    throw new Error(`Not a QOA file; expected magic number 'qoaf'`);
  }

  // peek first frame to get audio file data
  const header = {
    samples: stream.read(32),
    channels: stream.read(8),
    sampleRate: stream.read(24),
  };

  // go back to end of header
  stream.seek(64);

  // return data
  return header;
}

function qoa_decode_frame(stream, audio, lmses, channelData, sampleOffset) {
  const channels = stream.read(8);
  const sampleRate = stream.read(24);
  const samples = stream.read(16); // frame samples
  const frameSize = stream.read(16);

  const dataSize = Math.floor(frameSize - 8 - QOA_LMS_LEN * 4 * channels);
  const numSlices = Math.floor(dataSize / 8);
  const maxTotalSamples = numSlices * QOA_SLICE_LEN;

  if (
    channels != audio.channels ||
    sampleRate != audio.sampleRate ||
    samples * channels > maxTotalSamples
  ) {
    throw new Error(`invalid frame header data`);
  }

  // decode LMS history and weights
  for (let c = 0; c < channels; c++) {
    const lms = lmses[c];
    for (let i = 0; i < QOA_LMS_LEN; i++) {
      let h = stream.read(16);
      lms.history[i] = h;
    }
    for (let i = 0; i < QOA_LMS_LEN; i++) {
      let w = stream.read(16);
      lms.weights[i] = w;
    }
  }

  for (
    let sample_index = 0;
    sample_index < samples;
    sample_index += QOA_SLICE_LEN
  ) {
    for (let c = 0; c < channels; c++) {
      const scalefactor = stream.read(4);
      const table = qoa_dequant_tab[scalefactor];
      const slice_start = sample_index;
      const slice_end = Math.min(sample_index + QOA_SLICE_LEN, samples);
      const slice_count = slice_end - slice_start;
      const lms = lmses[c];
      const sampleData = channelData[c];
      let idx = sampleOffset + slice_start;
      const weights = lms.weights;
      const history = lms.history;
      let bitsRemaining = 60;
      // note: this loop is a hot code path and could be optimized
      for (let i = 0; i < slice_count; i++) {
        const predicted = qoa_lms_predict(weights, history);
        const quantized = stream.read(3);
        const dequantized = table[quantized];
        const reconstructed = qoa_clamp(predicted + dequantized, -32768, 32767);
        const sample =
          reconstructed < 0 ? reconstructed / 32768 : reconstructed / 32767;
        sampleData[idx++] = sample;
        qoa_lms_update(weights, history, reconstructed, dequantized);
        bitsRemaining -= 3;
      }
      // skip stream if needed
      if (bitsRemaining > 0) {
        stream.read(bitsRemaining);
      }
    }
  }

  return samples;
}

function decode(data) {
  if (data.byteLength < QOA_MIN_FILESIZE) {
    throw new Error(`QOA file size must be >= ${QOA_MIN_FILESIZE}`);
  }

  const stream = new BitInputStream(data);
  const audio = decodeHeader(stream);

  const channelData = [];
  const lmses = [];
  for (let c = 0; c < audio.channels; c++) {
    const d = new Float32Array(audio.samples);
    channelData.push(d);
    lmses.push(LMS());
  }

  let sampleIndex = 0;
  let frameLen = 0;
  do {
    frameLen = qoa_decode_frame(stream, audio, lmses, channelData, sampleIndex);
    sampleIndex += frameLen;
  } while (frameLen && sampleIndex < audio.samples);

  return {
    ...audio,
    channelData,
  };
}

;// CONCATENATED MODULE: ./node_modules/@thi.ng/bitstream/output.js


const DEFAULT_BUF_SIZE = 16;
const output_U32 = 4294967296;
class BitOutputStream {
  buffer;
  start;
  pos;
  bit;
  bitPos;
  constructor(buffer, offset = 0) {
    this.buffer = typeof buffer === "undefined" ? new Uint8Array(DEFAULT_BUF_SIZE) : typeof buffer === "number" ? new Uint8Array(buffer) : buffer;
    this.start = offset;
    this.seek(offset);
    this.buffer[this.pos] &= ~((1 << this.bit) - 1);
  }
  get position() {
    return this.bitPos;
  }
  seek(pos) {
    if (pos < this.start || pos >= this.buffer.length << 3) {
      illegalArgs(`seek pos out of bounds: ${pos}`);
    }
    this.pos = pos >>> 3;
    this.bit = 8 - (pos & 7);
    this.bitPos = pos;
    return this;
  }
  bytes() {
    return this.buffer.slice(0, this.pos + (this.bit & 7 ? 1 : 0));
  }
  reader(from = 0) {
    return new BitInputStream(this.buffer, from, this.position);
  }
  write(x, wordSize = 1) {
    if (wordSize > 32) {
      let hi = Math.floor(x / output_U32);
      this.write(hi, wordSize - 32);
      this.write(x - hi * output_U32, 32);
    } else if (wordSize > 8) {
      let n = wordSize & -8;
      let msb = wordSize - n;
      if (msb > 0) {
        this._write(x >>> n, msb);
      }
      n -= 8;
      while (n >= 0) {
        this._write(x >>> n, 8);
        n -= 8;
      }
    } else {
      this._write(x, wordSize);
    }
    return this;
  }
  writeWords(input, wordSize = 8) {
    let iter = input[Symbol.iterator]();
    let v;
    while (v = iter.next(), !v.done) {
      this.write(v.value, wordSize);
    }
  }
  writeBit(x) {
    this.bit--;
    this.buffer[this.pos] = this.buffer[this.pos] & ~(1 << this.bit) | x << this.bit;
    if (this.bit === 0) {
      this.ensureSize();
      this.bit = 8;
    }
    this.bitPos++;
    return this;
  }
  _write(x, wordSize) {
    x &= (1 << wordSize) - 1;
    let buf = this.buffer;
    let pos = this.pos;
    let bit = this.bit;
    let b = bit - wordSize;
    let m = bit < 8 ? ~((1 << bit) - 1) : 0;
    if (b >= 0) {
      m |= (1 << b) - 1;
      buf[pos] = buf[pos] & m | x << b & ~m;
      if (b === 0) {
        this.ensureSize();
        this.bit = 8;
      } else {
        this.bit = b;
      }
    } else {
      this.bit = bit = 8 + b;
      buf[pos] = buf[pos] & m | x >>> -b & ~m;
      this.ensureSize();
      this.buffer[this.pos] = this.buffer[this.pos] & (1 << bit) - 1 | x << bit & 255;
    }
    this.bitPos += wordSize;
    return this;
  }
  ensureSize() {
    if (++this.pos === this.buffer.length) {
      let b = new Uint8Array(this.buffer.length << 1);
      b.set(this.buffer);
      this.buffer = b;
    }
  }
}


;// CONCATENATED MODULE: ./node_modules/qoa-format/encode.js



/* The reciprocal_tab maps each of the 16 scalefactors to their rounded 
reciprocals 1/scalefactor. This allows us to calculate the scaled residuals in 
the encoder with just one multiplication instead of an expensive division. We 
do this in .16 fixed point with integers, instead of floats.

The reciprocal_tab is computed as:
reciprocal_tab[s] <- ((1<<16) + scalefactor_tab[s] - 1) / scalefactor_tab[s] */

const qoa_reciprocal_tab = qoa_scalefactor_tab.map((s) =>
  Math.floor(((1 << 16) + s - 1) / s)
);

/* The quant_tab provides an index into the dequant_tab for residuals in the
range of -8 .. 8. It maps this range to just 3bits and becommes less accurate at 
the higher end. Note that the residual zero is identical to the lowest positive 
value. This is mostly fine, since the qoa_div() function always rounds away 
from zero. */

const qoa_quant_tab = [
  // -8..-1
  7, 7, 7, 5, 5, 3, 3, 1,
  // 0
  0,
  //  1.. 8
  0, 2, 2, 4, 4, 6, 6, 6,
];

/* qoa_div() implements a rounding division, but avoids rounding to zero for 
small numbers. E.g. 0.1 will be rounded to 1. Note that 0 itself still 
returns as 0, which is handled in the qoa_quant_tab[].
qoa_div() takes an index into the .16 fixed point qoa_reciprocal_tab as an
argument, so it can do the division with a cheaper integer multiplication. */

function qoa_div(v, scalefactor) {
  const reciprocal = qoa_reciprocal_tab[scalefactor];
  let n = (v * reciprocal + (1 << 15)) >> 16;
  n = n + ((v > 0) - (v < 0)) - ((n > 0) - (n < 0)); /* round away from 0 */
  return n;
}

function qoa_encode_frame(stream, audio, lmses, sample_offset, frame_len) {
  const channels = audio.channels;
  const sampleRate = audio.sampleRate;
  const channelData = audio.channelData;
  const samples = audio.samples;

  const slices = Math.floor((frame_len + QOA_SLICE_LEN - 1) / QOA_SLICE_LEN);
  const frame_size = QOA_FRAME_SIZE(channels, slices);

  // Frame header
  stream.write(channels, 8);
  stream.write(sampleRate, 24);
  stream.write(frame_len, 16); // frame samples
  stream.write(frame_size, 16);

  // write current LMS weights and history state
  for (let c = 0; c < channels; c++) {
    const lms = lmses[c];

    /* If the weights have grown too large, reset them to 0. This may happen
		with certain high-frequency sounds. This is a last resort and will 
		introduce quite a bit of noise, but should at least prevent pops/clicks */
    const weights_sum =
      lms.weights[0] * lms.weights[0] +
      lms.weights[1] * lms.weights[1] +
      lms.weights[2] * lms.weights[2] +
      lms.weights[3] * lms.weights[3];
    if (weights_sum > 0x2fffffff) {
      lms.weights[0] = 0;
      lms.weights[1] = 0;
      lms.weights[2] = 0;
      lms.weights[3] = 0;
    }

    for (let i = 0; i < QOA_LMS_LEN; i++) {
      stream.write(lms.history[i], 16);
    }
    for (let i = 0; i < QOA_LMS_LEN; i++) {
      stream.write(lms.weights[i], 16);
    }
  }

  /* We encode all samples with the channels interleaved on a slice level.
	E.g. for stereo: (ch-0, slice 0), (ch 1, slice 0), (ch 0, slice 1), ...*/
  for (
    let sample_index = 0;
    sample_index < frame_len;
    sample_index += QOA_SLICE_LEN
  ) {
    for (let c = 0; c < channels; c++) {
      const slice_len = qoa_clamp(QOA_SLICE_LEN, 0, frame_len - sample_index);
      const slice_start = sample_index;

      /* Brute for search for the best scalefactor. Just go through all
			16 scalefactors, encode all samples for the current slice and 
			meassure the total squared error. */
      let best_error = Number.MAX_SAFE_INTEGER;
      let best_slice;
      let best_slice_scalefactor;
      let best_lms;
      const sampleData = channelData[c];

      for (let scalefactor = 0; scalefactor < 16; scalefactor++) {
        /* We have to reset the LMS state to the last known good one
				before trying each scalefactor, as each pass updates the LMS
				state when encoding. */
        let lms = LMS(lmses[c].history, lmses[c].weights);

        const table = qoa_dequant_tab[scalefactor];

        // an array of slice data
        let slice = [];
        let current_error = 0;
        let idx = slice_start + sample_offset;

        for (let i = 0; i < slice_len; i++) {
          let sample = sampleData[idx++];

          // turn into 16 bit signed integer
          sample = Math.floor(
            Math.fround(sample < 0 ? sample * 32768 : sample * 32767)
          );
          sample = qoa_clamp(sample, -32768, 32767);

          let predicted = qoa_lms_predict(lms.weights, lms.history);
          let residual = sample - predicted;
          let scaled = qoa_div(residual, scalefactor);
          let clamped = qoa_clamp(scaled, -8, 8);
          let quantized = qoa_quant_tab[clamped + 8];
          let dequantized = table[quantized];
          let reconstructed = qoa_clamp(predicted + dequantized, -32768, 32767);
          let error = sample - reconstructed;
          current_error += error * error;
          if (current_error > best_error) {
            break;
          }

          qoa_lms_update(lms.weights, lms.history, reconstructed, dequantized);
          slice.push(quantized);
        }

        if (current_error < best_error) {
          best_error = current_error;
          best_slice = slice;
          best_slice_scalefactor = scalefactor;
          best_lms = lms;
        }
      }

      lmses[c] = best_lms;
      // first, write the 4bit scalefactor
      stream.write(best_slice_scalefactor, 4);
      // now write each 3bit datum in the slice
      for (let i = 0; i < QOA_SLICE_LEN; i++) {
        // the last frame of a file might be smaller than QOA_SLICE_LEN
        const v = i < best_slice.length ? best_slice[i] : 0;
        stream.write(v, 3);
      }
    }
  }
}

function encode({ channelData, sampleRate = 44100 } = {}) {
  const channels = channelData.length;
  const samples = channels >= 1 ? channelData[0].length : 0;
  const audio = {
    samples,
    channels,
    channelData,
    sampleRate,
  };

  const num_frames = (samples + QOA_FRAME_LEN - 1) / QOA_FRAME_LEN;
  const num_slices = (samples + QOA_SLICE_LEN - 1) / QOA_SLICE_LEN;
  const encoded_size =
    8 /* 8 byte file header */ +
    num_frames * 8 /* 8 byte frame headers */ +
    num_frames *
      QOA_LMS_LEN *
      4 *
      audio.channels /* 4 * 4 bytes lms state per channel */ +
    num_slices * 8 * audio.channels; /* 8 byte slices */

  const lmses = [];
  for (let c = 0; c < audio.channels; c++) {
    const lms = LMS();
    lms.weights[0] = 0;
    lms.weights[1] = 0;
    lms.weights[2] = -(1 << 13);
    lms.weights[3] = 1 << 14;
    lmses.push(lms);
  }

  // write header
  const stream = new BitOutputStream(encoded_size);
  stream.write(QOA_MAGIC, 32);
  stream.write(samples, 32);

  let frame_len = QOA_FRAME_LEN;
  for (
    let sample_index = 0;
    sample_index < samples;
    sample_index += frame_len
  ) {
    frame_len = qoa_clamp(QOA_FRAME_LEN, 0, samples - sample_index);
    qoa_encode_frame(stream, audio, lmses, sample_index, frame_len);
  }

  return stream.bytes();
}

;// CONCATENATED MODULE: ./node_modules/qoa-format/index.js






/***/ })

};
