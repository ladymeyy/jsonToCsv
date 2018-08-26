const { jsonToCsv } = require('./utils/fileConverter');


const main = ()=>{
  if( process.argv.length < 3){
    console.log('Activate with file path as input');

  }else{
    jsonToCsv(process.argv[2]);
  }


};

//Start the program
main();

