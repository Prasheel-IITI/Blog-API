const express= require('express');
const router=express.Router();
const bodyParser=require('body-parser')
const verify=require('../User/Auth.js')

const {Story, User}=require('../models/models.js');
const { urlencoded } = require('body-parser');
const { storyValidation } = require('../Validation/validation.js');
const { func } = require('@hapi/joi');
const mongoose=require('mongoose')

router.get('/',verify,async function(req,res){
    const stories=await Story.find();
    return res.send(stories);
})

router.post('/',verify,async function(req,res){
    const {error}=await storyValidation(req.body);
    if(error) return res.send(error.details[0].message);
    const story=new Story({
        Title: req.body.Title,
        Body: req.body.Content,
        Author: req.user._id
    })
    try{
        // console.log(req.user);
        await story.save();
        
        const ans1=await Story.findOne({_id: story._id}).populate('Author')
        const ans2=await User.findOne({_id: req.user._id}).populate('Stories')
        // const ans3=await ans2.populated('Stories');
        // console.log(ans3);
        // console.log(ans1);
        // console.log(ans2.Stories);

        return res.send(ans1);
    }
    catch(err){
        console.log(err);
        return res.status(400).send("Error posting");
    }
})

// router.get('/:story_id',verify,async function(req,res){
//     const story_id=new mongoose.Types.ObjectId({_id: req.params.story_id});
//     console.log(story_id)
//     try{
//         const story=await Story.findOne({_id: mongojs.ObjectId(story_id)});
//         if(!story) return res.send("Invalid Story ID");
//         return res.send(story);
//     }
//     catch(err){
//         console.log(err);
//         res.send("Sorry Please try again")
//     }
// })

router.get('/:title',verify,async function(req,res){
    try{
        const story=await Story.findOne({Title: req.params.title});
        if(!story) return res.send("Invalid Story ID");
        return res.send(story);
    }
    catch(err){
        console.log(err);
        res.send("Sorry Please try again")
    }
})

// router.patch('/:title',verify,async function(req,res){
//     console.log(req.body);
//     console.log(req.params.title)
//     try{
//         const story=await Story.findOne({title: req.params.title});
//         console.log(story)
//         // if(story.Author._id!==req.user._id) return res.send("Unauthorised")
//         const storyUpdated=await Story.updateOne({title: req.params.title},{$set: req.body})
//         return res.send(storyUpdated);
//     }
//     catch(err){
//         console.log(err)
//         return res.send("Error occured");
//     }
// })

module.exports = router