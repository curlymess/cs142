/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

// connect to database
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

/* Express middleware modules
 * express-session: handles session management
 * body-parser: parses the body of HTTP requests. Can parse JSON POST request bodies in our server API 
 * multer:  Express middleware body parser that is capable of handling the multi part forms we need to upload photos
 */
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer"); // used for photo uploading

var async = require('async');

// expressJS App
var express = require('express');
var app = express();
const fs = require("fs");

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var cs142password = require('./cs142password.js');

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

// add middleware modules to Express app
app.use(session({ secret: "secretKey", resave: false, saveUninitialized: false }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

/* proj7 problem 1 */
// Log-In
const upload = multer({ dest: 'uploads/' });// for parsing multipart/form-data

app.post('/admin/login', upload.any(), (req, res) => {
    let { login_name, password } = req.body;

    User.findOne({ login_name: login_name })
        .then(user => {
            if (!user || user.length === 0) {
                res.status(400).send('not a valid account');
                return;
            }
            var checkPassword = cs142password.doesPasswordMatch(user.password_digest, user.salt, password);
            if (!checkPassword) {
                console.log(password + " is a wrong pass ");
                console.log(user.password + " is a right pass ");
                res.status(400).json({ message: `Password is not correct, please try again` });
                return;
            }

            req.session.loginName = login_name; // store in express sessison
            req.session.loginId = user._id; // store in express sessison

            console.log("logged in!");
            res.status(200).json({ first_name: user.first_name, _id: user._id });
        })
        .catch(err => {
            console.error(" LOGIN ERROR :" + err);
            res.status(400).json({ message: "some err occurred." });
        });
});

// Log-Out
app.post('/admin/logout', (req, res) => {
    console.log("log out button clicked");
    if (!req.session.loginName) {
        res.status(400).send('The user is not logged in right now');
        return;
    }
        console.log(req.session.loginName + "logout!");
        req.session.loginName = '';
        req.session.loginId = '';
        res.status(200).send('The user logged out successfully!');
    
});
/***************************************************** */

/* proj7 problem 2 */
// new comments
app.post("/commentsOfPhoto/:photo_id", upload.any(), (req, res) => {
    if (!req.session.loginName) {
        res.status(401).send('401: The user is not currently logged in.');
        return;
    }

    if ((req.body.comment).length === 0) {
        res.status(400).send("400: empty comments are not allowed");
        return;
    }

    Photo.findById(req.params.photo_id, (err, photo) => {
        if (err) {
            res.status(404).send('photo not found :/');
            return;
        }

        Photo.findByIdAndUpdate(req.params.photo_id, {
            comments: [...photo.comments, {
                comment: req.body.comment,
                user_id: req.session.loginId
            }]
        }) 
        // e => res.status(500).send(JSON.stringify(e))
       // );
       .then( res.status(200).send())
       .catch( e => res.status(500).send(e));

    });

});


/******************************************************* */

const processFormBody = multer({ storage: multer.memoryStorage() }).single('uploadedphoto');

/* proj7 problem 3 */
// new photo upload
app.post('/photos/new', (req, res) => {
    processFormBody(req, res, err => {
        if (err || !req.session.loginName) {
            res.status(401).send('401: not logged in');
            return;
        }

        if (!req.file || req.file.buffer.size === 0) {
            req.status(400).send('error: no file');
            return;
        }

        const timestamp = new Date().valueOf();
        const filename = 'U' + String(timestamp) + req.file.originalname;

        fs.writeFile("./images/" + filename, req.file.buffer, function (err1) {
            if (err1) {
                console.log("issue with writing image into img directory ...");
                req.status(500).send('error: writing img to directory');
            } else {
                console.log("image saved in directory!!");
            }
        });

        Photo.create({ file_name: filename, date_time: timestamp, user_id: req.session.loginId })
            .then(() => console.log("yayyy photo made it to the db finally"))
            .catch((err2) => console.log("err saving photo in the db ...." + err2));

         res.status(200).send();

    });
});

/******************************************************* */
/* proj7 problem 4 */
// new user registration
app.post('/user', upload.any(), (req, res) => {
    let { login_name, first_name } = req.body;
    let newUser = req.body;
    req.session.loginName = login_name;

    if (!(newUser.first_name && newUser.last_name && newUser.password)) {
        res.status(400).json({ message: "The first_name, last_name, and password must be non-empty strings" });
        return;
    }
        // only create a new user if it have not existed
    User.findOne({ login_name: newUser.login_name })
        .then(user => {
            if (!user) { // user not exists yet
                console.log("User not found therefore unique!");
                
                var passwordSecure = cs142password.makePasswordEntry(newUser.password);
                newUser.password_digest = passwordSecure.hash;
                newUser.salt = passwordSecure.salt;

                // create the user in the DB
                User.create(newUser)
                    .then(() => console.log("New User created in the DB"))
                    .catch(e => console.log("Error creating new user ", e));
                // res.status(200).json({ message: "succesfull login!!"});
                res.status(200).send({ login_name: login_name, first_name: first_name });
            } else { // user exists already
                console.log("User already exists!");
                console.log(user);
                res.status(400).json({ message: "The login name already exists, please choose a different login name"});
            }
        })
        .catch(error => {
            console.log("Error: user found user error", error);
            res.status(400).json({ message: "Other error occured: " });
        });

});

/******************************************************* */
/* proj8 favorites */

app.get('/favorites', function(request, response) {
    if (!request.session.loginId) {
      response.status(401).send('Current user is not logged in');
      return;
    }
    let user_id = request.session.loginId;
    User.findOne({_id: user_id}).exec()
      .then(user => {
        if (user === null) {
          console.log('User with _id:' + user_id + ' not found.');
          response.status(400).send('Not found');
          return;
        }
        if (!user.favorites || user.favorites.length === 0) {
          response.status(200).send(user.favorites);
          return;
        }
        let favoriteList = [];
        async.each(user.favorites, function(photoId, done_callback) {
          Photo.findOne({"_id": photoId}).exec()
            .then(photo => {
              if (photo === null) {
                console.log('Photo with _id:' + photoId + ' not found.');
                response.status(400).send('Not found');
                return;
              }
              let newPhoto = JSON.parse(JSON.stringify(photo));
              delete newPhoto.comments;
              delete newPhoto.mentions;
              favoriteList.push(newPhoto);
              done_callback();
            })
            .catch(err => {
              console.error('find photo with _id ' + photoId + 'error:', err);
              response.status(500).send(JSON.stringify(err));
              done_callback(err);
            });
        }, function(err) {
          if (err) {
            response.status(400).send(JSON.stringify(err));
            return;
          }
          response.status(200).send(favoriteList);
        });
      })
      .catch(err => {
        console.error('Doing /favorites error:', err);
        response.status(500).send(err);
      });
  });

/******************************************************* */

/******************************************************* */

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get('/test/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    console.log('/test called with param1 = ', request.params.p1);

    var param = request.params.p1 || 'info';

    if (param === 'info') {
        // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                // Query didn't return an error but didn't find the SchemaInfo object - This
                // is also an internal error return.
                response.status(500).send('Missing SchemaInfo');
                return;
            }

            // We got the object - return it in JSON format.
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } else if (param === 'counts') {
        // In order to return the counts of all the collections we need to do an async
        // call to each collections. That is tricky to do so we use the async package
        // do the work.  We put the collections into array and use async.each to
        // do each .count() query.
        var collections = [
            { name: 'user', collection: User },
            { name: 'photo', collection: Photo },
            { name: 'schemaInfo', collection: SchemaInfo }
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});

/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    if (!request.session.loginName) {
        response.status(401).send('The user is not logged in.');
        return;
    }

    User.find({}, function (err, users) {
        if (err) {
            response.status(500).send(JSON.stringify(err));
        } else if (users.length === 0) {
            response.status(400).send("no user found");
        } else {
            const userList = JSON.parse(JSON.stringify(users));
            const newList = userList.map(user => {
                const { first_name, last_name, _id } = user;
                return { first_name, last_name, _id };
            });
            response.status(200).send(JSON.stringify(newList));
        }
    });
});


