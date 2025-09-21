export const id = 922;
export const ids = [922];
export const modules = {

/***/ 7922:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ audioDecode)
});

// UNUSED EXPORTS: decoders

;// CONCATENATED MODULE: ./node_modules/audio-type/audio-type.js
function audioType (buf) {
	if (!buf) return;

	buf = new Uint8Array(buf.buffer || buf)

	if (isWav(buf)) return 'wav';
	if (isMp3(buf)) return 'mp3';
	if (isFlac(buf)) return 'flac';
	if (isM4a(buf)) return 'm4a';
	if (isOpus(buf)) return 'opus'; // overlaps with ogg, so must come first
	if (isOgg(buf)) return 'oga';
	if (isQoa(buf)) return 'qoa';
};

function isMp3 (buf) {
	if (!buf || buf.length < 3) return

	return (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) || // id3
		( buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0 ) || // no tag
		( buf[0] === 0x54 && buf[1] === 0x41 && buf[2] === 0x47) // 'TAG'
};

function isWav(buf) {
	if (!buf || buf.length < 12) return

	return buf[0] === 82 &&
		buf[1] === 73 &&
		buf[2] === 70 &&
		buf[3] === 70 &&
		buf[8] === 87 &&
		buf[9] === 65 &&
		buf[10] === 86 &&
		buf[11] === 69;
}

function isOgg(buf) {
	if (!buf || buf.length < 4) return;

	return  buf[0] === 79 &&
		buf[1] === 103 &&
		buf[2] === 103 &&
		buf[3] === 83;
}

function isFlac(buf) {
	if (!buf || buf.length < 4) return;

	return buf[0] === 102 &&
		buf[1] === 76 &&
		buf[2] === 97 &&
		buf[3] === 67;
}

function isM4a(buf) {
	if (!buf || buf.length < 8) return;

	return (buf[4] === 102 &&
		buf[5] === 116 &&
		buf[6] === 121 &&
		buf[7] === 112) || (
			buf[0] === 77 &&
			buf[1] === 52 &&
			buf[2] === 65 &&
			buf[3] === 32
		);
}

function isOpus(buf) {
	if (!buf || buf.length < 36) return

	// Bytes 0 to 3: detect general OGG (OPUS is OGG)
	// Bytes 28 to 35: detect OPUS
	return buf[0] === 79 &&
		buf[1] === 103 &&
		buf[2] === 103 &&
		buf[3] === 83 &&
		buf[28] === 79 &&
		buf[29] === 112 &&
		buf[30] === 117 &&
		buf[31] === 115 &&
		buf[32] === 72 &&
		buf[33] === 101 &&
		buf[34] === 97 &&
		buf[35] === 100;
}

function isQoa(buf) {
	if (!buf) return
	return (buf[0] === 0x71 && buf[1] === 0x6f && buf[2] === 0x61 && buf[3] === 0x66)
}
;// CONCATENATED MODULE: ./node_modules/audio-buffer/index.js
/**
 * AudioBuffer class
 */
class AudioBuffer {
	/**
	 * Create AudioBuffer instance.
	 * @constructor
	 * @param {Object} options - buffer init options.
	 * @param {number} options.length - buffer length in samples.
	 * @param {number} options.sampleRate - buffer sample rate.
	 * @param {number} options.numberOfChannels - number of channels.
	 */
	constructor(options) {
		if (!options) throw TypeError('options argument is required')
		if (!options.sampleRate) throw TypeError('options.sampleRate is required')
		if (options.sampleRate < 3000 || options.sampleRate > 768000) throw TypeError('options.sampleRate must be within 3000..768000')
		if (!options.length) throw TypeError('options.length must be more than 0')

		this.sampleRate = options.sampleRate
		this.numberOfChannels = options.numberOfChannels || 1
		this.length = options.length | 0
		this.duration = this.length / this.sampleRate

		//data is stored as a planar sequence
		this._data = new Float32Array(this.length * this.numberOfChannels)

		//channels data is cached as subarrays
		this._channelData = []
		for (let c = 0; c < this.numberOfChannels; c++) {
			this._channelData.push(this._data.subarray(c * this.length, (c+1) * this.length))
		}
	}

	/**
	 * Return data associated with the channel.
	 * @param {number} channel - Channel index, starting from 0.
	 * @return {Float32Array} Array containing the data.
	 */
	getChannelData (channel) {
		if (channel >= this.numberOfChannels || channel < 0 || channel == null) throw Error('Cannot getChannelData: channel number (' + channel + ') exceeds number of channels (' + this.numberOfChannels + ')');

		return this._channelData[channel]
	}


	/**
	 * Place data to the destination buffer, starting from the position.
	 * @param {Float32Array} destination - Destination array to write data to.
	 * @param {number} channelNumber - Channel to take data from.
	 * @param {number} startInChannel - Data offset in channel to read from.
	 */
	copyFromChannel (destination, channelNumber, startInChannel) {
		if (startInChannel == null) startInChannel = 0;
		var data = this._channelData[channelNumber]
		for (var i = startInChannel, j = 0; i < this.length && j < destination.length; i++, j++) {
			destination[j] = data[i];
		}
	}


