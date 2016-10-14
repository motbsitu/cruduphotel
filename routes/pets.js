var router = require('express').Router();
var pg = require('pg');

var config = {
    database: 'rho'
};

var pool = new pg.Pool(config);

//to post new owners to database
router.post('/', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            //printout err
            console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            done(); //releases connection
            return;
        }

        client.query('INSERT INTO owners (firstName, lastName) VALUES ($1, $2,) returning *;', //$1, etc placeholder
            [req.body.first_name, req.body.last_name], //what replaced with
            function(err, result) {
                done();
                if (err) {
                    console.log("error querying database", err);
                    res.sendStatus(500);
                    return;
                }
                res.send(result.rows);

            });
    });
});

router.get('/:id', function(req, res){
    pool.connect(function(err, client, done){
        if(err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM pets WHERE id = $1;', [req.params.id], function(err, result){
                done();
                if(err){
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }

                console.log('Got rows from the DB: ',result.rows);
                res.send(result.rows);
        });
    });
});


router.get('/', function(req, res){

    pool.connect(function(err, client, done){
            if (err){
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('SELECT * FROM pets;', function(err, result){
                done();
                if(err){
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }

                console.log('Got rows from the DB: ',result.rows);
                res.send(result.rows);
        });

    });
});


router.post('/', function(req, res){
    pool.connect(function(err, client, done){
        if (err){
            res.sendStatus(500);
            done();
            return;
        }
        client.query('INSERT INTO pets (petName, petBreed, petColor) VALUES ($1, $2, $3) returning *;',
        [req.body.petName, req.body.petBreed, req.body.petColor],
        function(err,result){
            done();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.send(result.rows);

        });
    });
});


router.put('/:id', function(req, res){
    var id = req.params.id;
    var petName = req.body.petName;
    var petBreed = req.body.petBreed;
    var petColor = req.body.petColor;

    pool.connect(function(err, client, done){
        try {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            return;
        }
        client.query('UPDATE pets SET petName=$1, petBreed=$2, petColor=$3 WHERE id=$4 RETURNING *;',
            [petName, petBreed, petColor, id],
            function(err, result){
                if (err){
                    console.log('Error querying database', err);
                    res.sendStatus(500);
                } else {
                res.send(result.rows);
            }
        });

        } finally {
            done();
        }
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;

    pool.connect(function(err, client, done){
        try{
            if (err){
                console.log('Error connecting to DB', err);
                res.sendStatus(500);
                return;
            }

            client.query('DELETE FROM pets WHERE id=$1',
            [id],
            function(err, result){
                if (err){
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }

                res.sendStatus(204);
            });
        } finally {
            done();
        }
    });
});
module.exports = router;
