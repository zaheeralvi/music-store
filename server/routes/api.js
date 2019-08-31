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
const checkout = require('../models/checkout');

mongoose.connect(db, function (err) {
    if (err) {
        console.log('Error : ' + err);
    } else {
        console.log('Success connection');
    }
});

// comment out this line after creating admin user
require('../seed/admin.js');

// Album Api's
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
        albumobj.price = req.body.price;

        albumobj.save(function (err, album) {
            if (err) {
                console.log('err' + err);
            } else {
                res.json({ status: 200, message: 'Album Added Seccessfully' });
            }
        });
    })


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

router.delete('/album/delete/:id', function (req, res) {
    let id = req.params.id;
    album.findByIdAndRemove(id).exec(function (err, albums) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ albums, status: 200, message: 'album is Deleted Successfully' });
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
    cartobj.album = req.body.album;
    cartobj.album_id = req.body.album_id;
    cartobj.user_id = req.body.user;
    cartobj.save((err, cart) => {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ status: 200, message: 'Album Add to Cart Successfully' });
        }
    });
});

router.get('/cart', function (req, res) {

    cart.find().exec(function (err, cart) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ cart, status: 200 });
        }
    });
});

router.get('/cart/:id', function (req, res) {

    let id = req.params.id;
    console.log(id)
    cart.find({ user_id: id }).exec(function (err, cart) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            // cart = cart.filter(c => c.user_id === id);
            // let albums = []
            // album.find().exec(function (err, albs) {
            //     for (let i = 0; i < albs.length; i++) {
            //         for (let j = 0; j < cart.length; j++) {
            //             if (albs[i]._id == cart[j].album._id) {
            //                 albums = [...albums, albs[i]]
            //             }
            //         }
            //     }
            // });
            res.json({ cart: cart });
        }
    });
});

router.delete('/cart/:id', function (req, res) {
    let id = req.params.id;
    cart.deleteMany({album_id:id}).exec(function (err, cart) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ cart, status: 200, message: 'Cart item Deleted Successfully' });
        }
    });
});


router.get('/checkout', function (req, res) {

    // let id = req.params.id;
    checkout.find().exec(function (err, data) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ data, status: 200 });
        }
    });
});

router.post('/checkout', function (req, res) {

    cart.deleteMany({ user_id: req.body.user_id }).exec(function (err, data) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            // console.log(data.n)
            if (data.n > 0) {
                var checkoutObj = new checkout();
                checkoutObj.album = req.body.album;
                checkoutObj.user_id = req.body.user_id;
                checkoutObj.username = req.body.username;
                checkoutObj.save((err, data) => {
                    if (err) {
                        res.send('error occured ' + err);
                    } else {
                        res.json({ data, status: 200, message: 'Order Placed Successfully' });
                    }
                });
            }else{
                res.json({data,status:200,message: 'Sorry Problem Occured, Try Again Later' })
            }
        }
    });
});

router.delete('/clear-activities', function (req, res) {
    checkout.deleteMany({}).exec(function (err, data) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json(data)
        }
    })
});

router.delete('/checkout', function (req, res) {

    checkout.deleteMany({}).exec(function (err, data) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.json({ data, status: 200, message: 'Checkout Table Documents Removed Successfully' });
        }
    });
});


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
    newuser.role = 'user';
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
                        res.json({ inserteduser, status: 200, message: 'New user Added Successfully' });
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
                res.send({ user: users, status: 200, message: 'Authenticated Successfully' });
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