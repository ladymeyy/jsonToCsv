# jsonToCsv
A nodejs program that converts in input json file to a csv file


This program gets a path to a file in which every line is JSON object and converts the whole file into csv file.

General Notes:
---------------
- Some properties are changing across lines, and some data types are different between json and csv.
- Transformation to csv rules : 
  * Transform JSON boolean into a ‘True’ or ‘False’ string.
    { a: True } → ‘True’
    
  * Transform JSON array into string, that will be parsable back to Json
    { a: [‘d’,’e’,’f’,1111] } → “[‘d’,’e’,’f’,1111’]”
    
  * Transform null value into a string ‘null’
    { a: null } → ‘null’
    

Important notice: 
-------------------
This program is currently not scalable (not recomended for big JSON files) since the fs.readFile will load the entire file into memory.


How to run:
------------
node start pathToYourJsonfile.json
