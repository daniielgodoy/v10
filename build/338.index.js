export const id = 338;
export const ids = [338];
export const modules = {

/***/ 54338:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fp: () => (/* binding */ codec_parser_absoluteGranulePosition),
  aR: () => (/* binding */ codec_parser_channelMappingTable),
  BM: () => (/* binding */ codec_parser_channels),
  HQ: () => (/* binding */ codec_parser_codecFrames),
  Gr: () => (/* binding */ codec_parser_coupledStreamCount),
  p: () => (/* binding */ codec_parser_data),
  Ay: () => (/* binding */ codec_parser),
  wx: () => (/* binding */ codec_parser_header),
  we: () => (/* binding */ codec_parser_isLastPage),
  r5: () => (/* binding */ codec_parser_preSkip),
  U9: () => (/* binding */ codec_parser_streamCount),
  GA: () => (/* binding */ codec_parser_totalSamples),
  Er: () => (/* binding */ codec_parser_vorbisComments),
  $: () => (/* binding */ codec_parser_vorbisSetup)
});

// UNUSED EXPORTS: bandwidth, bitDepth, bitrate, bitrateMaximum, bitrateMinimum, bitrateNominal, blockSize, blockingStrategy, blocksize0, blocksize1, buffer, bufferFullness, channelMappingFamily, channelMode, codec, copyrightId, copyrightIdStart, crc, crc16, crc32, description, duration, emphasis, frame, frameCount, frameLength, frameNumber, framePadding, frameSize, hasOpusPadding, inputSampleRate, isContinuedPacket, isCopyrighted, isFirstPage, isHome, isOriginal, isPrivate, isVbr, layer, length, mode, modeExtension, mpeg, mpegVersion, numberAACFrames, outputGain, pageChecksum, pageSegmentTable, pageSequenceNumber, profile, protection, rawData, sampleNumber, sampleRate, samples, segments, streamInfo, streamSerialNumber, streamStructureVersion, subarray, totalBytesOut, totalDuration, version, vorbis

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/constants.js
const symbol = Symbol;

// prettier-ignore
/*
[
  [
    "left, right",
    "left, right, center",
    "left, center, right",
    "center, left, right",
    "center"
  ],
  [
    "front left, front right",
    "front left, front right, front center",
    "front left, front center, front right",
    "front center, front left, front right",
    "front center"
  ],
  [
    "side left, side right",
    "side left, side right, side center",
    "side left, side center, side right",
    "side center, side left, side right",
    "side center"
  ],
  [
    "rear left, rear right",
    "rear left, rear right, rear center",
    "rear left, rear center, rear right",
    "rear center, rear left, rear right",
    "rear center"
  ]
]
*/

const mappingJoin = ", ";

const channelMappings = (() => {
  const front = "front";
  const side = "side";
  const rear = "rear";
  const left = "left";
  const center = "center";
  const right = "right";

  return ["", front + " ", side + " ", rear + " "].map((x) =>
    [
      [left, right],
      [left, right, center],
      [left, center, right],
      [center, left, right],
      [center],
    ].flatMap((y) => y.map((z) => x + z).join(mappingJoin)),
  );
})();

const lfe = "LFE";
const monophonic = "monophonic (mono)";
const stereo = "stereo";
const surround = "surround";

const getChannelMapping = (channelCount, ...mappings) =>
  `${
    [
      monophonic,
      stereo,
      `linear ${surround}`,
      "quadraphonic",
      `5.0 ${surround}`,
      `5.1 ${surround}`,
      `6.1 ${surround}`,
      `7.1 ${surround}`,
    ][channelCount - 1]
  } (${mappings.join(mappingJoin)})`;

// prettier-ignore
const vorbisOpusChannelMapping = [
  monophonic,
  getChannelMapping(2,channelMappings[0][0]),
  getChannelMapping(3,channelMappings[0][2]),
  getChannelMapping(4,channelMappings[1][0],channelMappings[3][0]),
  getChannelMapping(5,channelMappings[1][2],channelMappings[3][0]),
  getChannelMapping(6,channelMappings[1][2],channelMappings[3][0],lfe),
  getChannelMapping(7,channelMappings[1][2],channelMappings[2][0],channelMappings[3][4],lfe),
  getChannelMapping(8,channelMappings[1][2],channelMappings[2][0],channelMappings[3][0],lfe),
]

// sampleRates
const rate192000 = 192000;
const rate176400 = 176400;
const rate96000 = 96000;
const rate88200 = 88200;
const rate64000 = 64000;
const rate48000 = 48000;
const rate44100 = 44100;
const rate32000 = 32000;
const rate24000 = 24000;
const rate22050 = 22050;
const rate16000 = 16000;
const rate12000 = 12000;
const rate11025 = 11025;
const rate8000 = 8000;
const rate7350 = 7350;

// header key constants
const absoluteGranulePosition = "absoluteGranulePosition";
const bandwidth = "bandwidth";
const bitDepth = "bitDepth";
const bitrate = "bitrate";
const bitrateMaximum = bitrate + "Maximum";
const bitrateMinimum = bitrate + "Minimum";
const bitrateNominal = bitrate + "Nominal";
const buffer = "buffer";
const bufferFullness = buffer + "Fullness";
const codec = "codec";
const codecFrames = codec + "Frames";
const coupledStreamCount = "coupledStreamCount";
const crc = "crc";
const crc16 = crc + "16";
const crc32 = crc + "32";
const data = "data";
const description = "description";
const duration = "duration";
const emphasis = "emphasis";
const hasOpusPadding = "hasOpusPadding";
const header = "header";
const isContinuedPacket = "isContinuedPacket";
const isCopyrighted = "isCopyrighted";
const isFirstPage = "isFirstPage";
const isHome = "isHome";
const isLastPage = "isLastPage";
const isOriginal = "isOriginal";
const isPrivate = "isPrivate";
const isVbr = "isVbr";
const constants_layer = "layer";
const constants_length = "length";
const mode = "mode";
const modeExtension = mode + "Extension";
const mpeg = "mpeg";
const mpegVersion = mpeg + "Version";
const numberAACFrames = "numberAAC" + "Frames";
const outputGain = "outputGain";
const preSkip = "preSkip";
const profile = "profile";
const profileBits = symbol();
const protection = "protection";
const rawData = "rawData";
const segments = "segments";
const subarray = "subarray";
const version = "version";
const vorbis = "vorbis";
const vorbisComments = vorbis + "Comments";
const vorbisSetup = vorbis + "Setup";

const block = "block";
const blockingStrategy = block + "ingStrategy";
const blockingStrategyBits = symbol();
const blockSize = block + "Size";
const blocksize0 = block + "size0";
const blocksize1 = block + "size1";
const blockSizeBits = symbol();

const channel = "channel";
const channelMappingFamily = channel + "MappingFamily";
const channelMappingTable = channel + "MappingTable";
const channelMode = channel + "Mode";
const channelModeBits = symbol();
const channels = channel + "s";

const copyright = "copyright";
const copyrightId = copyright + "Id";
const copyrightIdStart = copyright + "IdStart";

const constants_frame = "frame";
const frameCount = constants_frame + "Count";
const frameLength = constants_frame + "Length";

const constants_Number = "Number";
const frameNumber = constants_frame + constants_Number;
const framePadding = constants_frame + "Padding";
const frameSize = constants_frame + "Size";

const Rate = "Rate";
const inputSampleRate = "inputSample" + Rate;

const page = "page";
const pageChecksum = page + "Checksum";
const pageSegmentBytes = symbol();
const pageSegmentTable = page + "SegmentTable";
const pageSequenceNumber = page + "Sequence" + constants_Number;

const sample = "sample";
const sampleNumber = sample + constants_Number;
const sampleRate = sample + Rate;
const sampleRateBits = symbol();
const samples = sample + "s";

const stream = "stream";
const streamCount = stream + "Count";
const streamInfo = stream + "Info";
const streamSerialNumber = stream + "Serial" + constants_Number;
const streamStructureVersion = stream + "StructureVersion";

const total = "total";
const totalBytesOut = total + "BytesOut";
const totalDuration = total + "Duration";
const totalSamples = total + "Samples";

// private methods
const readRawData = symbol();
const incrementRawData = symbol();
const mapCodecFrameStats = symbol();
const mapFrameStats = symbol();
const logWarning = symbol();
const constants_logError = symbol();
const syncFrame = symbol();
const fixedLengthFrameSync = symbol();
const getHeader = symbol();
const setHeader = symbol();
const getFrame = symbol();
const parseFrame = symbol();
const parseOggPage = symbol();
const checkCodecUpdate = symbol();
const constants_reset = symbol();
const enable = symbol();
const getHeaderFromUint8Array = symbol();
const checkFrameFooterCrc16 = symbol();

const uint8Array = Uint8Array;
const dataView = DataView;

const reserved = "reserved";
const bad = "bad";
const free = "free";
const none = "none";
const sixteenBitCRC = "16bit CRC";

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/utilities.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



const getCrcTable = (crcTable, crcInitialValueFunction, crcFunction) => {
  for (let byte = 0; byte < crcTable[constants_length]; byte++) {
    let crc = crcInitialValueFunction(byte);

    for (let bit = 8; bit > 0; bit--) crc = crcFunction(crc);

    crcTable[byte] = crc;
  }
  return crcTable;
};

const crc8Table = getCrcTable(
  new uint8Array(256),
  (b) => b,
  (crc) => (crc & 0x80 ? 0x07 ^ (crc << 1) : crc << 1),
);

const flacCrc16Table = [
  getCrcTable(
    new Uint16Array(256),
    (b) => b << 8,
    (crc) => (crc << 1) ^ (crc & (1 << 15) ? 0x8005 : 0),
  ),
];

const crc32Table = [
  getCrcTable(
    new Uint32Array(256),
    (b) => b,
    (crc) => (crc >>> 1) ^ ((crc & 1) * 0xedb88320),
  ),
];

// build crc tables
for (let i = 0; i < 15; i++) {
  flacCrc16Table.push(new Uint16Array(256));
  crc32Table.push(new Uint32Array(256));

  for (let j = 0; j <= 0xff; j++) {
    flacCrc16Table[i + 1][j] =
      flacCrc16Table[0][flacCrc16Table[i][j] >>> 8] ^
      (flacCrc16Table[i][j] << 8);

    crc32Table[i + 1][j] =
      (crc32Table[i][j] >>> 8) ^ crc32Table[0][crc32Table[i][j] & 0xff];
  }
}

const crc8 = (data) => {
  let crc = 0;
  const dataLength = data[constants_length];

  for (let i = 0; i !== dataLength; i++) crc = crc8Table[crc ^ data[i]];

  return crc;
};

const flacCrc16 = (data) => {
  const dataLength = data[constants_length];
  const crcChunkSize = dataLength - 16;
  let crc = 0;
  let i = 0;

  while (i <= crcChunkSize) {
    crc ^= (data[i++] << 8) | data[i++];
    crc =
      flacCrc16Table[15][crc >> 8] ^
      flacCrc16Table[14][crc & 0xff] ^
      flacCrc16Table[13][data[i++]] ^
      flacCrc16Table[12][data[i++]] ^
      flacCrc16Table[11][data[i++]] ^
      flacCrc16Table[10][data[i++]] ^
      flacCrc16Table[9][data[i++]] ^
      flacCrc16Table[8][data[i++]] ^
      flacCrc16Table[7][data[i++]] ^
      flacCrc16Table[6][data[i++]] ^
      flacCrc16Table[5][data[i++]] ^
      flacCrc16Table[4][data[i++]] ^
      flacCrc16Table[3][data[i++]] ^
      flacCrc16Table[2][data[i++]] ^
      flacCrc16Table[1][data[i++]] ^
      flacCrc16Table[0][data[i++]];
  }

  while (i !== dataLength)
    crc = ((crc & 0xff) << 8) ^ flacCrc16Table[0][(crc >> 8) ^ data[i++]];

  return crc;
};

const crc32Function = (data) => {
  const dataLength = data[constants_length];
  const crcChunkSize = dataLength - 16;
  let crc = 0;
  let i = 0;

  while (i <= crcChunkSize)
    crc =
      crc32Table[15][(data[i++] ^ crc) & 0xff] ^
      crc32Table[14][(data[i++] ^ (crc >>> 8)) & 0xff] ^
      crc32Table[13][(data[i++] ^ (crc >>> 16)) & 0xff] ^
      crc32Table[12][data[i++] ^ (crc >>> 24)] ^
      crc32Table[11][data[i++]] ^
      crc32Table[10][data[i++]] ^
      crc32Table[9][data[i++]] ^
      crc32Table[8][data[i++]] ^
      crc32Table[7][data[i++]] ^
      crc32Table[6][data[i++]] ^
      crc32Table[5][data[i++]] ^
      crc32Table[4][data[i++]] ^
      crc32Table[3][data[i++]] ^
      crc32Table[2][data[i++]] ^
      crc32Table[1][data[i++]] ^
      crc32Table[0][data[i++]];

  while (i !== dataLength)
    crc = crc32Table[0][(crc ^ data[i++]) & 0xff] ^ (crc >>> 8);

  return crc ^ -1;
};

