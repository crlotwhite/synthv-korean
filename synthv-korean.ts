function getClientInfo() {
    return {
        "name": "SynthV Korean",
        "author": "crlotwhite",
        "versionNumber": 1,
        "minEditorVersion": 65537
    };
}

// A constant object for Unicode.
const UniKR: {
    start: number,
    end: number,
    choSeong: readonly string[],
    jungSeong: readonly string[],
    jongSeong: readonly string[]
} = {
    start: 44032,
    end: 55203,
    choSeong: [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
        'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
        'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ],
    jungSeong: [
        'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
        'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
        'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    ],
    jongSeong: [
        '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
        'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
        'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
        'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ]
};

// A database for converting Korean to Japanse phonemes
const kr2jpn = {
    choSeong: {
        'ㄱ': 'g',
        'ㄲ': 'g g',
        'ㄴ': 'n',
        'ㄷ': 'd',
        'ㄸ': 'd d',
        'ㄹ': 'r',
        'ㅁ': 'm',
        'ㅂ': 'b',
        'ㅃ': 'b b',
        'ㅅ': 's',
        'ㅆ': 's s',
        'ㅇ': '',
        'ㅈ': 'z',
        'ㅉ': 'ts',
        'ㅊ': 'ch',
        'ㅋ': 'k',
        'ㅌ': 't',
        'ㅍ': 'p',
        'ㅎ': 'h'
    },
    jungSeong: {
        'ㅏ': 'a',
        'ㅐ': 'e',
        'ㅑ': 'y a',
        'ㅒ': 'y e',
        'ㅓ': 'o',
        'ㅔ': 'e',
        'ㅕ': 'y o',
        'ㅖ': 'y e',
        'ㅗ': 'o',
        'ㅘ': 'w a',
        'ㅙ': 'w e',
        'ㅚ': 'w e',
        'ㅛ': 'y o',
        'ㅜ': 'u',
        'ㅝ': 'w o',
        'ㅞ': 'w e',
        'ㅟ': 'w i',
        'ㅠ': 'y u',
        'ㅡ': 'u',
        'ㅢ': 'w i',
        'ㅣ': 'i'
    },
    jongSeong: {
        // '': '',
        'ㄱ': 'g',
        'ㄲ': 'g',
        'ㄳ': 'g',
        'ㄴ': 'n',
        'ㄵ': 'n',
        'ㄶ': 'n',
        'ㄷ': 'd',
        'ㄹ': 'r r',
        'ㄺ': 'g',
        'ㄻ': 'm',
        'ㄼ': 'r r',
        'ㄽ': 'r r',
        'ㄾ': 'r r',
        'ㄿ': 'p',
        'ㅀ': 'r r',
        'ㅁ': 'm',
        'ㅂ': 'b',
        'ㅄ': 'b s',
        'ㅅ': 'sil',
        'ㅆ': 'sil',
        'ㅇ': 'N',
        'ㅈ': 'z',
        'ㅊ': 'ts',
        'ㅋ': 'k',
        'ㅌ': 'sil',
        'ㅍ': 'p',
        'ㅎ': 'h'
    }
}

// a class for Korean Characters
interface Phoneme {
    phonems: string,
    phonemsArray: number[]
}

class KRCH {
    choSeong: string;
    jungSeong: string;
    jongSeong: string | null;

    public constructor(ch: string, ju: string, jo: string | null) {
        this.choSeong = ch;
        this.jungSeong = ju;
        this.jongSeong = jo;
    }

    public getOrigins(): string[] {
        return [this.choSeong, this.jungSeong, this.jongSeong!];
    }

    public k2j(): Phoneme {
        let result: string[] = [];
        // @ts-ignore
        result.push(kr2jpn.choSeong[this.choSeong]);
        // @ts-ignore
        result.push(kr2jpn.jungSeong[this.jungSeong]);
        if (this.jongSeong !== null) {
            // @ts-ignore
            result.push(kr2jpn.jongSeong[this.jongSeong]);
        }

        // if vowel has 'w' or 'y' a.k.a semivowel.
        let vowels = result[1].split(' ');
        if (vowels.length > 1 && this.choSeong !== 'ㅇ') {
            if (vowels[0] === 'y') {
                if (result[0] === 'z' || result[0] === 'ts' || result[0] === 's' || result[0] === 'ch') {
                    switch (result[0]) {
                        case 'z':
                            result[0] = 'j';
                            break;
                        case 'ch':
                        case 'ts':
                            result[0] = 'ch';
                            break;
                        case 's':
                            result[0] = 'sh';
                    }
                } else {
                    result[0] += vowels[0];
                }
                
                result[1] = vowels[1];
            } else {
                // if vowels[0] == 'w'
                if (result[0] === 'k' || result[0] === 'g') {
                    result[0] += vowels[0];
                    result[1] = vowels[1];
                }
            }
            
        } else {
            // exception about vowel 'i'
            if (vowels[0] === 'i') {
                if (result[0] === 's') {
                    result[0] = 'sh';
                } else if (result[0] === 'z') {
                    result[0] = 'j';
                }
            }
        }

        // phonems duration and strength
        let phonemsArray = [];
        
        if (this.choSeong !== 'ㅇ') {
            for (let i=0;i<result[0].split(' ').length;i++) {
                phonemsArray.push(1);
            }
        }

        for (let i=0;i<result[1].split(' ').length;i++) {
            phonemsArray.push(1);
        }

        if (this.jongSeong !== null) {
            for (let i=0;i<result[2].split(' ').length;i++) {
                phonemsArray.push(0.5);
            }
        }
        
        // First, the form(CVC) is maintained for the routine, 
        // but before returning a value, formal morpheme will remove.
        if (this.choSeong === 'ㅇ') {
            result.splice(0,  1);
        }


        return {'phonems': result.join(' '), 'phonemsArray': phonemsArray};
    }

    // comming soon.
    public k2e() {}
    public k2c() {}
}

// if str is not Korean, it return false
function isKoreanWord(str: string) {
    const unicode = str.charCodeAt(0);
    if (unicode < UniKR.start || unicode > UniKR.end) {
        return false;
    } else {
        return true;
    }
}

// Seperate Consonants and Vowels
function parseKorean(ch: string) {
    const unicode = ch.charCodeAt(0);

    const offset: number = unicode - UniKR.start;
    
    const indexOfChoSeong = Math.floor(offset / 588);
    const indexOfJungSeong = Math.floor((offset - (indexOfChoSeong * 588)) / 28);
    const indexOfJongSeong = Math.floor(offset % 28);

    return new KRCH(
        UniKR.choSeong[indexOfChoSeong],
        UniKR.jungSeong[indexOfJungSeong],
        indexOfJongSeong !== 0 ? UniKR.jongSeong[indexOfJongSeong] : null
    );
}

// main process function
function pipe(ch: string) {
    let krch = parseKorean(ch);
    return krch.k2j();
}

// SynthV control
function main(){
    // @ts-ignore
    var selectedNotes = SV.getMainEditor().getSelection().getSelectedNotes();
    if (selectedNotes.length == 0) {
        // @ts-ignore
        SV.showMessageBox("Warning", "There is no Selected Notes.");
    } else {
        for (var i=0;i<selectedNotes.length;i++) {
            var note = selectedNotes[i];
            var original = note.getLyrics();
            if (!isKoreanWord(original) || original === '') {
                continue;
            }

            var result: Phoneme = pipe(original);
            note.setPhonemes(result.phonems);
            
            // last consonants
            note.setAttributes({
                strength: result.phonemsArray,
                dur: result.phonemsArray,
            })
            // test code in synthv
            // SV.showMessageBox("test", JSON.stringify(note.getAttributes()));
        }
    }
    // @ts-ignore
    SV.finish();
}