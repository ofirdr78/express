import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/api/:user', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let query = `SELECT username FROM users WHERE username = ?`;

    connection.query(query, [req.params.user], (err, results)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });
});

app.post('/api/newuser', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let query = `INSERT INTO users (username, password, birthdate, firstname, lastname, city, country) 
     VALUES (? , ? , ?, ? , ? , ? , ?)`;

    connection.query(query, [req.body.username, req.body.password, req.body.birthdate, req.body.firstname, req.body.lastname,
                  req.body.city, req.body.country], (err, results)=>{
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















