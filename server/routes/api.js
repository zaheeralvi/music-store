const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const db = 'mongodb://localhost/music';
mongoose.Promise = global.Promise;

const song = require('../models/song');
const user = require('../models/user');

mongoose.connect(db,function (err) {
    if(err){
        console.log('Error : '+err);
    } else {
        console.log('Success connection');
    }
});

// Device Api's
router.get('/albums',function (req,res) {
    album.find({}).exec(function (err,albums) {
        if(err) {
            res.send('error occured ' + err);
        } else {
            res.sendStatus(200);
            res.json(albums);
        }
    });
});

router.get('/album/:id',function (req,res) {
    let id=res.params.id;
    album.findById(id).exec(function (err,album) {
        if(err) {
            res.send('error occured ' + err);
        } else {
            res.sendStatus(200);
            res.json(album);
        }
    });
});


router.patch('/product/:id',function (req,res) {

    Product.findByIdAndUpdate(req.params.id,{
       $set:{Name:req.body.Name,Cost:req.body.Cost,Expiry:req.body.Expiry,Warranty:req.body.Warranty}
    },{
        new: true
    }, function (err,updatedProduct) {
            if(err){
                console.log('Error occured '+ err);
            }else{
                res.json(updatedProduct);
            }
        }
    );

});

router.post('/product',function (req,res) {

    var newProduct = new Product();
    newProduct.Name = req.body.Name;
    newProduct.Cost = req.body.Cost;
    newProduct.Warranty = req.body.Warranty;
    newProduct.Image = req.body.Image;
    newProduct.Expiry = req.body.Expiry;
    newProduct.save(function (err,insertedProduct) {
        if(err){
            console.log('err'+err);
        }else{
            res.statusCode(200);
            res.json(insertedProduct);
        }
    });
});



// user Api's

router.get('/users',function (req,res) {
    user.find({}).exec(function (err,users) {
        if(err) {
            res.send('error occured ' + err);
        } else {
            res.json(users);
        }
    });
});


router.post('/user',function (req,res) {

    var newuser = new user();
    newuser.username = req.body.username;
    newuser.email = req.body.email;
    newuser.password = req.body.password;
    newuser.save(function (err,inserteduser) {
        if(err){
            console.log('err'+err);
        }else{
            
            let id=inserteduser._id;
            res.json({id:id,message:'New user Added Successfully'});
        }
    });
});

router.post('/user/login',function (req,res) {

    var newuser = new user();
    console.log(req.body.email);
    user.find({email: req.body.email}).exec(function (err,users) {
        if(err) {
            res.send('error occured ' + err);
        } else {
            if(users.password==req.body.password){
                res.json({message:'Authenticated Successfully'});
            }else{
                res.json({message:'Invalid Username or Password'});
            }
            res.json(users);
        }
    },err=>{
        res.json({message:'Error occured', error:err});
    });
});


router.delete('/user/:id',function (req,res) {

    user.findByIdAndRemove(req.params.id,function (err,deleteduser) {
        res.json(deleteduser);
    });

});


module.exports = router;