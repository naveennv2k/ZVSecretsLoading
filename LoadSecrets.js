const { exec } = require('node:child_process')
const core = require('@actions/core');
const fs = require('fs');
const args=process.argv[2];
console.log(process.argv);
// run the `ls` command using exec
exec(`ls -a`, (err, output) => {
  if(err){
     
     console.log(err);
  }
   console.log(output);
    }
     

);
