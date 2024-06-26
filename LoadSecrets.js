const { exec } = require('node:child_process')
const core = require('@actions/core');
const fs = require('fs');
const args=process.argv[2];

// run the `ls` command using exec
exec(`./zv search -k ${process.argv[2]} `, (err, output) => {
  if(err){
     
     console.log(err);
    return ;
  }
 const lines = output.split('\n');
  // console.log(lines);
    
    for (let i = 2; i < lines.length; i++) {
        
        const columns = lines[i].split('│').map(col => col.trim());
       // console.log(columns);
        
        if (columns.length < 2 || columns[0].startsWith('─')) {
            continue;
        }
  
        exec(`./zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
            if(err){
              console.log(err);
              return ;
            }
         
            const json=JSON.parse(output);
           // console.log(output);
          const secretUsername=json.secret.secretData[0].value;
          const secretPassword=json.secret.secretData[1].value;
          core.exportVariable("secretUsername",secretUsername);
           core.exportVariable("secretPassword",secretPassword);
          core.setSecret(secretPassword);
          //   // Log the cleaned output
            // cleanOutput.forEach(line => console.log(line));
        }
    );
    }



});
