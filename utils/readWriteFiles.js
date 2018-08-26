const fs = require('fs');
const csvWriter = require('csv-write-stream');

/**
 * Promisify fs.readFile
 * @param path
 * @param opts
 * @returns {Promise<any>}
 */
const readFile = (path, opts = 'utf8') =>
  new Promise((res, rej) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data)
    })
  });


/**
 *
 * @param path - path to destination CSV file
 * @param line - writes this line to CSV file
 * @param keys - headers of CSV file
 */
const writeToCsv = (path, line, keys ) => {
  if (!fs.existsSync(path))
    writer = csvWriter({ headers: keys});
  else
    writer = csvWriter({sendHeaders: false});

  writer.pipe(fs.createWriteStream(path, {flags: 'a'}));
  writer.write(line);
  writer.end();

};

module.exports = {
  readFile,
  writeToCsv
};