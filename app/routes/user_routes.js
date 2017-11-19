var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db, checkJwt, checkScopes) {
    app.get('/users/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('users').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });        
    });
    
    app.post('/users', checkJwt, checkScopes, (req, res) => {
        const user = req.body;

        db.collection('users').insert(user, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
    });

    app.post('/users/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;

        db.collection('users').update(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(user);
          } 
        });
    });
    

    app.delete('/users/:id', checkJwt, checkScopes, (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('User ' + id + ' deleted!');
          } 
        });
    });
    
};