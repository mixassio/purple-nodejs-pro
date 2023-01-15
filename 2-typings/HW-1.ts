enum EXPONENT {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1_000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,             // (9)
    ONE_TRILLION = 1_000_000_000_000,        // (12)
    ONE_QUADRILLION = 1_000_000_000_000_000, // (15)
    MAX = 9007199254740992,                  // (15)
}

enum NAMES_EXPONENT {
    HUNDRED = 'hundred',
    THOUSAND = 'thousand',
    MILLION = 'million',
    BILLION = 'billion',
    TRILLION = 'trillion',
    QUADRILLION = 'quadrillion',
}

enum LESS_THAN_TWENTY {
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
};

enum TENTHS_LESS_THAN_HUNDRED  {
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
};

const isSafeNumber = (num: number): boolean => true;

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number: number|string, asOrdinal?: boolean): string {
    if (typeof number === 'string') {
        number = parseInt(number, 10);
    }

    if (!isFinite(number)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(number)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    const words: string = generateWords(number);
    return words.replace('zero-', '');
}

export function generateWords(number: number, words: string[] | undefined = undefined): string {
    let remainder: number = 0;
    let word: string = '';

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < TENTHS_LESS_THAN_HUNDRED.twenty) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    } else if (number < EXPONENT.ONE_HUNDRED) {
        remainder = number % EXPONENT.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / EXPONENT.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    } else if (number < EXPONENT.ONE_THOUSAND) {
        [remainder, word] = tool(number, EXPONENT.ONE_HUNDRED, NAMES_EXPONENT.HUNDRED)

    } else if (number < EXPONENT.ONE_MILLION) {
        [remainder, word] = tool(number, EXPONENT.ONE_THOUSAND, NAMES_EXPONENT.THOUSAND)
    } else if (number < EXPONENT.ONE_BILLION) {
        [remainder, word] = tool(number, EXPONENT.ONE_MILLION, NAMES_EXPONENT.MILLION)
    } else if (number < EXPONENT.ONE_TRILLION) {
        [remainder, word] = tool(number, EXPONENT.ONE_BILLION, NAMES_EXPONENT.BILLION)
    } else if (number < EXPONENT.ONE_QUADRILLION) {
        [remainder, word] = tool(number, EXPONENT.ONE_TRILLION, NAMES_EXPONENT.TRILLION)
    } else if (number <= EXPONENT.MAX) {
        [remainder, word] = tool(number, EXPONENT.ONE_QUADRILLION, NAMES_EXPONENT.QUADRILLION)
    }
    words.push(word);
    return generateWords(remainder, words);
}

const tool = (number: number, exp: EXPONENT, title: NAMES_EXPONENT): [number, string] => {
    const remainder = number % exp;
    const word = `${generateWords(Math.floor(number / exp))} ${title},`
    return [remainder, word];
};

console.log(toWords(12))
console.log(toWords(905))
console.log(toWords(123456))
console.log(toWords(12989898989))
