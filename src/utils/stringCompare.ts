

const TRMap: Record<string, string> = {
  'ç': 'c',
  'ğ': 'g',
  'ı': 'i',
  'ö': 'o',
  'ş': 's',
  'ü': 'u',
};

export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .split('')
    .map((char) => TRMap[char] || char)
    .join('');
};

export const splitStringByNormalizedWords = (text: string, normalizedWords: string[]): (string | string[])[] => {
  const normalizedText = normalizeString(text);
  const result: (string | string[])[] = [];
  let currentStart = 0;
  let found = false

  for (let i = 0; i < normalizedWords.length; i++) {
    const normalizedWord = normalizedWords[i];
    const index = normalizedText.indexOf(normalizedWord, currentStart);
    if (index !== -1) {
      if (index > currentStart) {
        result.push(text.substring(currentStart, index));
      }
      result.push([text.substring(index, index + normalizedWord.length)]);
      currentStart = index + normalizedWord.length;
      found = true
    }
  }

  if (currentStart < normalizedText.length) {
    result.push(text.substring(currentStart));
  }

  return found ? result : [];
};
