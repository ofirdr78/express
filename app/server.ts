import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../data/foo.txt');

fs.readFile(filePath, (err, data)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }

    console.log(data.toString('UTF-16'));
});

try {
    const data = fs.readFileSync(filePath);
    console.log(data.toString());
} catch (ex) {
    console.log(ex);
    process.exit(1);
}
