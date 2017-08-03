import * as express from 'express';
import * as mysql from 'mysql';

const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ofirdb'
});
connection.connect();

app.get('/api/:user/:pass', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let query = `SELECT * FROM users WHERE username = ? and password = ?`;

    connection.query(query, [req.params.user, req.params.pass], (err, results)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });

});


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`listening on port 3000`);
});















