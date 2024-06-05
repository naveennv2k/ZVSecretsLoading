const { exec } = require('node:child_process')
const core = require('@actions/core');
const fs = require('fs');
const args=process.argv[2];
// run the `ls` command using exec
exec(`./zv search -k ${process.argv[2]}`, (err, output) => {
   // console.log("in");
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
   
    const lines = output.split('\n');
   // console.log(lines);
    
    for (let i = 2; i < lines.length; i++) {
        
        const columns = lines[i].split('│').map(col => col.trim());
       // console.log(columns);
        
        if (columns.length < 2 || columns[0].startsWith('─')) {
            continue;
        }
      //  console.log(columns[1].substring(7,columns[1].length-10));
        exec(`./zv get -id ${columns[1].substring(7,columns[1].length-10)} --output json --not-safe`, (err, output) => {
            
           // console.log(output);
            const json=JSON.parse(output);
            
          const secretUsername=json.secret.secretData[0].value;
          const secretpassword=json.secret.secretData[1].value;
          console.log(secretUsername);
          console.log(secretpassword);
          core.exportVariable("testName",secretUsername);
            // Log the cleaned output
            // cleanOutput.forEach(line => console.log(line));
        }
    );
    }

});
