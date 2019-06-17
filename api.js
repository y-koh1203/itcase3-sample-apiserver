/**
 * import packages.
 */
const express = require('express');
const crypto = require('crypto');

/**
 * import models.
 */
const Users = require('../model/Users');

const router = express.Router();

/**
 * routing for /auth/
 */
app.post('/', (req,res) => {

});

/**
 * routing for /auth/signup
 */
router.post('/signup', [
    check('mail').isEmail(),
    check('password').isLength({max: 10}),
    check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty()
], (req,res) => {

    // validation
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({ errors: error.array() });
    }

    Users.countDocuments({mail:req.body.mail}, (error, count) => { 

        if(error){
            return res.status(500).json({error: 'error occurred.'});
        }

        if(count > 0){
            return res.status(409).json({error: 'user exists.'});
        }

        //create hash
        const salt = 'gdhiwdyyw89yhuw3fhiooifegqlo';
        const hash = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex');
        const params = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            password: hash,
            section: req.body.section,
            status: 1
        };
        
        const users = new Users(params);
    
        users.save(error => {
            if(error){
                return res.status(500).json({error: 'error occurred.'});
            }

            const token = generateToken(params);
    
            return res.status(201).json({
                status: 'success',
                token: token
            });
        });
    }); 
});

module.exports = router;