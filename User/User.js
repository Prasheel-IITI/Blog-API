const express= require('express');
const router=express.Router();
const bodyParser=require('body-parser')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const {User}=require('../models/models.js');
const { urlencoded } = require('body-parser');
const { registerValidation,loginValidation } = require('../Validation/validation.js');

router.get('/',function(req,res){
    res.send("File Working");
})

router.post('/register',async function(req,res){

    const {error}=await registerValidation(req.body);
    if(error) return res.send(error.details[0].message);

    await User.findOne({Email: req.body.Email},function(err,EmailFound){
        if(EmailFound){
            return res.send("Email already exists");
        }
    })

    const salt=await bcrypt.genSalt(10);

    const HashedPassword=await bcrypt.hash(req.body.Password,salt);

    const user=new User({
        Email: req.body.Email,
        Password: HashedPassword,
        Name: req.body.Name
    })

    try{
        await user.save();
        return res.send({user: user._id})
    }
    catch(error){
        return res.status(400).send("Error adding the user");
    }
})

router.post('/login',async function(req,res){
    
    const {error}=await loginValidation(req.body);
    if(error) return res.send(error.details[0].message);
    
    let Email= req.body.Email;
    let Password= req.body.Password;

    const user=await User.findOne({Email: Email});
    if(!user) return res.send("Email doesn't exists")

    const valid=await bcrypt.compare(Password,user.Password)
    if(!valid) return res.send("Password Incorrect");

    const token= jwt.sign({_id: user._id},process.env.TOKEN_PASS,{expiresIn: '1h'});
    return res.header('auth-token',token).send({"token": token});

})

module.exports= router