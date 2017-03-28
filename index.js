
var http = require('http');  //importar os comandos http
express = require('express'); //importar as rotas
path = require('path'); //importar os caminhos para assim mapear arquivos do servidor
//MongoClient = require('mongodb').MongoClient, 

var Location     = require('./app/models/location');
var Coordinate = require('./app/models/coordinate');
var FunctionTest = require('./app/models/testServer');

var app = express(); //cria uma variavel do express
app.set('port', process.env.PORT || 3000); //seta o app para funcionar na porta 3000
app.set('views', path.join(__dirname, 'views')); //seta as views para a pasta views
app.set('view engine', 'pug'); //e seta a engine da view para trabalhar com pug

app.use(express.bodyParser()); //ja retorna tudo em json, msm que não retorne nesse estilo
//app.use('/api',express.Router());
 

var isWork;

FunctionTest.find( { "id": '1' }, function(err, functionVar3) {
  console.log('entrou funcao');
  if (err) {
    console.log('funcao error');
    var functionVar2 = new FunctionTest();
    functionVar2.id = "1";
    functionVar2.view = false;
    functionVar2.collect = false;
    functionVar2.save(function(err) {
        if (err) {
        } else {
          isWork = functionVar2;
        }
      });
  } else {
    console.log(functionVar3);
    if (functionVar3[0]) {
      console.log('funcao sem erro');
      console.log(functionVar3);
      isWork = functionVar3[0];
    } else {
      var functionVar4 = new FunctionTest();
      functionVar4.id = '1';
      functionVar4.view = false;
      functionVar4.collect = false;
      functionVar4.save(function(err) {
        if (err) {
          console.log('deu erro');
        } else {
          console.log('sem erro');
          isWork = functionVar4;
        }
      });
    }
  }
});

//var MongoClient = require('mongodb').MongoClient, assert = require('assert'); //implementar o mongodb ja chamando o cliente


var mongoose   = require('mongoose');
mongoose.connect('mongodb://leo:12345@ds145669.mlab.com:45669/heroku_bk3cz42r');


app.use(express.static(path.join(__dirname,'public'))); //seta a pasta public como publica e joga um path para mapear os arquivos
app.use(express.static(path.join(__dirname,'functions.js')));

app.get('/test',function(req, res){
  console.log(isWork);
  if (isWork) {
    if (isWork.collect === true) {
      console.log('saveTrue');
    }
        if (isWork.collect === false) {
      console.log('saveFalse');
    }
        if (isWork.view === true) {
      console.log('viewTrue');
    }
        if (isWork.view === false) {
      console.log('viewFalse');
    }
    res.json({ collect: isWork.collect, view: isWork.view });
    console.log(isWork);
  } else {
    res.json({ message: 'sem funcionar variavel!' });

  }
});

app.get('/accessOn',function(req, res){
  if (isWork) {
    isWork.view = true;
    isWork.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'Acesso desbloqueado!' });
              });
  }
});


app.get('/accessOff',function(req, res){
  if (isWork) {
    isWork.view = false;
    isWork.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'Acesso bloqueado!' });
              });
  }
});

app.delete('/restart', function(req, res) { //A

        FunctionTest.remove({}, function(err, location) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted all' });
            }
        });
  
});

app.get('/getOn',function(req, res){
  if (isWork) {
    isWork.collect = true;
    isWork.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'Acesso desbloqueado!' });
              });
  }
});


app.get('/getOff',function(req, res){
  if (isWork) {
    isWork.collect = false;
    isWork.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'Acesso bloqueado!' });
              });
  }
});


app.get('/local/:entity', function(req, res) {
  var params = req.params;
  var idServer = params.entity;
  if (idServer) {
    Coordinate.find( { "idReceiver": idServer }, function(err, locals) {
    //res.json(bears);
    if (!err && locals[0]) {
      res.send(200, locals); //H
    } else {
      res.send(400, {error: 'NoLocation', url: req.url});
    }
  });

  } else {
    res.send(400, {error: 'bad url', url: req.url});
  }
});

