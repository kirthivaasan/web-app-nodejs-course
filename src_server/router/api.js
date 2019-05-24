module.exports = function (app){
    var express = require('express');
    var router =  express.Router();
    var passport = require('passport');
    const bcrypt = require('bcrypt');
    const{ User } = require('../db');

    const saltRounds = 10;

    // import passport and passport-jwt modules
    const jwt = require('jsonwebtoken');
    const passportJWT = require('passport-jwt');

    // ExtractJwt to help extract the token
    let ExtractJwt = passportJWT.ExtractJwt;

    // JwtStrategy which is the strategy for the authentication
    let JwtStrategy = passportJWT.Strategy;
    let jwtOptions = {};

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'nZr4u7x!A%D*G-KaPdRgUkXp2s5v8y/B'; // 256 bit key
    jwtOptions.algorithm = 'RS256';

    // Lets create our strategy for web token
    let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
        console.log('Payload received', jwt_payload);
        let user = getUser({ id: jwt_payload.id });

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

    passport.use(strategy);

    // Create some helper functions to work on the database
    const createUser = async ({ name, email, password }) => {
        return await User.create({ name, email, password });
    };
    
    const getAllUsers = async () => {
        return await User.findAll();
    };
    
    const getUser = async obj => {
        return await User.findOne({
            where: obj,
        });
    };

    // ----------------------------------------------------------------
    // Public route paths
    // ----------------------------------------------------------------

    // Home route

    router.get('/', function(req, res) {    
        res.sendFile('index.html');
    });

    // Register route
    router.post('/register', function(req, res, next) {
        const { name, email, password } = req.body;

        bcrypt.hash(password, 10, function(err, hash) {
            let password = hash;
            createUser({ name, email, password }).then(user => res.json({ name, msg: 'Account created successfully' }));
        });
    });

    // Login route

    router.post('/login', async function(req, res, next) {
        const { name, password } = req.body;
        console.log("Name: " + name + " password: " + password);
        
        if (name && password) {
            // we get the user with the name and save the resolved promise
            let user = await getUser({ name });
            let hash = bcrypt.hashSync(password, 10);

            console.log('PASSWORD: ' + password);
            console.log(password == '1234');
            console.log(bcrypt.hashSync(password, 10));
            console.log(bcrypt.hashSync('1234', 10));
            console.log(bcrypt.hashSync('1234', 10));
            console.log(bcrypt.hashSync('1234', 10));
                        
            console.log('getUser response: ' + user.password, ' computed hash: ' + hash);
            
            if(bcrypt.compareSync(password, user.password)) {
	        console.log('ready to sign token');
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                var returnJson = { msg: 'ok', token: token }; 
                console.log(returnJson);
                res.json(returnJson);
            } else {
                console.log('no such user');
                res.status(401).json({ msg: 'No such user found', user });
            }
        }
        
    });

    // logout route

    router.post('/logout', function(req, res, next) {
        
    });

    // ----------------------------------------------------------------
    // Protected route paths
    // ----------------------------------------------------------------

    // Get all users

    router.get('/users', passport.authenticate('jwt',{session:false}), function(req, res) {
        getAllUsers().then(user => res.json(user));
    });


    return router;
}
