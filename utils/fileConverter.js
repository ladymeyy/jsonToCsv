const _ = require('lodash');
const { readFile, writeToCsv } = require('./readWriteFiles');


/**
 * Converts a json file to a csv file
 * @param jsonPath
 *
 */
const jsonToCsv = async (jsonPath) => {

  try {

    //read the whole file (for better performance split the file or read with streams + use pipes)
    //and split into separate lines
    console.log('Reading file... ');
    const res = await readFile(jsonPath);
    const lines = res.toString().split('\n') ;
    console.log('Reading complete.');

    //extract unique keys and objects
    const { allKeys, allObjects } = parseLines(lines);

    console.log('Writing to csv file.. ');

    const csvPath = jsonPath.replace(/\.json/gi, '.csv');

    allObjects.forEach(obj =>{
      const row = assembleCSVRow(allKeys, obj);
      writeToCsv(csvPath, row, allKeys);
    });


  }catch(err){
    console.log(`Error while converting file: ${jsonPath} `, err);

  }

};



/**
 *
 assembleCSVRow:

 1) Transform JSON boolean into a ‘True’ or ‘False’ string.  { a: True } → ‘True’

 2) Transform JSON array into string, that will be parsable back to Json { a: [‘d’,’e’,’f’,1111] } → “[‘d’,’e’,’f’,1111’]”

 3) Transform null value into a string ‘null’  { a: null } → ‘null’

 4) If a key is not found insert '-'

 * @param csvKeys - headers of a csv file
 * @param object - adapt this object to csv schema (rules & keys)
 */
const assembleCSVRow = (csvKeys, object) => {

  let row = {};
  csvKeys.forEach(key => {

    if(object.hasOwnProperty(key)){
      row[key]= typeof(object[key]) !== 'number' && typeof(object[key]) !== 'string' ?
          JSON.stringify(object[key]) : object[key];
    }else{
      row[key] = '-'; //easier to detect then empty string
    }

  });

  return row;
};


/**
 * output: { allKeys, allObjects } array of all unique keys, array of all objects
 * @param lines
 */
const parseLines = (lines) =>{

  const allObjects = [];
  let allKeys = [];
  lines.forEach(line =>{
   const obj = JSON.parse(line);
    allKeys.push(Object.keys(obj));
    allObjects.push(obj);
  });

  allKeys = _.spread(_.union)(allKeys);
  return { allKeys, allObjects };
};


module.exports = {
  jsonToCsv
};