app.get('/id/:entity', function(req, res) {
  var params = req.params;
  var idServer = params.entity;
  var collection = params.collection;
  if (idServer) {
    Location.find( { "idServer": idServer }, function(err, location) {
    //res.json(bears);
    if (!err && location[0]) {
      console.log(typeof location[0]._id);
      console.log(typeof JSON.parse(JSON.stringify(location[0]._id)));
      res.send(JSON.stringify(location[0]._id));
    } else {
      var location2 = new Location(); 
      location2.name = '';
      location2.idServer = idServer;
      location2.idFirebase = '';
      location2.lat = '';
      location2.long = '';
      location2.imageUser = '';
      location2.created_at = new Date();
      location2.save(function(err) {
        if (err) {
          res.send(400, {error: 'foi tentado criar um registro mas não conseguiu', url: req.url});
        } else {
          res.send(200, JSON.stringify(location2._id));
        }
      });
    }
  });

  } else {
    res.send(400, {error: 'bad url', url: req.url});
  }
});

app.get('/:collection', function(req, res) {      // o get de alguma palavra que for colocado por primeiro na url, setando como collection
   var params = req.params;         //pega os 
   var collection = req.params.collection;
   console.log(collection);
   if (collection === 'items') {
    Location.find(function(err, locations) {
    //res.json(bears);
            if (req.accepts('html')) { 
                res.json(locations);

                //res.render('data',{objects: bears, collection: 'bears'}); 
            } else {
                res.set('Content-Type','application/json'); //G
                res.send(200, locations); //H
            }
   });
   } else if (collection === 'coordinate') {
    Coordinate.find(function(err, locations) {
    //res.json(bears);
            if (req.accepts('html')) { 
                res.json(locations);

                //res.render('data',{objects: bears, collection: 'bears'}); 
            } else {
                res.set('Content-Type','application/json'); //G
                res.send(200, locations); //H
            }
   });
   } else {
    res.send(404);
   }
   

   // collectionDriver.findAll(req.params.collection, function(error, objs) { //C
   //  	  if (error) { res.send(400, error); } //D
	  //     else { 
	  //         if (req.accepts('html')) { 
   //              console.log(objs);
   //              console.log(req.params.collection);
   //  	          res.render('data',{objects: objs, collection: req.params.collection}); 
   //            } else {
	  //         res.set('Content-Type','application/json'); //G
   //                res.send(200, objs); //H
   //            }
   //       }
   // 	});
});

 
 app.get('/items/:entity', function(req, res) { //I
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
      Location.findById(entity, function(err, location) {
        if (err) {
          res.send(202, {error: 'not find location id', url: req.url});
        } else {
          res.json(location);
        }
      });
       // collectionDriver.get(collection, entity, function(error, objs) { //J
       //    if (error) { res.send(400, error); }
       //    else { res.send(200, objs); } //K
       // });
   } else {
      res.send(400, {error: 'bad url', url: req.url});
   }
});

// app.get('/:vpac=M/:entity', function(req, res) { //I
//    var params = req.params;
//    var entity = params.entity;
//    var collection = params.collection;
//    if (entity) {
//       Location.findByID(entity, function(err, locations) {
//         if (err) {
//           res.send(202, {error: 'not find location id', url: req.url});
//         } else {
//           res.json(locations);
//         }
//       });
//        // collectionDriver.get(collection, entity, function(error, objs) { //J
//        //    if (error) { res.send(400, error); }
//        //    else { res.send(200, objs); } //K
//        // });
//    } else {
//       res.send(400, {error: 'bad url', url: req.url});
//    }
// });

