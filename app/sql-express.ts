import * as express from 'express';
import * as mysql from 'mysql';

const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Aa123456',
    database : 'eve_online'
});
connection.connect();


app.get('/api/stations/:id', (req, res) => {
    console.log(req.params.id);

    connection.query(`SELECT * FROM staStations WHERE stationID = '${req.params.id}'`, (err, results)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });

});


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`listening on port 8080`);
});