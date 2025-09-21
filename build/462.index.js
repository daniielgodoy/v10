export const id = 462;
export const ids = [462];
export const modules = {

/***/ 11462:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  S: () => (/* binding */ ID3v2Parser)
});

// EXTERNAL MODULE: ./node_modules/token-types/lib/index.js + 1 modules
var lib = __webpack_require__(98743);
// EXTERNAL MODULE: ./node_modules/music-metadata/lib/common/Util.js
var Util = __webpack_require__(19102);
// EXTERNAL MODULE: ./node_modules/debug/src/index.js
var src = __webpack_require__(12614);
// EXTERNAL MODULE: ./node_modules/music-metadata/lib/id3v2/ID3v2Token.js
var ID3v2Token = __webpack_require__(32038);
// EXTERNAL MODULE: ./node_modules/music-metadata/lib/id3v1/ID3v1Parser.js
var ID3v1Parser = __webpack_require__(57876);
// EXTERNAL MODULE: ./node_modules/music-metadata/lib/ParseError.js
var ParseError = __webpack_require__(81669);
;// CONCATENATED MODULE: ./node_modules/music-metadata/lib/id3v2/FrameParser.js






const debug = src('music-metadata:id3v2:frame-parser');
const defaultEnc = 'latin1'; // latin1 == iso-8859-1;
function parseGenre(origVal) {
    // match everything inside parentheses
    const genres = [];
    let code;
    let word = '';
    for (const c of origVal) {
        if (typeof code === 'string') {
            if (c === '(' && code === '') {
                word += '(';
                code = undefined;
            }
            else if (c === ')') {
                if (word !== '') {
                    genres.push(word);
                    word = '';
                }
                const genre = parseGenreCode(code);
                if (genre) {
                    genres.push(genre);
                }
                code = undefined;
            }
            else
                code += c;
        }
        else if (c === '(') {
            code = '';
        }
        else {
            word += c;
        }
    }
    if (word) {
        if (genres.length === 0 && word.match(/^\d*$/)) {
            word = parseGenreCode(word);
        }
        if (word) {
            genres.push(word);
        }
    }
    return genres;
}
function parseGenreCode(code) {
    if (code === 'RX')
        return 'Remix';
    if (code === 'CR')
        return 'Cover';
    if (code.match(/^\d*$/)) {
        return ID3v1Parser/* Genres */.jR[Number.parseInt(code)];
    }
}
class FrameParser {
    /**
     * Create id3v2 frame parser
     * @param major - Major version, e.g. (4) for  id3v2.4
     * @param warningCollector - Used to collect decode issue
     */
    constructor(major, warningCollector) {
        this.major = major;
        this.warningCollector = warningCollector;
    }
    readData(uint8Array, type, includeCovers) {
        if (uint8Array.length === 0) {
            this.warningCollector.addWarning(`id3v2.${this.major} header has empty tag type=${type}`);
            return;
        }
        const { encoding, bom } = ID3v2Token/* TextEncodingToken */.YF.get(uint8Array, 0);
        const length = uint8Array.length;
        let offset = 0;
        let output = []; // ToDo
        const nullTerminatorLength = FrameParser.getNullTerminatorLength(encoding);
        let fzero;
        debug(`Parsing tag type=${type}, encoding=${encoding}, bom=${bom}`);
        switch (type !== 'TXXX' && type[0] === 'T' ? 'T*' : type) {
            case 'T*': // 4.2.1. Text information frames - details
            case 'GRP1': // iTunes-specific ID3v2 grouping field
            case 'IPLS': // v2.3: Involved people list
            case 'MVIN':
            case 'MVNM':
            case 'PCS':
            case 'PCST': {
                let text;
                try {
                    text = Util/* decodeString */.sc(uint8Array.slice(1), encoding).replace(/\x00+$/, '');
                }
                catch (error) {
                    if (error instanceof Error) {
                        this.warningCollector.addWarning(`id3v2.${this.major} type=${type} header has invalid string value: ${error.message}`);
                        break;
                    }
                    throw error;
                }
                switch (type) {
                    case 'TMCL': // Musician credits list
                    case 'TIPL': // Involved people list
                    case 'IPLS': // Involved people list
                        output = FrameParser.functionList(this.splitValue(type, text));
                        break;
                    case 'TRK':
                    case 'TRCK':
                    case 'TPOS':
                        output = text;
                        break;
                    case 'TCOM':
                    case 'TEXT':
                    case 'TOLY':
                    case 'TOPE':
                    case 'TPE1':
                    case 'TSRC':
                        // id3v2.3 defines that TCOM, TEXT, TOLY, TOPE & TPE1 values are separated by /
                        output = this.splitValue(type, text);
                        break;
                    case 'TCO':
                    case 'TCON':
                        output = this.splitValue(type, text).map(v => parseGenre(v)).reduce((acc, val) => acc.concat(val), []);
                        break;
                    case 'PCS':
                    case 'PCST':
                        // TODO: Why `default` not results `1` but `''`?
                        output = this.major >= 4 ? this.splitValue(type, text) : [text];
                        output = (Array.isArray(output) && output[0] === '') ? 1 : 0;
                        break;
                    default:
                        output = this.major >= 4 ? this.splitValue(type, text) : [text];
                }
                break;
            }
            case 'TXXX': {
                const idAndData = FrameParser.readIdentifierAndData(uint8Array, offset + 1, length, encoding);
                const textTag = {
                    description: idAndData.id,
                    text: this.splitValue(type, Util/* decodeString */.sc(idAndData.data, encoding).replace(/\x00+$/, ''))
                };
                output = textTag;
                break;
            }
            case 'PIC':
            case 'APIC':
                if (includeCovers) {
                    const pic = {};
                    offset += 1;
                    switch (this.major) {
                        case 2:
                            pic.format = Util/* decodeString */.sc(uint8Array.slice(offset, offset + 3), 'latin1'); // 'latin1'; // latin1 == iso-8859-1;
                            offset += 3;
                            break;
                        case 3:
                        case 4:
                            fzero = Util/* findZero */.sX(uint8Array, offset, length, defaultEnc);
                            pic.format = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), defaultEnc);
                            offset = fzero + 1;
                            break;
                        default:
                            throw makeUnexpectedMajorVersionError(this.major);
                    }
                    pic.format = FrameParser.fixPictureMimeType(pic.format);
                    pic.type = ID3v2Token/* AttachedPictureType */.n5[uint8Array[offset]];
                    offset += 1;
                    fzero = Util/* findZero */.sX(uint8Array, offset, length, encoding);
                    pic.description = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), encoding);
                    offset = fzero + nullTerminatorLength;
                    pic.data = uint8Array.slice(offset, length);
                    output = pic;
                }
                break;
            case 'CNT':
            case 'PCNT':
                output = lib.UINT32_BE.get(uint8Array, 0);
                break;
            case 'SYLT': {
                const syltHeader = ID3v2Token/* SyncTextHeader */.aY.get(uint8Array, 0);
                offset += ID3v2Token/* SyncTextHeader */.aY.len;
                const result = {
                    descriptor: '',
                    language: syltHeader.language,
                    contentType: syltHeader.contentType,
                    timeStampFormat: syltHeader.timeStampFormat,
                    syncText: []
                };
                let readSyllables = false;
                while (offset < length) {
                    const nullStr = FrameParser.readNullTerminatedString(uint8Array.subarray(offset), syltHeader.encoding);
                    offset += nullStr.len;
                    if (readSyllables) {
                        const timestamp = lib.UINT32_BE.get(uint8Array, offset);
                        offset += lib.UINT32_BE.len;
                        result.syncText.push({
                            text: nullStr.text,
                            timestamp
                        });
                    }
                    else {
                        result.descriptor = nullStr.text;
                        readSyllables = true;
                    }
                }
                output = result;
                break;
            }
            case 'ULT':
            case 'USLT':
            case 'COM':
            case 'COMM': {
                const textHeader = ID3v2Token/* TextHeader */.Jp.get(uint8Array, offset);
                offset += ID3v2Token/* TextHeader */.Jp.len;
                const descriptorStr = FrameParser.readNullTerminatedString(uint8Array.subarray(offset), textHeader.encoding);
                offset += descriptorStr.len;
                const textStr = FrameParser.readNullTerminatedString(uint8Array.subarray(offset), textHeader.encoding);
                const comment = {
                    language: textHeader.language,
                    descriptor: descriptorStr.text,
                    text: textStr.text
                };
                output = comment;
                break;
            }
            case 'UFID': {
                const ufid = FrameParser.readIdentifierAndData(uint8Array, offset, length, defaultEnc);
                output = { owner_identifier: ufid.id, identifier: ufid.data };
                break;
            }
            case 'PRIV': { // private frame
                const priv = FrameParser.readIdentifierAndData(uint8Array, offset, length, defaultEnc);
                output = { owner_identifier: priv.id, data: priv.data };
                break;
            }
            case 'POPM': { // Popularimeter
                fzero = Util/* findZero */.sX(uint8Array, offset, length, defaultEnc);
                const email = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), defaultEnc);
                offset = fzero + 1;
                const dataLen = length - offset;
                output = {
                    email,
                    rating: lib.UINT8.get(uint8Array, offset),
                    counter: dataLen >= 5 ? lib.UINT32_BE.get(uint8Array, offset + 1) : undefined
                };
                break;
            }
            case 'GEOB': { // General encapsulated object
                fzero = Util/* findZero */.sX(uint8Array, offset + 1, length, encoding);
                const mimeType = Util/* decodeString */.sc(uint8Array.slice(offset + 1, fzero), defaultEnc);
                offset = fzero + 1;
                fzero = Util/* findZero */.sX(uint8Array, offset, length, encoding);
                const filename = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), defaultEnc);
                offset = fzero + 1;
                fzero = Util/* findZero */.sX(uint8Array, offset, length, encoding);
                const description = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), defaultEnc);
                offset = fzero + 1;
                const geob = {
                    type: mimeType,
                    filename,
                    description,
                    data: uint8Array.slice(offset, length)
                };
                output = geob;
                break;
            }
            // W-Frames:
            case 'WCOM':
            case 'WCOP':
            case 'WOAF':
            case 'WOAR':
            case 'WOAS':
            case 'WORS':
            case 'WPAY':
            case 'WPUB':
                // Decode URL
                fzero = Util/* findZero */.sX(uint8Array, offset + 1, length, encoding);
                output = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), defaultEnc);
                break;
            case 'WXXX': {
                // Decode URL
                fzero = Util/* findZero */.sX(uint8Array, offset + 1, length, encoding);
                const description = Util/* decodeString */.sc(uint8Array.slice(offset + 1, fzero), encoding);
                offset = fzero + (encoding === 'utf-16le' ? 2 : 1);
                output = { description, url: Util/* decodeString */.sc(uint8Array.slice(offset, length), defaultEnc) };
                break;
            }
            case 'WFD':
            case 'WFED':
                output = Util/* decodeString */.sc(uint8Array.slice(offset + 1, Util/* findZero */.sX(uint8Array, offset + 1, length, encoding)), encoding);
                break;
            case 'MCDI': {
                // Music CD identifier
                output = uint8Array.slice(0, length);
                break;
            }
            default:
                debug(`Warning: unsupported id3v2-tag-type: ${type}`);
                break;
        }
        return output;
    }
    static readNullTerminatedString(uint8Array, encoding) {
        let offset = encoding.bom ? 2 : 0;
        const zeroIndex = Util/* findZero */.sX(uint8Array, offset, uint8Array.length, encoding.encoding);
        const txt = uint8Array.slice(offset, zeroIndex);
        if (encoding.encoding === 'utf-16le') {
            offset = zeroIndex + 2;
        }
        else {
            offset = zeroIndex + 1;
        }
        return {
            text: Util/* decodeString */.sc(txt, encoding.encoding),
            len: offset
        };
    }
    static fixPictureMimeType(pictureType) {
        pictureType = pictureType.toLocaleLowerCase();
        switch (pictureType) {
            case 'jpg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
        }
        return pictureType;
    }
    /**
     * Converts TMCL (Musician credits list) or TIPL (Involved people list)
     * @param entries
     */
    static functionList(entries) {
        const res = {};
        for (let i = 0; i + 1 < entries.length; i += 2) {
            const names = entries[i + 1].split(',');
            res[entries[i]] = res[entries[i]] ? res[entries[i]].concat(names) : names;
        }
        return res;
    }
    /**
     * id3v2.4 defines that multiple T* values are separated by 0x00
     * id3v2.3 defines that TCOM, TEXT, TOLY, TOPE & TPE1 values are separated by /
     * @param tag - Tag name
     * @param text - Concatenated tag value
     * @returns Split tag value
     */
    splitValue(tag, text) {
        let values;
        if (this.major < 4) {
            values = text.split(/\x00/g);
            if (values.length > 1) {
                this.warningCollector.addWarning(`ID3v2.${this.major} ${tag} uses non standard null-separator.`);
            }
            else {
                values = text.split(/\//g);
            }
        }
        else {
            values = text.split(/\x00/g);
        }
        return FrameParser.trimArray(values);
    }
    static trimArray(values) {
        return values.map(value => value.replace(/\x00+$/, '').trim());
    }
    static readIdentifierAndData(uint8Array, offset, length, encoding) {
        const fzero = Util/* findZero */.sX(uint8Array, offset, length, encoding);
        const id = Util/* decodeString */.sc(uint8Array.slice(offset, fzero), encoding);
        offset = fzero + FrameParser.getNullTerminatorLength(encoding);
        return { id, data: uint8Array.slice(offset, length) };
    }
    static getNullTerminatorLength(enc) {
        return enc === 'utf-16le' ? 2 : 1;
    }
}
class Id3v2ContentError extends (0,ParseError/* makeUnexpectedFileContentError */.fO)('id3v2') {
}
function makeUnexpectedMajorVersionError(majorVer) {
    throw new Id3v2ContentError(`Unexpected majorVer: ${majorVer}`);
}

