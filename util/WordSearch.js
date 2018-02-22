import fetchWordList from './fetchWordList';

const disassembleString = (string) => {
  const filteredString = string.replace(/[^A-Z]/gi, '').toUpperCase();

  const components = {};
  filteredString.split('').forEach((letter) => {
    const ucLetter = letter.toUpperCase();
    components[ucLetter] = components[ucLetter] ? components[ucLetter] + 1 : 1;
  });

  return components;
};

export default (needle = '') => new Promise((resolve) => {
  fetchWordList(10).then((preprocessedWordList) => {
    const disassembledNeedle = disassembleString(needle);

    const matches = preprocessedWordList
      .filter(haystackItem => Object.keys(haystackItem[1])
        .every((letter) => {
          if (!disassembledNeedle[letter]) {
            return false;
          }
          return disassembledNeedle[letter] >= haystackItem[1][letter];
        }));

    const matchedWords = matches.map(match => (match[0]));

    resolve(matchedWords);
  });
});