	/**
	 * Place data from the source to the channel, starting (in self) from the position.
	 * @param {Float32Array | Array} source - source array to read data from.
	 * @param {number} channelNumber - channel index to copy data to.
	 * @param {number} startInChannel - offset in channel to copy data to.
	 */
	copyToChannel (source, channelNumber, startInChannel) {
		var data = this._channelData[channelNumber]

		if (!startInChannel) startInChannel = 0;

		for (var i = startInChannel, j = 0; i < this.length && j < source.length; i++, j++) {
			data[i] = source[j];
		}
	}
}

;// CONCATENATED MODULE: ./node_modules/audio-decode/audio-decode.js
/**
 * Web-Audio-API decoder
 * @module  audio-decode
 */




const audio_decode_AudioBuffer = globalThis.AudioBuffer || AudioBuffer;

/**
 * Decode an audio buffer.
 *
 * @param {ArrayBuffer | Uint8Array} buf - The audio data to decode.
 * @returns {Promise<AudioBuffer>} A promise that resolves to the decoded audio buffer.
 * @throws {Error} Throws an error if the decode target is invalid or if the audio format is not supported.
 */
async function audioDecode(buf) {
	if (!buf && !(buf.length || buf.buffer)) throw Error('Bad decode target')
	buf = new Uint8Array(buf.buffer || buf)

	let type = audioType(buf);

	if (!type) throw Error('Cannot detect audio format');

	if (!decoders[type]) throw Error('Missing decoder for ' + type + ' format')

	return decoders[type](buf)
};

const decoders = {
	async oga(buf) {
		let { decoder } = decoders.oga
		if (!decoder) {
			let { OggVorbisDecoder } = await Promise.all(/* import() */[__webpack_require__.e(501), __webpack_require__.e(338), __webpack_require__.e(578), __webpack_require__.e(432)]).then(__webpack_require__.bind(__webpack_require__, 67578))
			await (decoders.oga.decoder = decoder = new OggVorbisDecoder()).ready;
		} else await decoder.reset()
		return buf && createBuffer(await decoder.decodeFile(buf))
	},
	async mp3(buf) {
		let { decoder } = decoders.mp3
		if (!decoder) {
			const { MPEGDecoder } = await Promise.all(/* import() */[__webpack_require__.e(501), __webpack_require__.e(329), __webpack_require__.e(51)]).then(__webpack_require__.bind(__webpack_require__, 11329))
			await (decoders.mp3.decoder = decoder = new MPEGDecoder()).ready;
		}
		else await decoder.reset()
		return buf && createBuffer(await decoder.decode(buf))
	},
	async flac(buf) {
		let { decoder } = decoders.flac
		if (!decoder) {
			const { FLACDecoder } = await Promise.all(/* import() */[__webpack_require__.e(501), __webpack_require__.e(338), __webpack_require__.e(377), __webpack_require__.e(670)]).then(__webpack_require__.bind(__webpack_require__, 65758))
			await (decoders.flac.decoder = decoder = new FLACDecoder()).ready
		}
		else await decoder.reset()
		return buf && createBuffer(await decoder.decode(buf))
	},
	async opus(buf) {
		let { decoder } = decoders.opus
		if (!decoder) {
			const { OggOpusDecoder } = await Promise.all(/* import() */[__webpack_require__.e(501), __webpack_require__.e(338), __webpack_require__.e(324), __webpack_require__.e(289)]).then(__webpack_require__.bind(__webpack_require__, 47324))
			await (decoders.opus.decoder = decoder = new OggOpusDecoder()).ready
		}
		else await decoder.reset()
		return buf && createBuffer(await decoder.decodeFile(buf))
	},
	async wav(buf) {
		let { decode } = decoders.wav
		if (!decode) {
			let module = await __webpack_require__.e(/* import() */ 779).then(__webpack_require__.t.bind(__webpack_require__, 93779, 19))
			decode = decoders.wav.decode = module.default.decode
		}
		return buf && createBuffer(await decode(buf))
	},
	async qoa(buf) {
		let { decode } = decoders.qoa
		if (!decode) {
			decoders.qoa.decode = decode = (await __webpack_require__.e(/* import() */ 758).then(__webpack_require__.bind(__webpack_require__, 5758))).decode
		}
		return buf && createBuffer(await decode(buf))
	}
}

function createBuffer({ channelData, sampleRate }) {
	let audioBuffer = new audio_decode_AudioBuffer({
		sampleRate,
		length: channelData[0].length,
		numberOfChannels: channelData.length
	})
	for (let ch = 0; ch < channelData.length; ch++) audioBuffer.getChannelData(ch).set(channelData[ch])
	return audioBuffer
}


/***/ })

};
