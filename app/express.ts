import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ofirdb'
});
connection.connect();

app.post('/api/users', (req, res) => {
    let query = `SELECT * FROM users WHERE username = ? and password = ?`;
    connection.query(query, [req.body.user, req.body.pass], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        if (results.length === 0) {
            res.status(404).end();
            return;
        }

        res.send(results);
    });
});

app.get('/api/moviegenre', (req, res) => {
    let query = `SELECT * FROM moviegenres order by genre`;

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });
});

app.get('/api/musicgenre', (req, res) => {
    let query = `SELECT * FROM musicgenres order by genre`;

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });
});

app.get('/api/bookgenre', (req, res) => {
    let query = `SELECT * FROM bookgenres order by genre`;

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });
});


app.get('/api/users/:user', (req, res) => {
    let query = `SELECT * FROM users WHERE username = ?`;

    connection.query(query, [req.params.user], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        if (results.length === 0) {
            res.status(404).end();
            return;
        }
        res.send(results[0]);
    });
});

app.post('/api/newuser', (req, res) => {
    let query = `INSERT INTO users (username, password, birthdate, firstname, lastname, city, country) 
     VALUES (? , ? , ?, ? , ? , ? , ?)`;

    connection.query(query, [req.body.username, req.body.password, req.body.birthdate, req.body.firstname, req.body.lastname,
        req.body.city, req.body.country], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        res.send(results);
    });
});

app.post('/api/selection/movies', (req, res) => {
    let query = `INSERT INTO users_movies (user_id, genre_id) VALUES (?, ?)`;
    connection.query(query, [req.body[0], req.body[1]], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("movie selection added...");
        res.send(results);
    });
});

app.delete('/api/selection/movies/:user/:selection', (req, res) => {
    let query = `DELETE FROM users_movies WHERE (user_id =  ? AND genre_id = ?)`;
    connection.query(query, [req.params.user, req.params.selection], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("movie selection deleted...");
        res.send(results);
    });
});

app.post('/api/selection/music', (req, res) => {
    let query = `INSERT INTO users_music (user_id, genre_id) VALUES (?, ?)`;
    connection.query(query, [req.body[0], req.body[1]], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("music selection added...");
        res.send(results);
    });
});

app.delete('/api/selection/music/:user/:selection', (req, res) => {
    let query = `DELETE FROM users_music WHERE (user_id =  ? AND genre_id = ?)`;
    connection.query(query, [req.params.user, req.params.selection], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("music selection deleted...");
        res.send(results);
    });
});

app.post('/api/selection/books', (req, res) => {
    let query = `INSERT INTO users_books (user_id, genre_id) VALUES (?, ?)`;
    connection.query(query, [req.body[0], req.body[1]], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("book selection added...");
        res.send(results);
    });
});

app.delete('/api/selection/books/:user/:selection', (req, res) => {
    let query = `DELETE FROM users_books WHERE (user_id =  ? AND genre_id = ?)`;
    connection.query(query, [req.params.user, req.params.selection], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("book selection deleted...");
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