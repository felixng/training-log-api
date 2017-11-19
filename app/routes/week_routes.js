var ObjectID = require('mongodb').ObjectID;
var moment = require('moment');

var findUser = (db, auth0Id, callback) => {
    db.collection('users').findOne({'auth0Id': auth0Id}, (err, result) => {
        if (err) {
            callback(err); 
        } else if (result == null) {
            callback()
        } else {
            callback(null, result._id);
        }
    })
}

module.exports = function(app, db, checkJwt, checkScopes) {
    app.get('/weeks/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('weeks').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });        
    });
    
    app.post('/weeks', checkJwt, checkScopes, (req, res) => {
        const week = req.body;
        var auth0Id = req.body.auth0Id;
        
        findUser(db, auth0Id, (userId) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };

            if (!week.weekNumber){
                week.weekNumber = moment().week();
            }

            db.collection('weeks').insert(week, (err, result) => {
                if (err) { 
                    res.send({ 'error': 'An error has occurred' }); 
                } else {
                    res.send(result.ops[0]);
                }
            });
        });
    });

    app.post('/weeks/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const week = req.body;

        db.collection('weeks').update(details, week, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(week);
          } 
        });
    });
    

    app.delete('/weeks/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('weeks').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Week ' + id + ' deleted!');
          } 
        });
    });
    
};