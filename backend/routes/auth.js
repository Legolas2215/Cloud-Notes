const express = require('express');
const router = express.Router();

//We are including User from models, that contains Schema linking mongodb. Thus we just need to save data through
//the schema
const User = require('../models/UserData');

//Bcrypt is used for Hashing and Salt
const bcrypt = require('bcryptjs');

//jwt allows us to return webtoken to user
var jwt = require('jsonwebtoken');
//Validator allows us to check the details before saving it
const { body, validationResult } = require('express-validator');
const fetchUser = require('./Middleware/fetchUser');


const JWT_Secret = "Legolas";

//Here we are just sending data to database and saving it. No authentication is done
//ROUTE:1
router.post('/createUser', [
    body('name', 'Enter atleast 3 character').isLength({ min: 3 }),
    body('email', 'Enter correct').isEmail(),
    body('password', 'Enter atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // //This returns a promise 
    //  User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // }).then(user => res.json(user))
    // .catch(err =>{
    //     console.log(err);
    //     res.json(err);
    // });

    //Same above code using async and await
    try {
        //CrossVerifying the email, though already specified in schema we are rechecking for duplications in email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        //Salt and hashing Both sync and async functions possible
        var salt = await bcrypt.genSalt(10);
        var passWord = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: passWord,
            email: req.body.email,
        })


        var authToken = jwt.sign({ id: user.id }, JWT_Secret);
        // console.log(token);
        success = true;
        res.json({ success,authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({success,error:"Some Error occured"});
    }

})

//Login Routes: Enter detail and matches
//ROUTE:2
router.post('/login', [
    body('email', 'Enter correct email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter Correct email" })
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(400).json({ error: "Enter Correct Password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        var authToken = jwt.sign(data, JWT_Secret);
        // console.log(token);
        success = true;
        res.json({ success,authToken });

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({success,error:"Some Error occured"});
    }

})

//Sending data to Client. Login Required
//ROUTE:3
router.post('/getuser', fetchUser, async (req, res) => {
    let success = false;

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send({success,user});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({success,error:"Some Error occured"});
    }


})

module.exports = router;