const concatBuffers = (...buffers) => {
  const buffer = new uint8Array(
    buffers.reduce((acc, buf) => acc + buf[constants_length], 0),
  );

  buffers.reduce((offset, buf) => {
    buffer.set(buf, offset);
    return offset + buf[constants_length];
  }, 0);

  return buffer;
};

const bytesToString = (bytes) => String.fromCharCode(...bytes);

// prettier-ignore
const reverseTable = [0x0,0x8,0x4,0xc,0x2,0xa,0x6,0xe,0x1,0x9,0x5,0xd,0x3,0xb,0x7,0xf];
const reverse = (val) =>
  (reverseTable[val & 0b1111] << 4) | reverseTable[val >> 4];

class BitReader {
  constructor(data) {
    this._data = data;
    this._pos = data[constants_length] * 8;
  }

  set position(position) {
    this._pos = position;
  }

  get position() {
    return this._pos;
  }

  read(bits) {
    const byte = Math.floor(this._pos / 8);
    const bit = this._pos % 8;
    this._pos -= bits;

    const window =
      (reverse(this._data[byte - 1]) << 8) + reverse(this._data[byte]);

    return (window >> (7 - bit)) & 0xff;
  }
}

/**
 * @todo Old versions of Safari do not support BigInt
 */
const readInt64le = (view, offset) => {
  try {
    return view.getBigInt64(offset, true);
  } catch {
    const sign = view.getUint8(offset + 7) & 0x80 ? -1 : 1;
    let firstPart = view.getUint32(offset, true);
    let secondPart = view.getUint32(offset + 4, true);

    if (sign === -1) {
      firstPart = ~firstPart + 1;
      secondPart = ~secondPart + 1;
    }

    if (secondPart > 0x000fffff) {
      console.warn("This platform does not support BigInt");
    }

    return sign * (firstPart + secondPart * 2 ** 32);
  }
};



