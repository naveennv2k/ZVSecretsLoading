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
      console.log(columns[1]);
        exec(`./zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
            if(err){
              console.log(err);
              return ;
            }
         
            const json=JSON.parse(output);
           // console.log(output);
          const secretUsername=json.secret.secretData[0].value;
          const secretpassword=json.secret.secretData[1].value;
          
          const secretName = core.getInput(secretUsername);
          const secretPassword = core.getInput(secretpassword);
         
          // console.log(`::set-env name=SECRET_USERNAME::${secretName}`);
          // console.log(`::set-env name=SECRET_PASSWORD::${secretPassword}`);
         
          core.exportVariable("secretUsername",secretName);
          core.exportVariable("secretPassword",secretPassword);
          //   // Log the cleaned output
            // cleanOutput.forEach(line => console.log(line));
        }
    );
    }



});
