const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const _ = require('lodash');

const db = 'mongodb://localhost/music';
mongoose.Promise = global.Promise;

const artist = require('../models/artist');
const album = require('../models/album');
const user = require('../models/user');
const cart = require('../models/cart');

mongoose.connect(db, function (err) {
    if (err) {
        console.log('Error : ' + err);
    } else {
        console.log('Success connection');
    }
});

// Device Api's
router.get('/albums', function (req, res) {
    album.find({}).exec(function (err, albums) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json(albums);
        }
    });
});

router.post('/album', function (req, res) {
    var albumobj = new album();
    var artistobj = new artist();
    artistobj.name = req.body.artist;

    artistobj.save((err, artist) => {
        albumobj.artist = artist;
        albumobj.title = req.body.title;
        albumobj.image = req.body.image;
        albumobj.genre = req.body.genre;
        albumobj.songs = req.body.songs;

        albumobj.save(function (err, album) {
            if (err) {
                console.log('err' + err);
            } else {
                res.json({ status: 200, message: 'Album Added Seccessfully' });
            }
        });
    })


});

router.get('/albums', function (req, res) {
    album.find({}).exec(function (err, albums) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            if (albums === undefined || albums.length == 0) {
                // res.sendStatus(404);
                res.json({ status: 404, message: 'No Data Found' });
            } else {
                res.json({ data: albums, status: 200 });
            }
        }
    });
});

router.get('/album/:id', function (req, res) {
    let id = req.params.id;
    album.findById(id).exec(function (err, album) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json(album);
        }
    });
});

router.delete('/album/delete', function (req, res) {
    album.remove({}).exec(function (err, albums) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ albums, status: 200, message: 'All albums are Deleted Successfully' });
        }
    });
});


router.get('/artist/:id', function (req, res) {
    let id = req.params.id;

    artist.findById(id).exec(function (err, artist) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            // res.json(artist);
            album.find({ "artist": artist }).exec(function (err, albums) {
                if (err) {
                    res.send('error occured ' + err);
                } else {
                    res.json(albums);
                }
            });
        }
    });
});


router.post('/cart', function (req, res) {

    var cartobj = new cart();
    cartobj.album_id = req.body.album;
    cartobj.user_id = req.body.user;
    cartobj.save((err, cart) => {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ cart, status: 200, message: 'Album Add to Cart Successfully' });
        }
    });
});

router.get('/cart/:id', function (req, res) {

    let id = req.params.id;
    cart.find().exec(function (err, cart) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            cart = cart.filter(c => c.user_id === id)
            res.json(cart);
        }
    });
});
// router.patch('/product/:id',function (req,res) {

//     Product.findByIdAndUpdate(req.params.id,{
//        $set:{Name:req.body.Name,Cost:req.body.Cost,Expiry:req.body.Expiry,Warranty:req.body.Warranty}
//     },{
//         new: true
//     }, function (err,updatedProduct) {
//             if(err){
//                 console.log('Error occured '+ err);
//             }else{
//                 res.json(updatedProduct);
//             }
//         }
//     );

// });

// router.post('/product',function (req,res) {

//     var newProduct = new Product();
//     newProduct.Name = req.body.Name;
//     newProduct.Cost = req.body.Cost;
//     newProduct.Warranty = req.body.Warranty;
//     newProduct.Image = req.body.Image;
//     newProduct.Expiry = req.body.Expiry;
//     newProduct.save(function (err,insertedProduct) {
//         if(err){
//             console.log('err'+err);
//         }else{
//             res.statusCode(200);
//             res.json(insertedProduct);
//         }
//     });
// });



// user Api's

router.get('/users', function (req, res) {
    user.find({}).exec(function (err, users) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json(users);
        }
    });
});

router.delete('/users/delete', function (req, res) {
    user.remove({}).exec(function (err, users) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ users, status: 200, message: 'All Users are Deleted Successfully' });
        }
    });
});


router.post('/user', function (req, res) {

    var newuser = new user();
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.password = req.body.password;
    user.find({ email: req.body.email }).exec(function (err, users) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            if (users != '') {
                res.json({ status: 422, message: 'Email Already Exist' });
            } else {
                newuser.save(function (err, inserteduser) {
                    if (err) {
                        console.log('err' + err);
                    } else {
                        res.json({ status: 200, message: 'New user Added Successfully' });
                    }
                });
            }
        }

    });
});

router.post('/user/login', function (req, res) {

    user.find({ email: req.body.email, password: req.body.password }).exec(function (err, users) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            if (users != '') {
                res.json({ status: 200, message: 'Authenticated Successfully' });
            } else {
                res.json({ status: 404, message: 'Invalid Username or Password' });
            }
        }
    }, err => {
        res.json({ message: 'Error occured', error: err });
    });
});


router.delete('/user/:id', function (req, res) {

    user.findByIdAndRemove(req.params.id, function (err, deleteduser) {
        res.json(deleteduser);
    });

});


module.exports = router;