// EXTERNAL MODULE: ./node_modules/@borewit/text-codec/lib/index.js
var text_codec_lib = __webpack_require__(36682);
;// CONCATENATED MODULE: ./node_modules/music-metadata/lib/id3v2/ID3v2Parser.js





class ID3v2Parser {
    constructor() {
        this.tokenizer = undefined;
        this.id3Header = undefined;
        this.metadata = undefined;
        this.headerType = undefined;
        this.options = undefined;
    }
    static removeUnsyncBytes(buffer) {
        let readI = 0;
        let writeI = 0;
        while (readI < buffer.length - 1) {
            if (readI !== writeI) {
                buffer[writeI] = buffer[readI];
            }
            readI += (buffer[readI] === 0xFF && buffer[readI + 1] === 0) ? 2 : 1;
            writeI++;
        }
        if (readI < buffer.length) {
            buffer[writeI++] = buffer[readI];
        }
        return buffer.slice(0, writeI);
    }
    static getFrameHeaderLength(majorVer) {
        switch (majorVer) {
            case 2:
                return 6;
            case 3:
            case 4:
                return 10;
            default:
                throw ID3v2Parser_makeUnexpectedMajorVersionError(majorVer);
        }
    }
    static readFrameFlags(b) {
        return {
            status: {
                tag_alter_preservation: Util/* getBit */.mh(b, 0, 6),
                file_alter_preservation: Util/* getBit */.mh(b, 0, 5),
                read_only: Util/* getBit */.mh(b, 0, 4)
            },
            format: {
                grouping_identity: Util/* getBit */.mh(b, 1, 7),
                compression: Util/* getBit */.mh(b, 1, 3),
                encryption: Util/* getBit */.mh(b, 1, 2),
                unsynchronisation: Util/* getBit */.mh(b, 1, 1),
                data_length_indicator: Util/* getBit */.mh(b, 1, 0)
            }
        };
    }
    static readFrameData(uint8Array, frameHeader, majorVer, includeCovers, warningCollector) {
        const frameParser = new FrameParser(majorVer, warningCollector);
        switch (majorVer) {
            case 2:
                return frameParser.readData(uint8Array, frameHeader.id, includeCovers);
            case 3:
            case 4:
                if (frameHeader.flags?.format.unsynchronisation) {
                    uint8Array = ID3v2Parser.removeUnsyncBytes(uint8Array);
                }
                if (frameHeader.flags?.format.data_length_indicator) {
                    uint8Array = uint8Array.slice(4, uint8Array.length);
                }
                return frameParser.readData(uint8Array, frameHeader.id, includeCovers);
            default:
                throw ID3v2Parser_makeUnexpectedMajorVersionError(majorVer);
        }
    }
    /**
     * Create a combined tag key, of tag & description
     * @param tag e.g.: COM
     * @param description e.g. iTunPGAP
     * @returns string e.g. COM:iTunPGAP
     */
    static makeDescriptionTagName(tag, description) {
        return tag + (description ? `:${description}` : '');
    }
    async parse(metadata, tokenizer, options) {
        this.tokenizer = tokenizer;
        this.metadata = metadata;
        this.options = options;
        const id3Header = await this.tokenizer.readToken(ID3v2Token/* ID3v2Header */.yW);
        if (id3Header.fileIdentifier !== 'ID3') {
            throw new Id3v2ContentError('expected ID3-header file-identifier \'ID3\' was not found');
        }
        this.id3Header = id3Header;
        this.headerType = (`ID3v2.${id3Header.version.major}`);
        return id3Header.flags.isExtendedHeader ? this.parseExtendedHeader() : this.parseId3Data(id3Header.size);
    }
    async parseExtendedHeader() {
        const extendedHeader = await this.tokenizer.readToken(ID3v2Token/* ExtendedHeader */.nl);
        const dataRemaining = extendedHeader.size - ID3v2Token/* ExtendedHeader */.nl.len;
        return dataRemaining > 0 ? this.parseExtendedHeaderData(dataRemaining, extendedHeader.size) : this.parseId3Data(this.id3Header.size - extendedHeader.size);
    }
    async parseExtendedHeaderData(dataRemaining, extendedHeaderSize) {
        await this.tokenizer.ignore(dataRemaining);
        return this.parseId3Data(this.id3Header.size - extendedHeaderSize);
    }
    async parseId3Data(dataLen) {
        const uint8Array = await this.tokenizer.readToken(new lib.Uint8ArrayType(dataLen));
        for (const tag of this.parseMetadata(uint8Array)) {
            switch (tag.id) {
                case 'TXXX':
                    if (tag.value) {
                        await this.handleTag(tag, tag.value.text, () => tag.value.description);
                    }
                    break;
                default:
                    await (Array.isArray(tag.value) ? Promise.all(tag.value.map(value => this.addTag(tag.id, value))) : this.addTag(tag.id, tag.value));
            }
        }
    }
    async handleTag(tag, values, descriptor, resolveValue = value => value) {
        await Promise.all(values.map(value => this.addTag(ID3v2Parser.makeDescriptionTagName(tag.id, descriptor(value)), resolveValue(value))));
    }
    async addTag(id, value) {
        await this.metadata.addTag(this.headerType, id, value);
    }
    parseMetadata(data) {
        let offset = 0;
        const tags = [];
        while (true) {
            if (offset === data.length)
                break;
            const frameHeaderLength = ID3v2Parser.getFrameHeaderLength(this.id3Header.version.major);
            if (offset + frameHeaderLength > data.length) {
                this.metadata.addWarning('Illegal ID3v2 tag length');
                break;
            }
            const frameHeaderBytes = data.slice(offset, offset + frameHeaderLength);
            offset += frameHeaderLength;
            const frameHeader = this.readFrameHeader(frameHeaderBytes, this.id3Header.version.major);
            const frameDataBytes = data.slice(offset, offset + frameHeader.length);
            offset += frameHeader.length;
            const values = ID3v2Parser.readFrameData(frameDataBytes, frameHeader, this.id3Header.version.major, !this.options.skipCovers, this.metadata);
            if (values) {
                tags.push({ id: frameHeader.id, value: values });
            }
        }
        return tags;
    }
    readFrameHeader(uint8Array, majorVer) {
        let header;
        switch (majorVer) {
            case 2:
                header = {
                    id: (0,text_codec_lib/* textDecode */.c)(uint8Array.slice(0, 3), 'ascii'),
                    length: lib.UINT24_BE.get(uint8Array, 3)
                };
                if (!header.id.match(/[A-Z0-9]{3}/g)) {
                    this.metadata.addWarning(`Invalid ID3v2.${this.id3Header.version.major} frame-header-ID: ${header.id}`);
                }
                break;
            case 3:
            case 4:
                header = {
                    id: (0,text_codec_lib/* textDecode */.c)(uint8Array.slice(0, 4), 'ascii'),
                    length: (majorVer === 4 ? ID3v2Token/* UINT32SYNCSAFE */.St : lib.UINT32_BE).get(uint8Array, 4),
                    flags: ID3v2Parser.readFrameFlags(uint8Array.slice(8, 10))
                };
                if (!header.id.match(/[A-Z0-9]{4}/g)) {
                    this.metadata.addWarning(`Invalid ID3v2.${this.id3Header.version.major} frame-header-ID: ${header.id}`);
                }
                break;
            default:
                throw ID3v2Parser_makeUnexpectedMajorVersionError(majorVer);
        }
        return header;
    }
}
function ID3v2Parser_makeUnexpectedMajorVersionError(majorVer) {
    throw new Id3v2ContentError(`Unexpected majorVer: ${majorVer}`);
}


/***/ })

};
