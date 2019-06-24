const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async(payload, done)=>{
    try{
        const user = await User.findById(payload.sub);
        
        if(!user){
            return done(null, false);
        }

        done(null, user);
    }
    catch(error){
        done(error, false);
    }
}));

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_TOKEN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_TOKEN_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done)=>{
    try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if(existingUser){            
            return done(null, existingUser);
        }
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
    
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));

passport.use('facebookToken', new FacebookTokenStrategy(
    {
        clientID: process.env.FACEBOOK_TOKEN_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_TOKEN_CLIENT_SECRET
    },
    async(accessToken, refreshToken, profile, done)=>{
        try {
            const existingUser = await User.findOne({ "facebook.id": profile.id });
            if(existingUser){
                return done(null, existingUser);
            }
            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });

            await newUser.save();
            done(null, newUser);
        }catch (error) {
            done(error, false, error.message);
        }
    }
));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done)=>{
    try{
        const user = await User.findOne({ "local.email": email });
    
        if(!user){
            return done(null, false);
        }
    
        const answer = await user.doesPasswordMatch(password);
        if(answer === false){
            return done(null, false);
        }
    
        done(null, user);
    }
    catch(error){
        done(error, false);
    }
}));

module.exports = passport;