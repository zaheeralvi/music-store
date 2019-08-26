const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const db = 'mongodb://localhost/music';
mongoose.Promise = global.Promise;

const album = require('../models/album');
const user = require('../models/user');

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
            res.sendStatus(200);
            res.json(albums);
        }
    });
});

router.post('/album', function (req, res) {
    var albumobj = new album();
    console.log(req.body.title)
    albumobj.title = req.body.title;
    albumobj.image = req.body.image;
    albumobj.genre = req.body.genre;
    albumobj.save(function (err, album) {
        if (err) {
            console.log('err' + err);
        } else {
            console.log(album)
            res.json(album);
        }
    });

});

router.get('/album/:id', function (req, res) {
    let id = res.params.id;
    album.findById(id).exec(function (err, album) {
        if (err) {
            res.send('error occured ' + err);
        } else {
            res.sendStatus(200);
            res.json(album);
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