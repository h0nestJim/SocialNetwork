const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

//@route   POST api/Users
//@desc    Test route
//@access  public

router.post('/', [
        check('name', 'Name is required...').not().isEmpty(),
        check('email', 'Please enter email...').isEmail(),
        check('password', 'Please enter a password of at least 6 characters!').isLength({
            min: 6
        })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return bad request
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name,
            email,
            password
        } = req.body;

        try {
            //see if user exists
            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: "User already exists!"
                    }]
                });
            }

            //get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            //encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //save to database
            await user.save();


            //return jsonwebtoken

            res.send('User registration complete!');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error...')
        }
    });

//exports the route to this file
module.exports = router;