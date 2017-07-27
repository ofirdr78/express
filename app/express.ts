import * as express from 'express';

const app = express();

app.get('/:id', (req, res) => {
    console.log(req.params.id);

    dbConn.getData(req.params.id, (err, user) => {
        if (err) {
            ///sdfksdjfslkdjf


        }

        if (!user) {
            res.status(404).end();
            return;
        }

        res.json(user);
    });
});


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log(`listening on port 8080`);
})

const dbConn = {
    getData: (query, callback) => {
        if(query === '1'){
            callback(null, {id: 1, name: 'Danny'});
            return;
        }
        callback(null, null);
    }
};