app.post('/:collection', function(req, res) { //A
    var object = req.body;
    var collection = req.params.collection;


        var location = new Location(); 
        location.name = req.body.name;
        location.idServer = req.body.idServer;
        location.idFirebase = req.body.idFirebase;
        location.lat = req.body.lat;
        location.long = req.body.long;
        location.imageUser = req.body.imageUser;
        location.created_at = new Date();
        location.save(function(err) {
          if (err) {
            res.send(400, {error: 'Não deu certo', url: req.url});
          } else {
            res.send(200, {situ: 'Urso criado', nome: collection.name});
           
          }
        });

    // collectionDriver.save(collection, object, function(err,docs) {
    //       if (err) { res.send(400, err); } 
    //       else { res.send(201, docs); } //B
    //  });
});




app.put('/:collection/:entity', function(req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {

      Location.findById(entity, function(err, locationVar) {
        if (err) {
          res.send(err);
        } else {
            locationVar.name = req.body.name;
            locationVar.lat = req.body.lat;
            locationVar.long = req.body.long;
            locationVar.idServer = req.body.idServer; 
            locationVar.idFirebase = req.body.idFirebase;
            locationVar.imageUser = req.body.imageUser;
            locationVar.coordUpdate_at = Date();
            // save the bear
            locationVar.save(function(err) {
              if (err)
                res.send(err);

              res.json({ message: 'Localizacão updated!' });
            });
        }
        });
       // collectionDriver.update(collection, req.body, entity, function(error, objs) { //B
       //    if (error) { res.send(400, error); }
       //    else { res.send(200, objs); } //C
       // });
   } else {
       var error = { "message" : "Cannot PUT a whole collection" };
       res.send(400, error);
   }
});

app.patch('/:collection/:entity', function(req, res) { //A
  console.log('0');
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {

      Location.findById(entity, function(err, locationVar) {
        if (err) {
          res.send(err);
        } else {
            console.log('1');
            if (req.body.name) {
              locationVar.name = req.body.name;
            } 
            if (req.body.lat) {
              locationVar.lat = req.body.lat;
              locationVar.coordUpdate_at = Date();
              console.log('Coordenadas atualizada');

            } 
            if (req.body.long) {
              locationVar.long = req.body.long;
            } 
            if (req.body.idServer) {
              locationVar.idServer = req.body.idServer; 
            } 
            if (req.body.idFirebase) {
              locationVar.idFirebase = req.body.idFirebase;
            } 
            if (req.body.imageUser) {
              locationVar.imageUser = req.body.imageUser;
            }
            if (req.body.lat && req.body.long) {
              var coord = new Coordinate();
              coord.lat = req.body.lat;
              coord.long = req.body.long;
              coord.idReceiver = locationVar.idServer;
              coord.date = Date();
              coord.save(function(err) {
                if (err)
                  res.send(err);
                res.json({ message: 'Coordinate updated!' });
              });
            }
            // save the bear
            locationVar.save(function(err) {
              if (err)
                res.send(err);

              res.json({ message: 'Localizacão updated!' });
            });
        }
        });
       // collectionDriver.update(collection, req.body, entity, function(error, objs) { //B
       //    if (error) { res.send(400, error); }
       //    else { res.send(200, objs); } //C
       // });
   } else {
       var error = { "message" : "Cannot PUT a whole collection" };
       res.send(400, error);
   }
});

app.delete('/:collection/:entity', function(req, res) { //A
    var params = req.params;
    var entity = params.entity;
    var collection = params.collection;
    if (entity) {

        Location.remove({
            _id: entity
        }, function(err, location) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted' });
            }
        });
   } else {
       var error = { "message" : "Cannot DELETE a whole collection" };
       res.send(400, error);
   }
});

app.delete('/:collection', function(req, res) { //A
    var params = req.params;
    var collection = params.collection;
    if (collection === 'coordinate') {

        Coordinate.remove({}, function(err, location) {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted all' });
            }
        });
   } else {
       var error = { "message" : "Cannot DELETE a whole collection" };
       res.send(400, error);
   }
});




app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server is listening in ' + app.get('port'));

});
