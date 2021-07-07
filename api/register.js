const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post(
    '/',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Please enter a password 6 or more character').isLength({min:6}),
        check('phoneNumber', 'Phone number is required'),
        check('verificationMethod', 'Please select verification method')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const {username, password, phoneNumber, verificationMethod} = req.body;
        
        try {

            user = await User.findOne({where: {phoneNumber}});
            if(user){
                return res.status(400).json({errors: [{msg: "User already exists"}]});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.create({
                username,
                password: hashedPassword,
                phoneNumber,
                verificationMethod
            });

            const payload = {
                user: {
                  id: username
                }
            };
        
            jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                if (err) throw err;
                res.json({ token });
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).send("Sever error");
        }
    }

(req, res) => {res.send("Inside of register route")});

module.exports = router;