/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    if (!request.session.loginName) {
        response.status(401).send('401: The user is not currently logged in.');
        return;
    }
    
    const id = request.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            response.status(400).send('missing user id: ' + id);
        } else {
            let userInfo = {
                _id: user._id.valueOf(),
                first_name: user.first_name,
                last_name: user.last_name,
                location: user.location,
                description: user.description,
                occupation: user.occupation
            };
            response.status(200).send(JSON.stringify(userInfo));
        }
    });
});


/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get('/photosOfUser/:id', function (request, response) {
    if (!request.session.loginName) {
        response.status(401).send('401: The user is not currently logged in.');
        return;
    }
    var id = request.params.id;
    Photo.find({ user_id: id }, (err, photos) => {
        if (err) {
            response.status(400).send(JSON.stringify(`NOT FOUND: photos for user id ` + id));
        } else {
            let count = 0;
            const allPhotos = JSON.parse(JSON.stringify(photos));

            allPhotos.forEach(photo => {
                delete photo.__v; // avoid extra prop err due to mongoDb auto adding
                
                async.eachOf(photo.comments, (comment, index, callback) => {
                    User.findById({ _id: comment.user_id }, (error, user) => {

                        if (!error) {
                            const jsUser = JSON.parse(JSON.stringify(user)); //js obj
                            //remove props
                            const { location, description, occupation, __v, login_name, password, password_digest, salt, ...rest } = jsUser;
                            photo.comments[index].user = rest;
                            delete photo.comments[index].user_id; // avoid extra props
                        }
                        callback(error);
                    });


                }, error => {
                    count += 1;
                    if (error) {
                        response.status(400).send(JSON.stringify(`NOT FOUND: photos for user id ` + id));
                    } else if (count === allPhotos.length) {
                        response.json(allPhotos);
                    }
                });
            });
        }
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://127.0.0.1:' + port + ' exporting the directory ' + __dirname);
});


