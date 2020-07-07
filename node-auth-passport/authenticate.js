var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var FacebookTokenStrategy = require('passport-facebook-token');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');
var User = require('./models/user');  

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // when we login after authenticate passport add field in req as req.session { passport: { user: 'johar2' } }
passport.deserializeUser(User.deserializeUser()); //then we deserialize using id the details

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(new JwtStrategy(opts,(jwt_payload, done) => {

        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});


// after check ordinary user it will load a new property named user to the request object. This will be available to you
exports.verifyAdmin=((req,res,next)=>{

    //console.log(req.user.admin);
    if(req.user.admin===true)
    {
        console.log("you are admin user");
        next();
    }
    else{
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({status:false,message:"you are not authorized to perform this action,Admin privileges needed"});
    }
});


exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));