import { FileSystem } from 'expo';

const fetchPromise = ({ url, file }) => {
  return new Promise((resolve) => {

    FileSystem.getInfoAsync(file).then(({ exists, uri }) => {
      if (exists) {
        resolve(uri);
      } else {
        FileSystem.downloadAsync(url, file).then(({ uri: downloadedUri }) => {
          resolve(downloadedUri);
        });
      }
    });
  });
};

/**
 * Returns the Promise for the desired word list.
 *
 * @returns {Promise.<Object>} A promise that resolves with the map of words.
 */
const wordListFetcher = (maxLength) => {
  let lengthToDownload = maxLength;
  if (maxLength < 10) {
    lengthToDownload = 10;
  } else if (maxLength > 18) {
    throw new Error('Too long');
  }

  const baseName = `up-to-${lengthToDownload}.json`;
  const url = `https://s3.amazonaws.com/wordfinder.mechanicalninja/${baseName}`;
  const file = `${FileSystem.cacheDirectory}${baseName}`;

  return fetchPromise({ url, file })
    .then(FileSystem.readAsStringAsync)
    .then(json => JSON.parse(json));
};

export default wordListFetcher;
