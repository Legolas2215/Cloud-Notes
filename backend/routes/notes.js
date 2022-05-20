const express = require('express');
const router = express.Router();
const fetchUser = require('./Middleware/fetchUser');
const Notes = require('../models/Notes');

//Validator allows us to check the details before saving it
const { body, validationResult } = require('express-validator');


//Route:1 Adding Notes
router.post('/addnotes',fetchUser, [
    body('title', 'Enter atleast 3 character').isLength({ min: 3 }),
    body('description', 'Enter atleast 5 character').isLength({ min: 5 })
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
try{
    const notes = await new  Notes({
        title : req.body.title,
        description : req.body.description,
        tags: req.body.tags,
        user: req.user.id
    })
    const savedNote = await notes.save()
    res.json(savedNote);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some Error occured");
}
    
})

//Route:2 Viewing Notes
router.get('/getnotes',fetchUser,async (req,res)=>{
    
try{
    const notes = await Notes.find({user:req.user.id})
    res.send(notes);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some Error occured");
}
    
})

//Route:3 Updating Notes
//Here we wil ensure that after logging in user can change the details of only his note
//so the the user corres to id must match the user token in request
router.put('/update/:id',fetchUser,async (req,res)=>{
    
    try{
        const {title,description,tags} = req.body;
        const updatedNote ={};
        if(title){updatedNote.title=title};
        if(description){updatedNote.description=description};
        if(tags){updatedNote.tags=tags};

        //finding the note
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("No notes Present")}
        if(note.user.toString() !== req.user.id){
            return  res.status(401).send("Access Denied")
        }

        //Updating notes
        note = await Notes.findByIdAndUpdate(req.params.id,{$set : updatedNote},{new:true});
        res.json(note)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
        
})


//Route:4 Deleting News
router.delete('/delete/:id',fetchUser,async (req,res)=>{
    
    try{
        
        //finding the note
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("No notes Present")}
        if(note.user.toString() !== req.user.id){
            return  res.status(401).send("Access Denied")
        }

        //Deleting note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({
            message: "Suceesfully deleted",
            note: note
        });
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
        
})



module.exports = router ;