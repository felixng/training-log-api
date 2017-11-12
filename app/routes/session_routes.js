var ObjectID = require('mongodb').ObjectID;

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

module.exports = function(app, db) {
    app.get('/sessions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('sessions').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });        
    });
    
    app.post('/sessions', (req, res) => {
        const session = req.body;
        const auth0Id = session.auth0Id;

        findUser(db, auth0Id, (err, userId) => {
            if (err || !userId) { 
                res.status(404)
                   .send({ 'error': 'An error has occurred inserting session' }); 
            }
            
            session.userId = userId;
            db.collection('sessions').insert(session, (err, result) => {
                if (err) { 
                    res.send({ 'error': 'An error has occurred inserting session' }); 
                } else {
                    res.send(result.ops[0]);
                }
            });
        })
    });

    app.post('/sessions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const session = req.body;

        db.collection('sessions').update(details, session, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(session);
          } 
        });
    });
    

    app.delete('/sessions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('sessions').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Session ' + id + ' deleted!');
          } 
        });
    });
    
};