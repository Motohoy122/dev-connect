const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // send user infornmation minus the password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    // check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    // Destructuring req.body
    const { email, password} = req.body

    try {
        // Does user exist
        let user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        // Bcrypt has a function that compares a plain text password to an encrypted password
        // and notifies you wether or not they match
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match the encrypted password in the DB
        if(!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        // Pass in payload, secret & timeout
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if (err) throw err;
                //if there is not an error return the token to the user
                res.json({ token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;