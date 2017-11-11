var ObjectID = require('mongodb').ObjectID;

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

        db.collection('sessions').insert(session, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
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