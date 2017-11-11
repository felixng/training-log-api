var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/weeks/:id', (req, res) => {
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
    
    app.post('/weeks', (req, res) => {
        const week = req.body;

        db.collection('weeks').insert(week, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
    });

    app.post('/weeks/:id', (req, res) => {
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
    

    app.delete('/weeks/:id', (req, res) => {
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