;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/HeaderCache.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class HeaderCache {
  constructor(onCodecHeader, onCodecUpdate) {
    this._onCodecHeader = onCodecHeader;
    this._onCodecUpdate = onCodecUpdate;
    this[constants_reset]();
  }

  [enable]() {
    this._isEnabled = true;
  }

  [constants_reset]() {
    this._headerCache = new Map();
    this._codecUpdateData = new WeakMap();
    this._codecHeaderSent = false;
    this._codecShouldUpdate = false;
    this._bitrate = null;
    this._isEnabled = false;
  }

  [checkCodecUpdate](bitrate, totalDuration) {
    if (this._onCodecUpdate) {
      if (this._bitrate !== bitrate) {
        this._bitrate = bitrate;
        this._codecShouldUpdate = true;
      }

      // only update if codec data is available
      const codecData = this._codecUpdateData.get(
        this._headerCache.get(this._currentHeader),
      );

      if (this._codecShouldUpdate && codecData) {
        this._onCodecUpdate(
          {
            bitrate,
            ...codecData,
          },
          totalDuration,
        );
      }

      this._codecShouldUpdate = false;
    }
  }

  [getHeader](key) {
    const header = this._headerCache.get(key);

    if (header) {
      this._updateCurrentHeader(key);
    }

    return header;
  }

  [setHeader](key, header, codecUpdateFields) {
    if (this._isEnabled) {
      if (!this._codecHeaderSent) {
        this._onCodecHeader({ ...header });
        this._codecHeaderSent = true;
      }
      this._updateCurrentHeader(key);

      this._headerCache.set(key, header);
      this._codecUpdateData.set(header, codecUpdateFields);
    }
  }

  _updateCurrentHeader(key) {
    if (this._onCodecUpdate && key !== this._currentHeader) {
      this._codecShouldUpdate = true;
      this._currentHeader = key;
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/globals.js
const headerStore = new WeakMap();
const frameStore = new WeakMap();

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/Parser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




/**
 * @abstract
 * @description Abstract class containing methods for parsing codec frames
 */
class Parser {
  constructor(codecParser, headerCache) {
    this._codecParser = codecParser;
    this._headerCache = headerCache;
  }

  *[syncFrame]() {
    let frameData;

    do {
      frameData = yield* this.Frame[getFrame](
        this._codecParser,
        this._headerCache,
        0,
      );
      if (frameData) return frameData;
      this._codecParser[incrementRawData](1); // increment to continue syncing
    } while (true);
  }

  /**
   * @description Searches for Frames within bytes containing a sequence of known codec frames.
   * @param {boolean} ignoreNextFrame Set to true to return frames even if the next frame may not exist at the expected location
   * @returns {Frame}
   */
  *[fixedLengthFrameSync](ignoreNextFrame) {
    let frameData = yield* this[syncFrame]();
    const frameLength = frameStore.get(frameData)[constants_length];

    if (
      ignoreNextFrame ||
      this._codecParser._flushing ||
      // check if there is a frame right after this one
      (yield* this.Header[getHeader](
        this._codecParser,
        this._headerCache,
        frameLength,
      ))
    ) {
      this._headerCache[enable](); // start caching when synced

      this._codecParser[incrementRawData](frameLength); // increment to the next frame
      this._codecParser[mapFrameStats](frameData);
      return frameData;
    }

    this._codecParser[logWarning](
      `Missing ${constants_frame} at ${frameLength} bytes from current position.`,
      `Dropping current ${constants_frame} and trying again.`,
    );
    this._headerCache[constants_reset](); // frame is invalid and must re-sync and clear cache
    this._codecParser[incrementRawData](1); // increment to invalidate the current frame
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/containers/Frame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




/**
 * @abstract
 */
class Frame {
  constructor(headerValue, dataValue) {
    frameStore.set(this, { [header]: headerValue });

    this[data] = dataValue;
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/CodecFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/





class CodecFrame extends Frame {
  static *[getFrame](Header, Frame, codecParser, headerCache, readOffset) {
    const headerValue = yield* Header[getHeader](
      codecParser,
      headerCache,
      readOffset,
    );

    if (headerValue) {
      const frameLengthValue = headerStore.get(headerValue)[frameLength];
      const samplesValue = headerStore.get(headerValue)[samples];

      const frame = (yield* codecParser[readRawData](
        frameLengthValue,
        readOffset,
      ))[subarray](0, frameLengthValue);

      return new Frame(headerValue, frame, samplesValue);
    } else {
      return null;
    }
  }

  constructor(headerValue, dataValue, samplesValue) {
    super(headerValue, dataValue);

    this[header] = headerValue;
    this[samples] = samplesValue;
    this[duration] = (samplesValue / headerValue[sampleRate]) * 1000;
    this[frameNumber] = null;
    this[totalBytesOut] = null;
    this[totalSamples] = null;
    this[totalDuration] = null;

    frameStore.get(this)[constants_length] = dataValue[constants_length];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/metadata/ID3v2.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

// https://id3.org/Developer%20Information



const unsynchronizationFlag = "unsynchronizationFlag";
const extendedHeaderFlag = "extendedHeaderFlag";
const experimentalFlag = "experimentalFlag";
const footerPresent = "footerPresent";

class ID3v2 {
  static *getID3v2Header(codecParser, headerCache, readOffset) {
    const headerLength = 10;
    const header = {};

    let data = yield* codecParser[readRawData](3, readOffset);
    // Byte (0-2 of 9)
    // ID3
    if (data[0] !== 0x49 || data[1] !== 0x44 || data[2] !== 0x33) return null;

    data = yield* codecParser[readRawData](headerLength, readOffset);

    // Byte (3-4 of 9)
    // * `BBBBBBBB|........`: Major version
    // * `........|BBBBBBBB`: Minor version
    header[version] = `id3v2.${data[3]}.${data[4]}`;

    // Byte (5 of 9)
    // * `....0000.: Zeros (flags not implemented yet)
    if (data[5] & 0b00001111) return null;

    // Byte (5 of 9)
    // * `CDEF0000`: Flags
    // * `C.......`: Unsynchronisation (indicates whether or not unsynchronisation is used)
    // * `.D......`: Extended header (indicates whether or not the header is followed by an extended header)
    // * `..E.....`: Experimental indicator (indicates whether or not the tag is in an experimental stage)
    // * `...F....`: Footer present (indicates that a footer is present at the very end of the tag)
    header[unsynchronizationFlag] = !!(data[5] & 0b10000000);
    header[extendedHeaderFlag] = !!(data[5] & 0b01000000);
    header[experimentalFlag] = !!(data[5] & 0b00100000);
    header[footerPresent] = !!(data[5] & 0b00010000);

    // Byte (6-9 of 9)
    // * `0.......|0.......|0.......|0.......`: Zeros
    if (
      data[6] & 0b10000000 ||
      data[7] & 0b10000000 ||
      data[8] & 0b10000000 ||
      data[9] & 0b10000000
    )
      return null;

    // Byte (6-9 of 9)
    // * `.FFFFFFF|.FFFFFFF|.FFFFFFF|.FFFFFFF`: Tag Length
    // The ID3v2 tag size is encoded with four bytes where the most significant bit (bit 7)
    // is set to zero in every byte, making a total of 28 bits. The zeroed bits are ignored,
    // so a 257 bytes long tag is represented as $00 00 02 01.
    const dataLength =
      (data[6] << 21) | (data[7] << 14) | (data[8] << 7) | data[9];

    header[constants_length] = headerLength + dataLength;

    return new ID3v2(header);
  }

  constructor(header) {
    this[version] = header[version];
    this[unsynchronizationFlag] = header[unsynchronizationFlag];
    this[extendedHeaderFlag] = header[extendedHeaderFlag];
    this[experimentalFlag] = header[experimentalFlag];
    this[footerPresent] = header[footerPresent];
    this[constants_length] = header[constants_length];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/CodecHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/




class CodecHeader {
  /**
   * @private
   */
  constructor(header) {
    headerStore.set(this, header);

    this[bitDepth] = header[bitDepth];
    this[bitrate] = null; // set during frame mapping
    this[channels] = header[channels];
    this[channelMode] = header[channelMode];
    this[sampleRate] = header[sampleRate];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/mpeg/MPEGHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







// http://www.mp3-tech.org/programmer/frame_header.html

const bitrateMatrix = {
  // bits | V1,L1 | V1,L2 | V1,L3 | V2,L1 | V2,L2 & L3
  0b00000000: [free, free, free, free, free],
  0b00010000: [32, 32, 32, 32, 8],
  // 0b00100000: [64,   48,  40,  48,  16,],
  // 0b00110000: [96,   56,  48,  56,  24,],
  // 0b01000000: [128,  64,  56,  64,  32,],
  // 0b01010000: [160,  80,  64,  80,  40,],
  // 0b01100000: [192,  96,  80,  96,  48,],
  // 0b01110000: [224, 112,  96, 112,  56,],
  // 0b10000000: [256, 128, 112, 128,  64,],
  // 0b10010000: [288, 160, 128, 144,  80,],
  // 0b10100000: [320, 192, 160, 160,  96,],
  // 0b10110000: [352, 224, 192, 176, 112,],
  // 0b11000000: [384, 256, 224, 192, 128,],
  // 0b11010000: [416, 320, 256, 224, 144,],
  // 0b11100000: [448, 384, 320, 256, 160,],
  0b11110000: [bad, bad, bad, bad, bad],
};

const calcBitrate = (idx, interval, intervalOffset) =>
  8 *
    (((idx + intervalOffset) % interval) + interval) *
    (1 << ((idx + intervalOffset) / interval)) -
  8 * interval * ((interval / 8) | 0);

// generate bitrate matrix
for (let i = 2; i < 15; i++)
  bitrateMatrix[i << 4] = [
    i * 32, //                V1,L1
    calcBitrate(i, 4, 0), //  V1,L2
    calcBitrate(i, 4, -1), // V1,L3
    calcBitrate(i, 8, 4), //  V2,L1
    calcBitrate(i, 8, 0), //  V2,L2 & L3
  ];

const v1Layer1 = 0;
const v1Layer2 = 1;
const v1Layer3 = 2;
const v2Layer1 = 3;
const v2Layer23 = 4;

const bands = "bands ";
const to31 = " to 31";
const layer12ModeExtensions = {
  0b00000000: bands + 4 + to31,
  0b00010000: bands + 8 + to31,
  0b00100000: bands + 12 + to31,
  0b00110000: bands + 16 + to31,
};

const bitrateIndex = "bitrateIndex";
const v2 = "v2";
const v1 = "v1";

const intensityStereo = "Intensity stereo ";
const msStereo = ", MS stereo ";
const on = "on";
const off = "off";
const layer3ModeExtensions = {
  0b00000000: intensityStereo + off + msStereo + off,
  0b00010000: intensityStereo + on + msStereo + off,
  0b00100000: intensityStereo + off + msStereo + on,
  0b00110000: intensityStereo + on + msStereo + on,
};

const layersValues = {
  0b00000000: { [description]: reserved },
  0b00000010: {
    [description]: "Layer III",
    [framePadding]: 1,
    [modeExtension]: layer3ModeExtensions,
    [v1]: {
      [bitrateIndex]: v1Layer3,
      [samples]: 1152,
    },
    [v2]: {
      [bitrateIndex]: v2Layer23,
      [samples]: 576,
    },
  },
  0b00000100: {
    [description]: "Layer II",
    [framePadding]: 1,
    [modeExtension]: layer12ModeExtensions,
    [samples]: 1152,
    [v1]: {
      [bitrateIndex]: v1Layer2,
    },
    [v2]: {
      [bitrateIndex]: v2Layer23,
    },
  },
  0b00000110: {
    [description]: "Layer I",
    [framePadding]: 4,
    [modeExtension]: layer12ModeExtensions,
    [samples]: 384,
    [v1]: {
      [bitrateIndex]: v1Layer1,
    },
    [v2]: {
      [bitrateIndex]: v2Layer1,
    },
  },
};

const mpegVersionDescription = "MPEG Version ";
const isoIec = "ISO/IEC ";
const mpegVersions = {
  0b00000000: {
    [description]: `${mpegVersionDescription}2.5 (later extension of MPEG 2)`,
    [constants_layer]: v2,
    [sampleRate]: {
      0b00000000: rate11025,
      0b00000100: rate12000,
      0b00001000: rate8000,
      0b00001100: reserved,
    },
  },
  0b00001000: { [description]: reserved },
  0b00010000: {
    [description]: `${mpegVersionDescription}2 (${isoIec}13818-3)`,
    [constants_layer]: v2,
    [sampleRate]: {
      0b00000000: rate22050,
      0b00000100: rate24000,
      0b00001000: rate16000,
      0b00001100: reserved,
    },
  },
  0b00011000: {
    [description]: `${mpegVersionDescription}1 (${isoIec}11172-3)`,
    [constants_layer]: v1,
    [sampleRate]: {
      0b00000000: rate44100,
      0b00000100: rate48000,
      0b00001000: rate32000,
      0b00001100: reserved,
    },
  },
  length: constants_length,
};

const protectionValues = {
  0b00000000: sixteenBitCRC,
  0b00000001: none,
};

const emphasisValues = {
  0b00000000: none,
  0b00000001: "50/15 ms",
  0b00000010: reserved,
  0b00000011: "CCIT J.17",
};

const channelModes = {
  0b00000000: { [channels]: 2, [description]: stereo },
  0b01000000: { [channels]: 2, [description]: "joint " + stereo },
  0b10000000: { [channels]: 2, [description]: "dual channel" },
  0b11000000: { [channels]: 1, [description]: monophonic },
};

class MPEGHeader extends CodecHeader {
  static *[getHeader](codecParser, headerCache, readOffset) {
    const header = {};

    // check for id3 header
    const id3v2Header = yield* ID3v2.getID3v2Header(
      codecParser,
      headerCache,
      readOffset,
    );

    if (id3v2Header) {
      // throw away the data. id3 parsing is not implemented yet.
      yield* codecParser[readRawData](id3v2Header[constants_length], readOffset);
      codecParser[incrementRawData](id3v2Header[constants_length]);
    }

    // Must be at least four bytes.
    const data = yield* codecParser[readRawData](4, readOffset);

    // Check header cache
    const key = bytesToString(data[subarray](0, 4));
    const cachedHeader = headerCache[getHeader](key);
    if (cachedHeader) return new MPEGHeader(cachedHeader);

    // Frame sync (all bits must be set): `11111111|111`:
    if (data[0] !== 0xff || data[1] < 0xe0) return null;

    // Byte (2 of 4)
    // * `111BBCCD`
    // * `...BB...`: MPEG Audio version ID
    // * `.....CC.`: Layer description
    // * `.......D`: Protection bit (0 - Protected by CRC (16bit CRC follows header), 1 = Not protected)

    // Mpeg version (1, 2, 2.5)
    const mpegVersionValues = mpegVersions[data[1] & 0b00011000];
    if (mpegVersionValues[description] === reserved) return null;

    // Layer (I, II, III)
    const layerBits = data[1] & 0b00000110;
    if (layersValues[layerBits][description] === reserved) return null;
    const layerValues = {
      ...layersValues[layerBits],
      ...layersValues[layerBits][mpegVersionValues[constants_layer]],
    };

    header[mpegVersion] = mpegVersionValues[description];
    header[constants_layer] = layerValues[description];
    header[samples] = layerValues[samples];
    header[protection] = protectionValues[data[1] & 0b00000001];

    header[constants_length] = 4;

    // Byte (3 of 4)
    // * `EEEEFFGH`
    // * `EEEE....`: Bitrate index. 1111 is invalid, everything else is accepted
    // * `....FF..`: Sample rate
    // * `......G.`: Padding bit, 0=frame not padded, 1=frame padded
    // * `.......H`: Private bit.
    header[bitrate] =
      bitrateMatrix[data[2] & 0b11110000][layerValues[bitrateIndex]];
    if (header[bitrate] === bad) return null;

    header[sampleRate] = mpegVersionValues[sampleRate][data[2] & 0b00001100];
    if (header[sampleRate] === reserved) return null;

    header[framePadding] = data[2] & 0b00000010 && layerValues[framePadding];
    header[isPrivate] = !!(data[2] & 0b00000001);

    header[frameLength] = Math.floor(
      (125 * header[bitrate] * header[samples]) / header[sampleRate] +
        header[framePadding],
    );
    if (!header[frameLength]) return null;

    // Byte (4 of 4)
    // * `IIJJKLMM`
    // * `II......`: Channel mode
    // * `..JJ....`: Mode extension (only if joint stereo)
    // * `....K...`: Copyright
    // * `.....L..`: Original
    // * `......MM`: Emphasis
    const channelModeBits = data[3] & 0b11000000;
    header[channelMode] = channelModes[channelModeBits][description];
    header[channels] = channelModes[channelModeBits][channels];

    header[modeExtension] = layerValues[modeExtension][data[3] & 0b00110000];
    header[isCopyrighted] = !!(data[3] & 0b00001000);
    header[isOriginal] = !!(data[3] & 0b00000100);

    header[emphasis] = emphasisValues[data[3] & 0b00000011];
    if (header[emphasis] === reserved) return null;

    header[bitDepth] = 16;

    // set header cache
    {
      const { length, frameLength, samples, ...codecUpdateFields } = header;

      headerCache[setHeader](key, header, codecUpdateFields);
    }
    return new MPEGHeader(header);
  }

  /**
   * @private
   * Call MPEGHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this[bitrate] = header[bitrate];
    this[emphasis] = header[emphasis];
    this[framePadding] = header[framePadding];
    this[isCopyrighted] = header[isCopyrighted];
    this[isOriginal] = header[isOriginal];
    this[isPrivate] = header[isPrivate];
    this[constants_layer] = header[constants_layer];
    this[modeExtension] = header[modeExtension];
    this[mpegVersion] = header[mpegVersion];
    this[protection] = header[protection];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/mpeg/MPEGFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






class MPEGFrame extends CodecFrame {
  static *[getFrame](codecParser, headerCache, readOffset) {
    return yield* super[getFrame](
      MPEGHeader,
      MPEGFrame,
      codecParser,
      headerCache,
      readOffset,
    );
  }

  constructor(header, frame, samples) {
    super(header, frame, samples);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/mpeg/MPEGParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class MPEGParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = MPEGFrame;
    this.Header = MPEGHeader;

    onCodec(this[codec]);
  }

  get [codec]() {
    return mpeg;
  }

  *[parseFrame]() {
    return yield* this[fixedLengthFrameSync]();
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/aac/AACHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://wiki.multimedia.cx/index.php/ADTS

AAAAAAAA AAAABCCD EEFFFFGH HHIJKLMM MMMMMMMM MMMOOOOO OOOOOOPP (QQQQQQQQ QQQQQQQQ)

AACHeader consists of 7 or 9 bytes (without or with CRC).
Letter  Length (bits)  Description
A  12  syncword 0xFFF, all bits must be 1
B  1   MPEG Version: 0 for MPEG-4, 1 for MPEG-2
C  2   Layer: always 0
D  1   protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
E  2   profile, the MPEG-4 Audio Object Type minus 1
F  4   MPEG-4 Sampling Frequency Index (15 is forbidden)
G  1   private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
H  3   MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
I  1   originality, set to 0 when encoding, ignore when decoding
J  1   home, set to 0 when encoding, ignore when decoding
K  1   copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
L  1   copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
M  13  frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
O  11  Buffer fullness // 0x7FF for VBR
P  2   Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
Q  16  CRC if protection absent is 0 
*/







const mpegVersionValues = {
  0b00000000: "MPEG-4",
  0b00001000: "MPEG-2",
};

const layerValues = {
  0b00000000: "valid",
  0b00000010: bad,
  0b00000100: bad,
  0b00000110: bad,
};

const AACHeader_protectionValues = {
  0b00000000: sixteenBitCRC,
  0b00000001: none,
};

const profileValues = {
  0b00000000: "AAC Main",
  0b01000000: "AAC LC (Low Complexity)",
  0b10000000: "AAC SSR (Scalable Sample Rate)",
  0b11000000: "AAC LTP (Long Term Prediction)",
};

const sampleRates = {
  0b00000000: rate96000,
  0b00000100: rate88200,
  0b00001000: rate64000,
  0b00001100: rate48000,
  0b00010000: rate44100,
  0b00010100: rate32000,
  0b00011000: rate24000,
  0b00011100: rate22050,
  0b00100000: rate16000,
  0b00100100: rate12000,
  0b00101000: rate11025,
  0b00101100: rate8000,
  0b00110000: rate7350,
  0b00110100: reserved,
  0b00111000: reserved,
  0b00111100: "frequency is written explicitly",
};

// prettier-ignore
const channelModeValues = {
  0b000000000: { [channels]: 0, [description]: "Defined in AOT Specific Config" },
  /*
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (front center, front left, front right)'
  'quadraphonic (front center, front left, front right, rear center)'
  '5.0 surround (front center, front left, front right, rear left, rear right)'
  '5.1 surround (front center, front left, front right, rear left, rear right, LFE)'
  '7.1 surround (front center, front left, front right, side left, side right, rear left, rear right, LFE)'
  */
  0b001000000: { [channels]: 1, [description]: monophonic },
  0b010000000: { [channels]: 2, [description]: getChannelMapping(2,channelMappings[0][0]) },
  0b011000000: { [channels]: 3, [description]: getChannelMapping(3,channelMappings[1][3]), },
  0b100000000: { [channels]: 4, [description]: getChannelMapping(4,channelMappings[1][3],channelMappings[3][4]), },
  0b101000000: { [channels]: 5, [description]: getChannelMapping(5,channelMappings[1][3],channelMappings[3][0]), },
  0b110000000: { [channels]: 6, [description]: getChannelMapping(6,channelMappings[1][3],channelMappings[3][0],lfe), },
  0b111000000: { [channels]: 8, [description]: getChannelMapping(8,channelMappings[1][3],channelMappings[2][0],channelMappings[3][0],lfe), },
};

class AACHeader extends CodecHeader {
  static *[getHeader](codecParser, headerCache, readOffset) {
    const header = {};

    // Must be at least seven bytes. Out of data
    const data = yield* codecParser[readRawData](7, readOffset);

    // Check header cache
    const key = bytesToString([
      data[0],
      data[1],
      data[2],
      (data[3] & 0b11111100) | (data[6] & 0b00000011), // frame length, buffer fullness varies so don't cache it
    ]);
    const cachedHeader = headerCache[getHeader](key);

    if (!cachedHeader) {
      // Frame sync (all bits must be set): `11111111|1111`:
      if (data[0] !== 0xff || data[1] < 0xf0) return null;

      // Byte (2 of 7)
      // * `1111BCCD`
      // * `....B...`: MPEG Version: 0 for MPEG-4, 1 for MPEG-2
      // * `.....CC.`: Layer: always 0
      // * `.......D`: protection absent, Warning, set to 1 if there is no CRC and 0 if there is CRC
      header[mpegVersion] = mpegVersionValues[data[1] & 0b00001000];

      header[constants_layer] = layerValues[data[1] & 0b00000110];
      if (header[constants_layer] === bad) return null;

      const protectionBit = data[1] & 0b00000001;
      header[protection] = AACHeader_protectionValues[protectionBit];
      header[constants_length] = protectionBit ? 7 : 9;

      // Byte (3 of 7)
      // * `EEFFFFGH`
      // * `EE......`: profile, the MPEG-4 Audio Object Type minus 1
      // * `..FFFF..`: MPEG-4 Sampling Frequency Index (15 is forbidden)
      // * `......G.`: private bit, guaranteed never to be used by MPEG, set to 0 when encoding, ignore when decoding
      header[profileBits] = data[2] & 0b11000000;
      header[sampleRateBits] = data[2] & 0b00111100;
      const privateBit = data[2] & 0b00000010;

      header[profile] = profileValues[header[profileBits]];

      header[sampleRate] = sampleRates[header[sampleRateBits]];
      if (header[sampleRate] === reserved) return null;

      header[isPrivate] = !!privateBit;

      // Byte (3,4 of 7)
      // * `.......H|HH......`: MPEG-4 Channel Configuration (in the case of 0, the channel configuration is sent via an inband PCE)
      header[channelModeBits] = ((data[2] << 8) | data[3]) & 0b111000000;
      header[channelMode] =
        channelModeValues[header[channelModeBits]][description];
      header[channels] = channelModeValues[header[channelModeBits]][channels];

      // Byte (4 of 7)
      // * `HHIJKLMM`
      // * `..I.....`: originality, set to 0 when encoding, ignore when decoding
      // * `...J....`: home, set to 0 when encoding, ignore when decoding
      // * `....K...`: copyrighted id bit, the next bit of a centrally registered copyright identifier, set to 0 when encoding, ignore when decoding
      // * `.....L..`: copyright id start, signals that this frame's copyright id bit is the first bit of the copyright id, set to 0 when encoding, ignore when decoding
      header[isOriginal] = !!(data[3] & 0b00100000);
      header[isHome] = !!(data[3] & 0b00001000);
      header[copyrightId] = !!(data[3] & 0b00001000);
      header[copyrightIdStart] = !!(data[3] & 0b00000100);
      header[bitDepth] = 16;
      header[samples] = 1024;

      // Byte (7 of 7)
      // * `......PP` Number of AAC frames (RDBs) in ADTS frame minus 1, for maximum compatibility always use 1 AAC frame per ADTS frame
      header[numberAACFrames] = data[6] & 0b00000011;

      {
        const {
          length,
          channelModeBits,
          profileBits,
          sampleRateBits,
          frameLength,
          samples,
          numberAACFrames,
          ...codecUpdateFields
        } = header;
        headerCache[setHeader](key, header, codecUpdateFields);
      }
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (4,5,6 of 7)
    // * `.......MM|MMMMMMMM|MMM.....`: frame length, this value must include 7 or 9 bytes of header length: FrameLength = (ProtectionAbsent == 1 ? 7 : 9) + size(AACFrame)
    header[frameLength] =
      ((data[3] << 11) | (data[4] << 3) | (data[5] >> 5)) & 0x1fff;
    if (!header[frameLength]) return null;

    // Byte (6,7 of 7)
    // * `...OOOOO|OOOOOO..`: Buffer fullness
    const bufferFullnessBits = ((data[5] << 6) | (data[6] >> 2)) & 0x7ff;
    header[bufferFullness] =
      bufferFullnessBits === 0x7ff ? "VBR" : bufferFullnessBits;

    return new AACHeader(header);
  }

  /**
   * @private
   * Call AACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this[copyrightId] = header[copyrightId];
    this[copyrightIdStart] = header[copyrightIdStart];
    this[bufferFullness] = header[bufferFullness];
    this[isHome] = header[isHome];
    this[isOriginal] = header[isOriginal];
    this[isPrivate] = header[isPrivate];
    this[constants_layer] = header[constants_layer];
    this[constants_length] = header[constants_length];
    this[mpegVersion] = header[mpegVersion];
    this[numberAACFrames] = header[numberAACFrames];
    this[profile] = header[profile];
    this[protection] = header[protection];
  }

  get audioSpecificConfig() {
    // Audio Specific Configuration
    // * `000EEFFF|F0HHH000`:
    // * `000EE...|........`: Object Type (profileBit + 1)
    // * `.....FFF|F.......`: Sample Rate
    // * `........|.0HHH...`: Channel Configuration
    // * `........|.....0..`: Frame Length (1024)
    // * `........|......0.`: does not depend on core coder
    // * `........|.......0`: Not Extension
    const header = headerStore.get(this);

    const audioSpecificConfig =
      ((header[profileBits] + 0x40) << 5) |
      (header[sampleRateBits] << 5) |
      (header[channelModeBits] >> 3);

    const bytes = new uint8Array(2);
    new dataView(bytes[buffer]).setUint16(0, audioSpecificConfig, false);
    return bytes;
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/aac/AACFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






class AACFrame extends CodecFrame {
  static *[getFrame](codecParser, headerCache, readOffset) {
    return yield* super[getFrame](
      AACHeader,
      AACFrame,
      codecParser,
      headerCache,
      readOffset,
    );
  }

  constructor(header, frame, samples) {
    super(header, frame, samples);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/aac/AACParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class AACParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = AACFrame;
    this.Header = AACHeader;

    onCodec(this[codec]);
  }

  get [codec]() {
    return "aac";
  }

  *[parseFrame]() {
    return yield* this[fixedLengthFrameSync]();
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/flac/FLACFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/






class FLACFrame extends CodecFrame {
  static _getFrameFooterCrc16(data) {
    return (data[data[constants_length] - 2] << 8) + data[data[constants_length] - 1];
  }

  // check frame footer crc
  // https://xiph.org/flac/format.html#frame_footer
  static [checkFrameFooterCrc16](data) {
    const expectedCrc16 = FLACFrame._getFrameFooterCrc16(data);
    const actualCrc16 = flacCrc16(data[subarray](0, -2));

    return expectedCrc16 === actualCrc16;
  }

  constructor(data, header, streamInfoValue) {
    header[streamInfo] = streamInfoValue;
    header[crc16] = FLACFrame._getFrameFooterCrc16(data);

    super(header, data, headerStore.get(header)[samples]);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/flac/FLACHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://xiph.org/flac/format.html

AAAAAAAA AAAAAABC DDDDEEEE FFFFGGGH 
(IIIIIIII...)
(JJJJJJJJ|JJJJJJJJ)
(KKKKKKKK|KKKKKKKK)
LLLLLLLLL

FLAC Frame Header
Letter  Length (bits)  Description
A   13  11111111|11111
B   1   Reserved 0 - mandatory, 1 - reserved
C   1   Blocking strategy, 0 - fixed, 1 - variable
D   4   Block size in inter-channel samples
E   4   Sample rate
F   4   Channel assignment
G   3   Sample size in bits
H   1   Reserved 0 - mandatory, 1 - reserved
I   ?   if(variable blocksize)
           <8-56>:"UTF-8" coded sample number (decoded number is 36 bits) [4]
        else
           <8-48>:"UTF-8" coded frame number (decoded number is 31 bits) [4]
J   ?   if(blocksize bits == 011x)
            8/16 bit (blocksize-1)
K   ?   if(sample rate bits == 11xx)
            8/16 bit sample rate
L   8   CRC-8 (polynomial = x^8 + x^2 + x^1 + x^0, initialized with 0) of everything before the crc, including the sync code
        
*/





const getFromStreamInfo = "get from STREAMINFO metadata block";

const blockingStrategyValues = {
  0b00000000: "Fixed",
  0b00000001: "Variable",
};

const blockSizeValues = {
  0b00000000: reserved,
  0b00010000: 192,
  // 0b00100000: 576,
  // 0b00110000: 1152,
  // 0b01000000: 2304,
  // 0b01010000: 4608,
  // 0b01100000: "8-bit (blocksize-1) from end of header",
  // 0b01110000: "16-bit (blocksize-1) from end of header",
  // 0b10000000: 256,
  // 0b10010000: 512,
  // 0b10100000: 1024,
  // 0b10110000: 2048,
  // 0b11000000: 4096,
  // 0b11010000: 8192,
  // 0b11100000: 16384,
  // 0b11110000: 32768,
};
for (let i = 2; i < 16; i++)
  blockSizeValues[i << 4] = i < 6 ? 576 * 2 ** (i - 2) : 2 ** i;

const sampleRateValues = {
  0b00000000: getFromStreamInfo,
  0b00000001: rate88200,
  0b00000010: rate176400,
  0b00000011: rate192000,
  0b00000100: rate8000,
  0b00000101: rate16000,
  0b00000110: rate22050,
  0b00000111: rate24000,
  0b00001000: rate32000,
  0b00001001: rate44100,
  0b00001010: rate48000,
  0b00001011: rate96000,
  // 0b00001100: "8-bit sample rate (in kHz) from end of header",
  // 0b00001101: "16-bit sample rate (in Hz) from end of header",
  // 0b00001110: "16-bit sample rate (in tens of Hz) from end of header",
  0b00001111: bad,
};

/* prettier-ignore */
const channelAssignments = {
  /*'
  'monophonic (mono)'
  'stereo (left, right)'
  'linear surround (left, right, center)'
  'quadraphonic (front left, front right, rear left, rear right)'
  '5.0 surround (front left, front right, front center, rear left, rear right)'
  '5.1 surround (front left, front right, front center, LFE, rear left, rear right)'
  '6.1 surround (front left, front right, front center, LFE, rear center, side left, side right)'
  '7.1 surround (front left, front right, front center, LFE, rear left, rear right, side left, side right)'
  */
  0b00000000: {[channels]: 1, [description]: monophonic},
  0b00010000: {[channels]: 2, [description]: getChannelMapping(2,channelMappings[0][0])},
  0b00100000: {[channels]: 3, [description]: getChannelMapping(3,channelMappings[0][1])},
  0b00110000: {[channels]: 4, [description]: getChannelMapping(4,channelMappings[1][0],channelMappings[3][0])},
  0b01000000: {[channels]: 5, [description]: getChannelMapping(5,channelMappings[1][1],channelMappings[3][0])},
  0b01010000: {[channels]: 6, [description]: getChannelMapping(6,channelMappings[1][1],lfe,channelMappings[3][0])},
  0b01100000: {[channels]: 7, [description]: getChannelMapping(7,channelMappings[1][1],lfe,channelMappings[3][4],channelMappings[2][0])},
  0b01110000: {[channels]: 8, [description]: getChannelMapping(8,channelMappings[1][1],lfe,channelMappings[3][0],channelMappings[2][0])},
  0b10000000: {[channels]: 2, [description]: `${stereo} (left, diff)`},
  0b10010000: {[channels]: 2, [description]: `${stereo} (diff, right)`},
  0b10100000: {[channels]: 2, [description]: `${stereo} (avg, diff)`},
  0b10110000: reserved,
  0b11000000: reserved,
  0b11010000: reserved,
  0b11100000: reserved,
  0b11110000: reserved,
}

const bitDepthValues = {
  0b00000000: getFromStreamInfo,
  0b00000010: 8,
  0b00000100: 12,
  0b00000110: reserved,
  0b00001000: 16,
  0b00001010: 20,
  0b00001100: 24,
  0b00001110: reserved,
};

class FLACHeader extends CodecHeader {
  // https://datatracker.ietf.org/doc/html/rfc3629#section-3
  //    Char. number range  |        UTF-8 octet sequence
  //    (hexadecimal)    |              (binary)
  // --------------------+---------------------------------------------
  // 0000 0000-0000 007F | 0xxxxxxx
  // 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
  // 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
  // 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  static _decodeUTF8Int(data) {
    if (data[0] > 0xfe) {
      return null; // length byte must have at least one zero as the lsb
    }

    if (data[0] < 0x80) return { value: data[0], length: 1 };

    // get length by counting the number of msb that are set to 1
    let length = 1;
    for (let zeroMask = 0x40; zeroMask & data[0]; zeroMask >>= 1) length++;

    let idx = length - 1,
      value = 0,
      shift = 0;

    // sum together the encoded bits in bytes 2 to length
    // 1110xxxx 10[cccccc] 10[bbbbbb] 10[aaaaaa]
    //
    //    value = [cccccc] | [bbbbbb] | [aaaaaa]
    for (; idx > 0; shift += 6, idx--) {
      if ((data[idx] & 0xc0) !== 0x80) {
        return null; // each byte should have leading 10xxxxxx
      }
      value |= (data[idx] & 0x3f) << shift; // add the encoded bits
    }

    // read the final encoded bits in byte 1
    //     1110[dddd] 10[cccccc] 10[bbbbbb] 10[aaaaaa]
    //
    // value = [dddd] | [cccccc] | [bbbbbb] | [aaaaaa]
    value |= (data[idx] & (0x7f >> length)) << shift;

    return { value, length };
  }

  static [getHeaderFromUint8Array](data, headerCache) {
    const codecParserStub = {
      [readRawData]: function* () {
        return data;
      },
    };

    return FLACHeader[getHeader](codecParserStub, headerCache, 0).next().value;
  }

  static *[getHeader](codecParser, headerCache, readOffset) {
    // Must be at least 6 bytes.
    let data = yield* codecParser[readRawData](6, readOffset);

    // Bytes (1-2 of 6)
    // * `11111111|111110..`: Frame sync
    // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
    if (data[0] !== 0xff || !(data[1] === 0xf8 || data[1] === 0xf9)) {
      return null;
    }

    const header = {};

    // Check header cache
    const key = bytesToString(data[subarray](0, 4));
    const cachedHeader = headerCache[getHeader](key);

    if (!cachedHeader) {
      // Byte (2 of 6)
      // * `.......C`: Blocking strategy, 0 - fixed, 1 - variable
      header[blockingStrategyBits] = data[1] & 0b00000001;
      header[blockingStrategy] =
        blockingStrategyValues[header[blockingStrategyBits]];

      // Byte (3 of 6)
      // * `DDDD....`: Block size in inter-channel samples
      // * `....EEEE`: Sample rate
      header[blockSizeBits] = data[2] & 0b11110000;
      header[sampleRateBits] = data[2] & 0b00001111;

      header[blockSize] = blockSizeValues[header[blockSizeBits]];
      if (header[blockSize] === reserved) {
        return null;
      }

      header[sampleRate] = sampleRateValues[header[sampleRateBits]];
      if (header[sampleRate] === bad) {
        return null;
      }

      // Byte (4 of 6)
      // * `FFFF....`: Channel assignment
      // * `....GGG.`: Sample size in bits
      // * `.......H`: Reserved 0 - mandatory, 1 - reserved
      if (data[3] & 0b00000001) {
        return null;
      }

      const channelAssignment = channelAssignments[data[3] & 0b11110000];
      if (channelAssignment === reserved) {
        return null;
      }

      header[channels] = channelAssignment[channels];
      header[channelMode] = channelAssignment[description];

      header[bitDepth] = bitDepthValues[data[3] & 0b00001110];
      if (header[bitDepth] === reserved) {
        return null;
      }
    } else {
      Object.assign(header, cachedHeader);
    }

    // Byte (5...)
    // * `IIIIIIII|...`: VBR block size ? sample number : frame number
    header[constants_length] = 5;

    // check if there is enough data to parse UTF8
    data = yield* codecParser[readRawData](header[constants_length] + 8, readOffset);

    const decodedUtf8 = FLACHeader._decodeUTF8Int(data[subarray](4));
    if (!decodedUtf8) {
      return null;
    }

    if (header[blockingStrategyBits]) {
      header[sampleNumber] = decodedUtf8.value;
    } else {
      header[frameNumber] = decodedUtf8.value;
    }

    header[constants_length] += decodedUtf8[constants_length];

    // Byte (...)
    // * `JJJJJJJJ|(JJJJJJJJ)`: Blocksize (8/16bit custom value)
    if (header[blockSizeBits] === 0b01100000) {
      // 8 bit
      if (data[constants_length] < header[constants_length])
        data = yield* codecParser[readRawData](header[constants_length], readOffset);

      header[blockSize] = data[header[constants_length] - 1] + 1;
      header[constants_length] += 1;
    } else if (header[blockSizeBits] === 0b01110000) {
      // 16 bit
      if (data[constants_length] < header[constants_length])
        data = yield* codecParser[readRawData](header[constants_length], readOffset);

      header[blockSize] =
        (data[header[constants_length] - 1] << 8) + data[header[constants_length]] + 1;
      header[constants_length] += 2;
    }

    header[samples] = header[blockSize];

    // Byte (...)
    // * `KKKKKKKK|(KKKKKKKK)`: Sample rate (8/16bit custom value)
    if (header[sampleRateBits] === 0b00001100) {
      // 8 bit
      if (data[constants_length] < header[constants_length])
        data = yield* codecParser[readRawData](header[constants_length], readOffset);

      header[sampleRate] = data[header[constants_length] - 1] * 1000;
      header[constants_length] += 1;
    } else if (header[sampleRateBits] === 0b00001101) {
      // 16 bit
      if (data[constants_length] < header[constants_length])
        data = yield* codecParser[readRawData](header[constants_length], readOffset);

      header[sampleRate] =
        (data[header[constants_length] - 1] << 8) + data[header[constants_length]];
      header[constants_length] += 2;
    } else if (header[sampleRateBits] === 0b00001110) {
      // 16 bit
      if (data[constants_length] < header[constants_length])
        data = yield* codecParser[readRawData](header[constants_length], readOffset);

      header[sampleRate] =
        ((data[header[constants_length] - 1] << 8) + data[header[constants_length]]) * 10;
      header[constants_length] += 2;
    }

    // Byte (...)
    // * `LLLLLLLL`: CRC-8
    if (data[constants_length] < header[constants_length])
      data = yield* codecParser[readRawData](header[constants_length], readOffset);

    header[crc] = data[header[constants_length] - 1];
    if (header[crc] !== crc8(data[subarray](0, header[constants_length] - 1))) {
      return null;
    }

    {
      if (!cachedHeader) {
        const {
          blockingStrategyBits,
          frameNumber,
          sampleNumber,
          samples,
          sampleRateBits,
          blockSizeBits,
          crc,
          length,
          ...codecUpdateFields
        } = header;
        headerCache[setHeader](key, header, codecUpdateFields);
      }
    }
    return new FLACHeader(header);
  }

  /**
   * @private
   * Call FLACHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this[crc16] = null; // set in FLACFrame
    this[blockingStrategy] = header[blockingStrategy];
    this[blockSize] = header[blockSize];
    this[frameNumber] = header[frameNumber];
    this[sampleNumber] = header[sampleNumber];
    this[streamInfo] = null; // set during ogg parsing
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/flac/FLACParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







const MIN_FLAC_FRAME_SIZE = 2;
const MAX_FLAC_FRAME_SIZE = 512 * 1024;

class FLACParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = FLACFrame;
    this.Header = FLACHeader;

    onCodec(this[codec]);
  }

  get [codec]() {
    return "flac";
  }

  *_getNextFrameSyncOffset(offset) {
    const data = yield* this._codecParser[readRawData](2, 0);
    const dataLength = data[constants_length] - 2;

    while (offset < dataLength) {
      // * `11111111|111110..`: Frame sync
      // * `........|......0.`: Reserved 0 - mandatory, 1 - reserved
      const firstByte = data[offset];
      if (firstByte === 0xff) {
        const secondByte = data[offset + 1];
        if (secondByte === 0xf8 || secondByte === 0xf9) break;
        if (secondByte !== 0xff) offset++; // might as well check for the next sync byte
      }
      offset++;
    }

    return offset;
  }

  *[parseFrame]() {
    // find the first valid frame header
    do {
      const header = yield* FLACHeader[getHeader](
        this._codecParser,
        this._headerCache,
        0,
      );

      if (header) {
        // found a valid frame header
        // find the next valid frame header
        let nextHeaderOffset =
          headerStore.get(header)[constants_length] + MIN_FLAC_FRAME_SIZE;

        while (nextHeaderOffset <= MAX_FLAC_FRAME_SIZE) {
          if (
            this._codecParser._flushing ||
            (yield* FLACHeader[getHeader](
              this._codecParser,
              this._headerCache,
              nextHeaderOffset,
            ))
          ) {
            // found a valid next frame header
            let frameData =
              yield* this._codecParser[readRawData](nextHeaderOffset);

            if (!this._codecParser._flushing)
              frameData = frameData[subarray](0, nextHeaderOffset);

            // check that this is actually the next header by validating the frame footer crc16
            if (FLACFrame[checkFrameFooterCrc16](frameData)) {
              // both frame headers, and frame footer crc16 are valid, we are synced (odds are pretty low of a false positive)
              const frame = new FLACFrame(frameData, header);

              this._headerCache[enable](); // start caching when synced
              this._codecParser[incrementRawData](nextHeaderOffset); // increment to the next frame
              this._codecParser[mapFrameStats](frame);

              return frame;
            }
          }

          nextHeaderOffset = yield* this._getNextFrameSyncOffset(
            nextHeaderOffset + 1,
          );
        }

        this._codecParser[logWarning](
          `Unable to sync FLAC frame after searching ${nextHeaderOffset} bytes.`,
        );
        this._codecParser[incrementRawData](nextHeaderOffset);
      } else {
        // not synced, increment data to continue syncing
        this._codecParser[incrementRawData](
          yield* this._getNextFrameSyncOffset(1),
        );
      }
    } while (true);
  }

  [parseOggPage](oggPage) {
    if (oggPage[pageSequenceNumber] === 0) {
      // Identification header

      this._headerCache[enable]();
      this._streamInfo = oggPage[data][subarray](13);
    } else if (oggPage[pageSequenceNumber] === 1) {
      // Vorbis comments
    } else {
      oggPage[codecFrames] = frameStore
        .get(oggPage)
        [segments].map((segment) => {
          const header = FLACHeader[getHeaderFromUint8Array](
            segment,
            this._headerCache,
          );

          if (header) {
            return new FLACFrame(segment, header, this._streamInfo);
          } else {
            this._codecParser[logWarning](
              "Failed to parse Ogg FLAC frame",
              "Skipping invalid FLAC frame",
            );
          }
        })
        .filter((frame) => !!frame);
    }

    return oggPage;
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/containers/ogg/OggPageHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://xiph.org/ogg/doc/framing.html

AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA BBBBBBBB 00000CDE

(LSB)                                                             (MSB)
FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF
GGGGGGGG GGGGGGGG GGGGGGGG GGGGGGGG
HHHHHHHH HHHHHHHH HHHHHHHH HHHHHHHH
IIIIIIII IIIIIIII IIIIIIII IIIIIIII

JJJJJJJJ
LLLLLLLL...

Ogg Page Header
Letter  Length (bits)  Description
A   32  0x4f676753, "OggS"
B   8   stream_structure_version
C   1   (0 no, 1 yes) last page of logical bitstream (eos)
D   1   (0 no, 1 yes) first page of logical bitstream (bos)
E   1   (0 no, 1 yes) continued packet

F   64  absolute granule position
G   32  stream serial number
H   32  page sequence no
I   32  page checksum
J   8   Number of page segments in the segment table
L   n   Segment table (n=page_segments+26).
        Segment table values sum to the total length of the packet.
        Last value is always < 0xFF. Last lacing value will be 0x00 if evenly divisible by 0xFF.
        
*/





class OggPageHeader {
  static *[getHeader](codecParser, headerCache, readOffset) {
    const header = {};

    // Must be at least 28 bytes.
    let data = yield* codecParser[readRawData](28, readOffset);

    // Bytes (1-4 of 28)
    // Frame sync (must equal OggS): `AAAAAAAA|AAAAAAAA|AAAAAAAA|AAAAAAAA`:
    if (
      data[0] !== 0x4f || // O
      data[1] !== 0x67 || // g
      data[2] !== 0x67 || // g
      data[3] !== 0x53 //    S
    ) {
      return null;
    }

    // Byte (5 of 28)
    // * `BBBBBBBB`: stream_structure_version
    header[streamStructureVersion] = data[4];

    // Byte (6 of 28)
    // * `00000CDE`
    // * `00000...`: All zeros
    // * `.....C..`: (0 no, 1 yes) last page of logical bitstream (eos)
    // * `......D.`: (0 no, 1 yes) first page of logical bitstream (bos)
    // * `.......E`: (0 no, 1 yes) continued packet
    const zeros = data[5] & 0b11111000;
    if (zeros) return null;

    header[isLastPage] = !!(data[5] & 0b00000100);
    header[isFirstPage] = !!(data[5] & 0b00000010);
    header[isContinuedPacket] = !!(data[5] & 0b00000001);

    const view = new dataView(uint8Array.from(data[subarray](0, 28))[buffer]);

    // Byte (7-14 of 28)
    // * `FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF`
    // * Absolute Granule Position
    header[absoluteGranulePosition] = readInt64le(view, 6);

    // Byte (15-18 of 28)
    // * `GGGGGGGG|GGGGGGGG|GGGGGGGG|GGGGGGGG`
    // * Stream Serial Number
    header[streamSerialNumber] = view.getInt32(14, true);

    // Byte (19-22 of 28)
    // * `HHHHHHHH|HHHHHHHH|HHHHHHHH|HHHHHHHH`
    // * Page Sequence Number
    header[pageSequenceNumber] = view.getInt32(18, true);

    // Byte (23-26 of 28)
    // * `IIIIIIII|IIIIIIII|IIIIIIII|IIIIIIII`
    // * Page Checksum
    header[pageChecksum] = view.getInt32(22, true);

    // Byte (27 of 28)
    // * `JJJJJJJJ`: Number of page segments in the segment table
    const pageSegmentTableLength = data[26];
    header[constants_length] = pageSegmentTableLength + 27;

    data = yield* codecParser[readRawData](header[constants_length], readOffset); // read in the page segment table

    header[frameLength] = 0;
    header[pageSegmentTable] = [];
    header[pageSegmentBytes] = uint8Array.from(
      data[subarray](27, header[constants_length]),
    );

    for (let i = 0, segmentLength = 0; i < pageSegmentTableLength; i++) {
      const segmentByte = header[pageSegmentBytes][i];

      header[frameLength] += segmentByte;
      segmentLength += segmentByte;

      if (segmentByte !== 0xff || i === pageSegmentTableLength - 1) {
        header[pageSegmentTable].push(segmentLength);
        segmentLength = 0;
      }
    }

    return new OggPageHeader(header);
  }

  /**
   * @private
   * Call OggPageHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    headerStore.set(this, header);

    this[absoluteGranulePosition] = header[absoluteGranulePosition];
    this[isContinuedPacket] = header[isContinuedPacket];
    this[isFirstPage] = header[isFirstPage];
    this[isLastPage] = header[isLastPage];
    this[pageSegmentTable] = header[pageSegmentTable];
    this[pageSequenceNumber] = header[pageSequenceNumber];
    this[pageChecksum] = header[pageChecksum];
    this[streamSerialNumber] = header[streamSerialNumber];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/containers/ogg/OggPage.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class OggPage extends Frame {
  static *[getFrame](codecParser, headerCache, readOffset) {
    const header = yield* OggPageHeader[getHeader](
      codecParser,
      headerCache,
      readOffset,
    );

    if (header) {
      const frameLengthValue = headerStore.get(header)[frameLength];
      const headerLength = headerStore.get(header)[constants_length];
      const totalLength = headerLength + frameLengthValue;

      const rawDataValue = (yield* codecParser[readRawData](totalLength, 0))[
        subarray
      ](0, totalLength);

      const frame = rawDataValue[subarray](headerLength, totalLength);

      return new OggPage(header, frame, rawDataValue);
    } else {
      return null;
    }
  }

  constructor(header, frame, rawDataValue) {
    super(header, frame);

    frameStore.get(this)[constants_length] = rawDataValue[constants_length];

    this[codecFrames] = [];
    this[rawData] = rawDataValue;
    this[absoluteGranulePosition] = header[absoluteGranulePosition];
    this[crc32] = header[pageChecksum];
    this[duration] = 0;
    this[isContinuedPacket] = header[isContinuedPacket];
    this[isFirstPage] = header[isFirstPage];
    this[isLastPage] = header[isLastPage];
    this[pageSequenceNumber] = header[pageSequenceNumber];
    this[samples] = 0;
    this[streamSerialNumber] = header[streamSerialNumber];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/opus/OpusFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class OpusFrame extends CodecFrame {
  constructor(data, header, samples) {
    super(header, data, samples);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/opus/OpusHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*
https://tools.ietf.org/html/rfc7845.html
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      'O'      |      'p'      |      'u'      |      's'      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      'H'      |      'e'      |      'a'      |      'd'      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Version = 1  | Channel Count |           Pre-skip            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Input Sample Rate (Hz)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Output Gain (Q7.8 in dB)    | Mapping Family|               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+               :
|                                                               |
:               Optional Channel Mapping Table...               :
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Letter  Length (bits)  Description
A  64  Magic Signature - OpusHead
B  8   Version number - 00000001
C  8   Output channel count (unsigned)
D  16  Pre-skip (unsigned, little endian)
E  32  Sample rate (unsigned, little endian)
F  16  Output Gain (signed, little endian)
G  8   Channel Mapping family (unsigned)

// if(channel mapping !== 0)
H  8   Stream count (unsigned)
I  8   Coupled Stream Count (unsigned)
J  8*C Channel Mapping
*/






/* prettier-ignore */
const channelMappingFamilies = {
  0b00000000: vorbisOpusChannelMapping.slice(0,2),
    /*
    0: "monophonic (mono)"
    1: "stereo (left, right)"
    */
  0b00000001: vorbisOpusChannelMapping
    /*
    0: "monophonic (mono)"
    1: "stereo (left, right)"
    2: "linear surround (left, center, right)"
    3: "quadraphonic (front left, front right, rear left, rear right)"
    4: "5.0 surround (front left, front center, front right, rear left, rear right)"
    5: "5.1 surround (front left, front center, front right, rear left, rear right, LFE)"
    6: "6.1 surround (front left, front center, front right, side left, side right, rear center, LFE)"
    7: "7.1 surround (front left, front center, front right, side left, side right, rear left, rear right, LFE)"
    */
  // additional channel mappings are user defined
};

const silkOnly = "SILK-only";
const celtOnly = "CELT-only";
const hybrid = "Hybrid";

const narrowBand = "narrowband";
const mediumBand = "medium-band";
const wideBand = "wideband";
const superWideBand = "super-wideband";
const fullBand = "fullband";

//  0 1 2 3 4 5 6 7
// +-+-+-+-+-+-+-+-+
// | config  |s| c |
// +-+-+-+-+-+-+-+-+
// prettier-ignore
const configTable = {
  0b00000000: { [mode]: silkOnly, [bandwidth]: narrowBand, [frameSize]: 10 },
  0b00001000: { [mode]: silkOnly, [bandwidth]: narrowBand, [frameSize]: 20 },
  0b00010000: { [mode]: silkOnly, [bandwidth]: narrowBand, [frameSize]: 40 },
  0b00011000: { [mode]: silkOnly, [bandwidth]: narrowBand, [frameSize]: 60 },
  0b00100000: { [mode]: silkOnly, [bandwidth]: mediumBand, [frameSize]: 10 },
  0b00101000: { [mode]: silkOnly, [bandwidth]: mediumBand, [frameSize]: 20 },
  0b00110000: { [mode]: silkOnly, [bandwidth]: mediumBand, [frameSize]: 40 },
  0b00111000: { [mode]: silkOnly, [bandwidth]: mediumBand, [frameSize]: 60 },
  0b01000000: { [mode]: silkOnly, [bandwidth]: wideBand, [frameSize]: 10 },
  0b01001000: { [mode]: silkOnly, [bandwidth]: wideBand, [frameSize]: 20 },
  0b01010000: { [mode]: silkOnly, [bandwidth]: wideBand, [frameSize]: 40 },
  0b01011000: { [mode]: silkOnly, [bandwidth]: wideBand, [frameSize]: 60 },
  0b01100000: { [mode]: hybrid, [bandwidth]: superWideBand, [frameSize]: 10 },
  0b01101000: { [mode]: hybrid, [bandwidth]: superWideBand, [frameSize]: 20 },
  0b01110000: { [mode]: hybrid, [bandwidth]: fullBand, [frameSize]: 10 },
  0b01111000: { [mode]: hybrid, [bandwidth]: fullBand, [frameSize]: 20 },
  0b10000000: { [mode]: celtOnly, [bandwidth]: narrowBand, [frameSize]: 2.5 },
  0b10001000: { [mode]: celtOnly, [bandwidth]: narrowBand, [frameSize]: 5 },
  0b10010000: { [mode]: celtOnly, [bandwidth]: narrowBand, [frameSize]: 10 },
  0b10011000: { [mode]: celtOnly, [bandwidth]: narrowBand, [frameSize]: 20 },
  0b10100000: { [mode]: celtOnly, [bandwidth]: wideBand, [frameSize]: 2.5 },
  0b10101000: { [mode]: celtOnly, [bandwidth]: wideBand, [frameSize]: 5 },
  0b10110000: { [mode]: celtOnly, [bandwidth]: wideBand, [frameSize]: 10 },
  0b10111000: { [mode]: celtOnly, [bandwidth]: wideBand, [frameSize]: 20 },
  0b11000000: { [mode]: celtOnly, [bandwidth]: superWideBand, [frameSize]: 2.5 },
  0b11001000: { [mode]: celtOnly, [bandwidth]: superWideBand, [frameSize]: 5 },
  0b11010000: { [mode]: celtOnly, [bandwidth]: superWideBand, [frameSize]: 10 },
  0b11011000: { [mode]: celtOnly, [bandwidth]: superWideBand, [frameSize]: 20 },
  0b11100000: { [mode]: celtOnly, [bandwidth]: fullBand, [frameSize]: 2.5 },
  0b11101000: { [mode]: celtOnly, [bandwidth]: fullBand, [frameSize]: 5 },
  0b11110000: { [mode]: celtOnly, [bandwidth]: fullBand, [frameSize]: 10 },
  0b11111000: { [mode]: celtOnly, [bandwidth]: fullBand, [frameSize]: 20 },
};

class OpusHeader extends CodecHeader {
  static [getHeaderFromUint8Array](dataValue, packetData, headerCache) {
    const header = {};

    // get length of header
    // Byte (10 of 19)
    // * `CCCCCCCC`: Channel Count
    header[channels] = dataValue[9];
    // Byte (19 of 19)
    // * `GGGGGGGG`: Channel Mapping Family
    header[channelMappingFamily] = dataValue[18];

    header[constants_length] =
      header[channelMappingFamily] !== 0 ? 21 + header[channels] : 19;

    if (dataValue[constants_length] < header[constants_length])
      throw new Error("Out of data while inside an Ogg Page");

    // Page Segment Bytes (1-2)
    // * `AAAAA...`: Packet config
    // * `.....B..`:
    // * `......CC`: Packet code
    const packetMode = packetData[0] & 0b00000011;
    const packetLength = packetMode === 3 ? 2 : 1;

    // Check header cache
    const key =
      bytesToString(dataValue[subarray](0, header[constants_length])) +
      bytesToString(packetData[subarray](0, packetLength));
    const cachedHeader = headerCache[getHeader](key);

    if (cachedHeader) return new OpusHeader(cachedHeader);

    // Bytes (1-8 of 19): OpusHead - Magic Signature
    if (key.substr(0, 8) !== "OpusHead") {
      return null;
    }

    // Byte (9 of 19)
    // * `00000001`: Version number
    if (dataValue[8] !== 1) return null;

    header[data] = uint8Array.from(dataValue[subarray](0, header[constants_length]));

    const view = new dataView(header[data][buffer]);

    header[bitDepth] = 16;

    // Byte (10 of 19)
    // * `CCCCCCCC`: Channel Count
    // set earlier to determine length

    // Byte (11-12 of 19)
    // * `DDDDDDDD|DDDDDDDD`: Pre skip
    header[preSkip] = view.getUint16(10, true);

    // Byte (13-16 of 19)
    // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
    header[inputSampleRate] = view.getUint32(12, true);
    // Opus is always decoded at 48kHz
    header[sampleRate] = rate48000;

    // Byte (17-18 of 19)
    // * `FFFFFFFF|FFFFFFFF`: Output Gain
    header[outputGain] = view.getInt16(16, true);

    // Byte (19 of 19)
    // * `GGGGGGGG`: Channel Mapping Family
    // set earlier to determine length
    if (header[channelMappingFamily] in channelMappingFamilies) {
      header[channelMode] =
        channelMappingFamilies[header[channelMappingFamily]][
          header[channels] - 1
        ];
      if (!header[channelMode]) return null;
    }

    if (header[channelMappingFamily] !== 0) {
      // * `HHHHHHHH`: Stream count
      header[streamCount] = dataValue[19];

      // * `IIIIIIII`: Coupled Stream count
      header[coupledStreamCount] = dataValue[20];

      // * `JJJJJJJJ|...` Channel Mapping table
      header[channelMappingTable] = [
        ...dataValue[subarray](21, header[channels] + 21),
      ];
    }

    const packetConfig = configTable[0b11111000 & packetData[0]];
    header[mode] = packetConfig[mode];
    header[bandwidth] = packetConfig[bandwidth];
    header[frameSize] = packetConfig[frameSize];

    // https://tools.ietf.org/html/rfc6716#appendix-B
    switch (packetMode) {
      case 0:
        // 0: 1 frame in the packet
        header[frameCount] = 1;
        break;
      case 1:
      // 1: 2 frames in the packet, each with equal compressed size
      case 2:
        // 2: 2 frames in the packet, with different compressed sizes
        header[frameCount] = 2;
        break;
      case 3:
        // 3: an arbitrary number of frames in the packet
        header[isVbr] = !!(0b10000000 & packetData[1]);
        header[hasOpusPadding] = !!(0b01000000 & packetData[1]);
        header[frameCount] = 0b00111111 & packetData[1];
        break;
      default:
        return null;
    }

    // set header cache
    {
      const {
        length,
        data: headerData,
        channelMappingFamily,
        ...codecUpdateFields
      } = header;

      headerCache[setHeader](key, header, codecUpdateFields);
    }

    return new OpusHeader(header);
  }

  /**
   * @private
   * Call OpusHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this[data] = header[data];
    this[bandwidth] = header[bandwidth];
    this[channelMappingFamily] = header[channelMappingFamily];
    this[channelMappingTable] = header[channelMappingTable];
    this[coupledStreamCount] = header[coupledStreamCount];
    this[frameCount] = header[frameCount];
    this[frameSize] = header[frameSize];
    this[hasOpusPadding] = header[hasOpusPadding];
    this[inputSampleRate] = header[inputSampleRate];
    this[isVbr] = header[isVbr];
    this[mode] = header[mode];
    this[outputGain] = header[outputGain];
    this[preSkip] = header[preSkip];
    this[streamCount] = header[streamCount];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/opus/OpusParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/







class OpusParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = OpusFrame;
    this.Header = OpusHeader;

    onCodec(this[codec]);
    this._identificationHeader = null;
    this._preSkipRemaining = null;
  }

  get [codec]() {
    return "opus";
  }

  /**
   * @todo implement continued page support
   */
  [parseOggPage](oggPage) {
    if (oggPage[pageSequenceNumber] === 0) {
      // Identification header

      this._headerCache[enable]();
      this._identificationHeader = oggPage[data];
    } else if (oggPage[pageSequenceNumber] === 1) {
      // OpusTags
    } else {
      oggPage[codecFrames] = frameStore
        .get(oggPage)
        [segments].map((segment) => {
          const header = OpusHeader[getHeaderFromUint8Array](
            this._identificationHeader,
            segment,
            this._headerCache,
          );

          if (header) {
            if (this._preSkipRemaining === null)
              this._preSkipRemaining = header[preSkip];

            let samples =
              ((header[frameSize] * header[frameCount]) / 1000) *
              header[sampleRate];

            if (this._preSkipRemaining > 0) {
              this._preSkipRemaining -= samples;
              samples =
                this._preSkipRemaining < 0 ? -this._preSkipRemaining : 0;
            }

            return new OpusFrame(segment, header, samples);
          }

          this._codecParser[constants_logError](
            "Failed to parse Ogg Opus Header",
            "Not a valid Ogg Opus file",
          );
        });
    }

    return oggPage;
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/vorbis/VorbisFrame.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/



class VorbisFrame extends CodecFrame {
  constructor(data, header, samples) {
    super(header, data, samples);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/vorbis/VorbisHeader.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

/*

1  1) [packet_type] : 8 bit value
2  2) 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73: the characters ’v’,’o’,’r’,’b’,’i’,’s’ as six octets

Letter bits Description
A      8    Packet type
B      48   Magic signature (vorbis)
C      32   Version number
D      8    Channels
E      32   Sample rate
F      32   Bitrate Maximum (signed)
G      32   Bitrate Nominal (signed)
H      32   Bitrate Minimum (signed)
I      4    blocksize 1
J      4    blocksize 0
K      1    Framing flag
*/






const blockSizes = {
  // 0b0110: 64,
  // 0b0111: 128,
  // 0b1000: 256,
  // 0b1001: 512,
  // 0b1010: 1024,
  // 0b1011: 2048,
  // 0b1100: 4096,
  // 0b1101: 8192
};
for (let i = 0; i < 8; i++) blockSizes[i + 6] = 2 ** (6 + i);

class VorbisHeader extends CodecHeader {
  static [getHeaderFromUint8Array](
    dataValue,
    headerCache,
    vorbisCommentsData,
    vorbisSetupData,
  ) {
    // Must be at least 30 bytes.
    if (dataValue[constants_length] < 30)
      throw new Error("Out of data while inside an Ogg Page");

    // Check header cache
    const key = bytesToString(dataValue[subarray](0, 30));
    const cachedHeader = headerCache[getHeader](key);
    if (cachedHeader) return new VorbisHeader(cachedHeader);

    const header = { [constants_length]: 30 };

    // Bytes (1-7 of 30): /01vorbis - Magic Signature
    if (key.substr(0, 7) !== "\x01vorbis") {
      return null;
    }

    header[data] = uint8Array.from(dataValue[subarray](0, 30));
    const view = new dataView(header[data][buffer]);

    // Byte (8-11 of 30)
    // * `CCCCCCCC|CCCCCCCC|CCCCCCCC|CCCCCCCC`: Version number
    header[version] = view.getUint32(7, true);
    if (header[version] !== 0) return null;

    // Byte (12 of 30)
    // * `DDDDDDDD`: Channel Count
    header[channels] = dataValue[11];
    header[channelMode] =
      vorbisOpusChannelMapping[header[channels] - 1] || "application defined";

    // Byte (13-16 of 30)
    // * `EEEEEEEE|EEEEEEEE|EEEEEEEE|EEEEEEEE`: Sample Rate
    header[sampleRate] = view.getUint32(12, true);

    // Byte (17-20 of 30)
    // * `FFFFFFFF|FFFFFFFF|FFFFFFFF|FFFFFFFF`: Bitrate Maximum
    header[bitrateMaximum] = view.getInt32(16, true);

    // Byte (21-24 of 30)
    // * `GGGGGGGG|GGGGGGGG|GGGGGGGG|GGGGGGGG`: Bitrate Nominal
    header[bitrateNominal] = view.getInt32(20, true);

    // Byte (25-28 of 30)
    // * `HHHHHHHH|HHHHHHHH|HHHHHHHH|HHHHHHHH`: Bitrate Minimum
    header[bitrateMinimum] = view.getInt32(24, true);

    // Byte (29 of 30)
    // * `IIII....` Blocksize 1
    // * `....JJJJ` Blocksize 0
    header[blocksize1] = blockSizes[(dataValue[28] & 0b11110000) >> 4];
    header[blocksize0] = blockSizes[dataValue[28] & 0b00001111];
    if (header[blocksize0] > header[blocksize1]) return null;

    // Byte (29 of 30)
    // * `00000001` Framing bit
    if (dataValue[29] !== 0x01) return null;

    header[bitDepth] = 32;
    header[vorbisSetup] = vorbisSetupData;
    header[vorbisComments] = vorbisCommentsData;

    {
      // set header cache
      const {
        length,
        data,
        version,
        vorbisSetup,
        vorbisComments,
        ...codecUpdateFields
      } = header;
      headerCache[setHeader](key, header, codecUpdateFields);
    }

    return new VorbisHeader(header);
  }

  /**
   * @private
   * Call VorbisHeader.getHeader(Array<Uint8>) to get instance
   */
  constructor(header) {
    super(header);

    this[bitrateMaximum] = header[bitrateMaximum];
    this[bitrateMinimum] = header[bitrateMinimum];
    this[bitrateNominal] = header[bitrateNominal];
    this[blocksize0] = header[blocksize0];
    this[blocksize1] = header[blocksize1];
    this[data] = header[data];
    this[vorbisComments] = header[vorbisComments];
    this[vorbisSetup] = header[vorbisSetup];
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/codecs/vorbis/VorbisParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/









class VorbisParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = VorbisFrame;

    onCodec(this[codec]);

    this._identificationHeader = null;
    this._setupComplete = false;

    this._prevBlockSize = null;
  }

  get [codec]() {
    return vorbis;
  }

  [parseOggPage](oggPage) {
    oggPage[codecFrames] = [];

    for (const oggPageSegment of frameStore.get(oggPage)[segments]) {
      if (oggPageSegment[0] === 1) {
        // Identification header

        this._headerCache[enable]();
        this._identificationHeader = oggPage[data];
        this._setupComplete = false;
      } else if (oggPageSegment[0] === 3) {
        // comment header

        this._vorbisComments = oggPageSegment;
      } else if (oggPageSegment[0] === 5) {
        // setup header

        this._vorbisSetup = oggPageSegment;
        this._mode = this._parseSetupHeader(oggPageSegment);
        this._setupComplete = true;
      } else if (this._setupComplete) {
        const header = VorbisHeader[getHeaderFromUint8Array](
          this._identificationHeader,
          this._headerCache,
          this._vorbisComments,
          this._vorbisSetup,
        );

        if (header) {
          oggPage[codecFrames].push(
            new VorbisFrame(
              oggPageSegment,
              header,
              this._getSamples(oggPageSegment, header),
            ),
          );
        } else {
          this._codecParser[logError](
            "Failed to parse Ogg Vorbis Header",
            "Not a valid Ogg Vorbis file",
          );
        }
      }
    }

    return oggPage;
  }

  _getSamples(segment, header) {
    const blockFlag =
      this._mode.blockFlags[(segment[0] >> 1) & this._mode.mask];

    const currentBlockSize = blockFlag
      ? header[blocksize1]
      : header[blocksize0];

    // data is not returned on the first frame, but is used to prime the decoder
    // https://xiph.org/vorbis/doc/Vorbis_I_spec.html#x1-590004
    const samplesValue =
      this._prevBlockSize === null
        ? 0
        : (this._prevBlockSize + currentBlockSize) / 4;

    this._prevBlockSize = currentBlockSize;

    return samplesValue;
  }

  // https://gitlab.xiph.org/xiph/liboggz/-/blob/master/src/liboggz/oggz_auto.c#L911
  // https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/vorbis_parser.c
  /*
   * This is the format of the mode data at the end of the packet for all
   * Vorbis Version 1 :
   *
   * [ 6:number_of_modes ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:framing(1) ]
   *
   * e.g.:
   *
   * MsB         LsB
   *              <-
   * 0 0 0 0 0 1 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1|0 0 0 0 0
   * 0 0 0 0|0|0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0|1|0 0 0 0 |
   * 0 0 0 0 0 0 0 0 V
   * 0 0 0|0 0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0|1 0 0 0 0 0
   *
   * The simplest way to approach this is to start at the end
   * and read backwards to determine the mode configuration.
   *
   * liboggz and ffmpeg both use this method.
   */
  _parseSetupHeader(setup) {
    const bitReader = new BitReader(setup);
    const mode = {
      count: 0,
      blockFlags: [],
    };

    // sync with the framing bit
    while ((bitReader.read(1) & 0x01) !== 1) {}

    let modeBits;
    // search in reverse to parse out the mode entries
    // limit mode count to 63 so previous block flag will be in first packet byte
    while (mode.count < 64 && bitReader.position > 0) {
      reverse(bitReader.read(8)); // read mapping

      // 16 bits transform type, 16 bits window type, all values must be zero
      let currentByte = 0;
      while (bitReader.read(8) === 0x00 && currentByte++ < 3) {} // a non-zero value may indicate the end of the mode entries, or invalid data

      if (currentByte === 4) {
        // transform type and window type were all zeros
        modeBits = bitReader.read(7); // modeBits may need to be used in the next iteration if this is the last mode entry
        mode.blockFlags.unshift(modeBits & 0x01); // read and store mode number -> block flag
        bitReader.position += 6; // go back 6 bits so next iteration starts right after the block flag
        mode.count++;
      } else {
        // transform type and window type were not all zeros
        // check for mode count using previous iteration modeBits
        if (((reverse(modeBits) & 0b01111110) >> 1) + 1 !== mode.count) {
          this._codecParser[logWarning](
            "vorbis derived mode count did not match actual mode count",
          );
        }

        break;
      }
    }

    // xxxxxxxa packet type
    // xxxxxxbx mode count (number of mode count bits)
    // xxxxxcxx previous window flag
    // xxxxdxxx next window flag
    mode.mask = (1 << Math.log2(mode.count)) - 1;

    return mode;
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/containers/ogg/OggParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/













class OggStream {
  constructor(codecParser, headerCache, onCodec) {
    this._codecParser = codecParser;
    this._headerCache = headerCache;
    this._onCodec = onCodec;

    this._continuedPacket = new uint8Array();
    this._codec = null;
    this._isSupported = null;
    this._previousAbsoluteGranulePosition = null;
  }

  get [codec]() {
    return this._codec || "";
  }

  _updateCodec(codec, Parser) {
    if (this._codec !== codec) {
      this._headerCache[constants_reset]();
      this._parser = new Parser(
        this._codecParser,
        this._headerCache,
        this._onCodec,
      );
      this._codec = codec;
    }
  }

  _checkCodecSupport({ data }) {
    const idString = bytesToString(data[subarray](0, 8));

    switch (idString) {
      case "fishead\0":
        return false; // ignore ogg skeleton packets
      case "OpusHead":
        this._updateCodec("opus", OpusParser);
        return true;
      case /^\x7fFLAC/.test(idString) && idString:
        this._updateCodec("flac", FLACParser);
        return true;
      case /^\x01vorbis/.test(idString) && idString:
        this._updateCodec(vorbis, VorbisParser);
        return true;
      default:
        return false;
    }
  }

  _checkPageSequenceNumber(oggPage) {
    if (
      oggPage[pageSequenceNumber] !== this._pageSequenceNumber + 1 &&
      this._pageSequenceNumber > 1 &&
      oggPage[pageSequenceNumber] > 1
    ) {
      this._codecParser[logWarning](
        "Unexpected gap in Ogg Page Sequence Number.",
        `Expected: ${this._pageSequenceNumber + 1}, Got: ${
          oggPage[pageSequenceNumber]
        }`,
      );
    }

    this._pageSequenceNumber = oggPage[pageSequenceNumber];
  }

  _parsePage(oggPage) {
    if (this._isSupported === null) {
      this._pageSequenceNumber = oggPage[pageSequenceNumber];
      this._isSupported = this._checkCodecSupport(oggPage);
    }

    this._checkPageSequenceNumber(oggPage);

    const oggPageStore = frameStore.get(oggPage);
    const headerData = headerStore.get(oggPageStore[header]);

    let offset = 0;
    oggPageStore[segments] = headerData[pageSegmentTable].map((segmentLength) =>
      oggPage[data][subarray](offset, (offset += segmentLength)),
    );

    // prepend any existing continued packet data
    if (this._continuedPacket[constants_length]) {
      oggPageStore[segments][0] = concatBuffers(
        this._continuedPacket,
        oggPageStore[segments][0],
      );

      this._continuedPacket = new uint8Array();
    }

    // save any new continued packet data
    if (
      headerData[pageSegmentBytes][headerData[pageSegmentBytes][constants_length] - 1] ===
      0xff
    ) {
      this._continuedPacket = concatBuffers(
        this._continuedPacket,
        oggPageStore[segments].pop(),
      );
    }

    // set total samples in this ogg page
    if (this._previousAbsoluteGranulePosition !== null) {
      oggPage[samples] = Number(
        oggPage[absoluteGranulePosition] -
          this._previousAbsoluteGranulePosition,
      );
    }

    this._previousAbsoluteGranulePosition = oggPage[absoluteGranulePosition];

    if (this._isSupported) {
      const frame = this._parser[parseOggPage](oggPage);
      this._codecParser[mapFrameStats](frame);

      return frame;
    } else {
      return oggPage;
    }
  }
}

class OggParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);

    this._onCodec = onCodec;
    this.Frame = OggPage;
    this.Header = OggPageHeader;

    this._streams = new Map();
    this._currentSerialNumber = null;
  }

  get [codec]() {
    const oggStream = this._streams.get(this._currentSerialNumber);

    return oggStream ? oggStream.codec : "";
  }

  *[parseFrame]() {
    const oggPage = yield* this[fixedLengthFrameSync](true);
    this._currentSerialNumber = oggPage[streamSerialNumber];

    let oggStream = this._streams.get(this._currentSerialNumber);
    if (!oggStream) {
      oggStream = new OggStream(
        this._codecParser,
        this._headerCache,
        this._onCodec,
      );
      this._streams.set(this._currentSerialNumber, oggStream);
    }

    if (oggPage[isLastPage]) this._streams.delete(this._currentSerialNumber);

    return oggStream._parsePage(oggPage);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/src/CodecParser.js
/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/









const noOp = () => {};

class CodecParser {
  constructor(
    mimeType,
    {
      onCodec,
      onCodecHeader,
      onCodecUpdate,
      enableLogging = false,
      enableFrameCRC32 = true,
    } = {},
  ) {
    this._inputMimeType = mimeType;
    this._onCodec = onCodec || noOp;
    this._onCodecHeader = onCodecHeader || noOp;
    this._onCodecUpdate = onCodecUpdate;
    this._enableLogging = enableLogging;
    this._crc32 = enableFrameCRC32 ? crc32Function : noOp;

    this[constants_reset]();
  }

  /**
   * @public
   * @returns The detected codec
   */
  get [codec]() {
    return this._parser ? this._parser[codec] : "";
  }

  [constants_reset]() {
    this._headerCache = new HeaderCache(
      this._onCodecHeader,
      this._onCodecUpdate,
    );

    this._generator = this._getGenerator();
    this._generator.next();
  }

  /**
   * @public
   * @description Generator function that yields any buffered CodecFrames and resets the CodecParser
   * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
   * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
   */
  *flush() {
    this._flushing = true;

    for (let i = this._generator.next(); i.value; i = this._generator.next()) {
      yield i.value;
    }

    this._flushing = false;

    this[constants_reset]();
  }

  /**
   * @public
   * @description Generator function takes in a Uint8Array of data and returns a CodecFrame from the data for each iteration
   * @param {Uint8Array} chunk Next chunk of codec data to read
   * @returns {Iterable<CodecFrame|OggPage>} Iterator that operates over the codec data.
   * @yields {CodecFrame|OggPage} Parsed codec or ogg page data
   */
  *parseChunk(chunk) {
    for (
      let i = this._generator.next(chunk);
      i.value;
      i = this._generator.next()
    ) {
      yield i.value;
    }
  }

  /**
   * @public
   * @description Parses an entire file and returns all of the contained frames.
   * @param {Uint8Array} fileData Coded data to read
   * @returns {Array<CodecFrame|OggPage>} CodecFrames
   */
  parseAll(fileData) {
    return [...this.parseChunk(fileData), ...this.flush()];
  }

  /**
   * @private
   */
  *_getGenerator() {
    if (this._inputMimeType.match(/aac/)) {
      this._parser = new AACParser(this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/mpeg/)) {
      this._parser = new MPEGParser(this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/flac/)) {
      this._parser = new FLACParser(this, this._headerCache, this._onCodec);
    } else if (this._inputMimeType.match(/ogg/)) {
      this._parser = new OggParser(this, this._headerCache, this._onCodec);
    } else {
      throw new Error(`Unsupported Codec ${mimeType}`);
    }

    this._frameNumber = 0;
    this._currentReadPosition = 0;
    this._totalBytesIn = 0;
    this._totalBytesOut = 0;
    this._totalSamples = 0;
    this._sampleRate = undefined;

    this._rawData = new Uint8Array(0);

    // start parsing out frames
    while (true) {
      const frame = yield* this._parser[parseFrame]();
      if (frame) yield frame;
    }
  }

  /**
   * @protected
   * @param {number} minSize Minimum bytes to have present in buffer
   * @returns {Uint8Array} rawData
   */
  *[readRawData](minSize = 0, readOffset = 0) {
    let rawData;

    while (this._rawData[constants_length] <= minSize + readOffset) {
      rawData = yield;

      if (this._flushing) return this._rawData[subarray](readOffset);

      if (rawData) {
        this._totalBytesIn += rawData[constants_length];
        this._rawData = concatBuffers(this._rawData, rawData);
      }
    }

    return this._rawData[subarray](readOffset);
  }

  /**
   * @protected
   * @param {number} increment Bytes to increment codec data
   */
  [incrementRawData](increment) {
    this._currentReadPosition += increment;
    this._rawData = this._rawData[subarray](increment);
  }

  /**
   * @protected
   */
  [mapCodecFrameStats](frame) {
    this._sampleRate = frame[header][sampleRate];

    frame[header][bitrate] =
      frame[duration] > 0
        ? Math.round(frame[data][constants_length] / frame[duration]) * 8
        : 0;
    frame[frameNumber] = this._frameNumber++;
    frame[totalBytesOut] = this._totalBytesOut;
    frame[totalSamples] = this._totalSamples;
    frame[totalDuration] = (this._totalSamples / this._sampleRate) * 1000;
    frame[crc32] = this._crc32(frame[data]);

    this._headerCache[checkCodecUpdate](
      frame[header][bitrate],
      frame[totalDuration],
    );

    this._totalBytesOut += frame[data][constants_length];
    this._totalSamples += frame[samples];
  }

  /**
   * @protected
   */
  [mapFrameStats](frame) {
    if (frame[codecFrames]) {
      // Ogg container
      if (frame[isLastPage]) {
        // cut any excess samples that fall outside of the absolute granule position
        // some streams put invalid data in absolute granule position, so only do this
        // for the end of the stream
        let absoluteGranulePositionSamples = frame[samples];

        frame[codecFrames].forEach((codecFrame) => {
          const untrimmedCodecSamples = codecFrame[samples];

          if (absoluteGranulePositionSamples < untrimmedCodecSamples) {
            codecFrame[samples] =
              absoluteGranulePositionSamples > 0
                ? absoluteGranulePositionSamples
                : 0;
            codecFrame[duration] =
              (codecFrame[samples] / codecFrame[header][sampleRate]) * 1000;
          }

          absoluteGranulePositionSamples -= untrimmedCodecSamples;

          this[mapCodecFrameStats](codecFrame);
        });
      } else {
        frame[samples] = 0;
        frame[codecFrames].forEach((codecFrame) => {
          frame[samples] += codecFrame[samples];
          this[mapCodecFrameStats](codecFrame);
        });
      }

      frame[duration] = (frame[samples] / this._sampleRate) * 1000 || 0;
      frame[totalSamples] = this._totalSamples;
      frame[totalDuration] =
        (this._totalSamples / this._sampleRate) * 1000 || 0;
      frame[totalBytesOut] = this._totalBytesOut;
    } else {
      this[mapCodecFrameStats](frame);
    }
  }

  /**
   * @private
   */
  _log(logger, messages) {
    if (this._enableLogging) {
      const stats = [
        `${codec}:         ${this[codec]}`,
        `inputMimeType: ${this._inputMimeType}`,
        `readPosition:  ${this._currentReadPosition}`,
        `totalBytesIn:  ${this._totalBytesIn}`,
        `${totalBytesOut}: ${this._totalBytesOut}`,
      ];

      const width = Math.max(...stats.map((s) => s[constants_length]));

      messages.push(
        `--stats--${"-".repeat(width - 9)}`,
        ...stats,
        "-".repeat(width),
      );

      logger(
        "codec-parser",
        messages.reduce((acc, message) => acc + "\n  " + message, ""),
      );
    }
  }

  /**
   * @protected
   */
  [logWarning](...messages) {
    this._log(console.warn, messages);
  }

  /**
   * @protected
   */
  [constants_logError](...messages) {
    this._log(console.error, messages);
  }
}

;// CONCATENATED MODULE: ./node_modules/codec-parser/index.js



/* harmony default export */ const codec_parser = (CodecParser);

const codec_parser_absoluteGranulePosition = absoluteGranulePosition;
const codec_parser_bandwidth = bandwidth;
const codec_parser_bitDepth = bitDepth;
const codec_parser_bitrate = bitrate;
const codec_parser_bitrateMaximum = bitrateMaximum;
const codec_parser_bitrateMinimum = bitrateMinimum;
const codec_parser_bitrateNominal = bitrateNominal;
const codec_parser_buffer = buffer;
const codec_parser_bufferFullness = bufferFullness;
const codec_parser_codec = codec;
const codec_parser_codecFrames = codecFrames;
const codec_parser_coupledStreamCount = coupledStreamCount;
const codec_parser_crc = crc;
const codec_parser_crc16 = crc16;
const codec_parser_crc32 = crc32;
const codec_parser_data = data;
const codec_parser_description = description;
const codec_parser_duration = duration;
const codec_parser_emphasis = emphasis;
const codec_parser_hasOpusPadding = hasOpusPadding;
const codec_parser_header = header;
const codec_parser_isContinuedPacket = isContinuedPacket;
const codec_parser_isCopyrighted = isCopyrighted;
const codec_parser_isFirstPage = isFirstPage;
const codec_parser_isHome = isHome;
const codec_parser_isLastPage = isLastPage;
const codec_parser_isOriginal = isOriginal;
const codec_parser_isPrivate = isPrivate;
const codec_parser_isVbr = isVbr;
const codec_parser_layer = constants_layer;
const codec_parser_length = constants_length;
const codec_parser_mode = mode;
const codec_parser_modeExtension = modeExtension;
const codec_parser_mpeg = mpeg;
const codec_parser_mpegVersion = mpegVersion;
const codec_parser_numberAACFrames = numberAACFrames;
const codec_parser_outputGain = outputGain;
const codec_parser_preSkip = preSkip;
const codec_parser_profile = profile;
const codec_parser_protection = protection;
const codec_parser_rawData = rawData;
const codec_parser_segments = segments;
const codec_parser_subarray = subarray;
const codec_parser_version = version;
const codec_parser_vorbis = vorbis;
const codec_parser_vorbisComments = vorbisComments;
const codec_parser_vorbisSetup = vorbisSetup;
const codec_parser_blockingStrategy = blockingStrategy;
const codec_parser_blockSize = blockSize;
const codec_parser_blocksize0 = blocksize0;
const codec_parser_blocksize1 = blocksize1;
const codec_parser_channelMappingFamily = channelMappingFamily;
const codec_parser_channelMappingTable = channelMappingTable;
const codec_parser_channelMode = channelMode;
const codec_parser_channels = channels;
const codec_parser_copyrightId = copyrightId;
const codec_parser_copyrightIdStart = copyrightIdStart;
const codec_parser_frame = constants_frame;
const codec_parser_frameCount = frameCount;
const codec_parser_frameLength = frameLength;
const codec_parser_frameNumber = frameNumber;
const codec_parser_framePadding = framePadding;
const codec_parser_frameSize = frameSize;
const codec_parser_inputSampleRate = inputSampleRate;
const codec_parser_pageChecksum = pageChecksum;
const codec_parser_pageSegmentTable = pageSegmentTable;
const codec_parser_pageSequenceNumber = pageSequenceNumber;
const codec_parser_sampleNumber = sampleNumber;
const codec_parser_sampleRate = sampleRate;
const codec_parser_samples = samples;
const codec_parser_streamCount = streamCount;
const codec_parser_streamInfo = streamInfo;
const codec_parser_streamSerialNumber = streamSerialNumber;
const codec_parser_streamStructureVersion = streamStructureVersion;
const codec_parser_totalBytesOut = totalBytesOut;
const codec_parser_totalDuration = totalDuration;
const codec_parser_totalSamples = totalSamples;


/***/ })

};
