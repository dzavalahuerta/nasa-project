const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('./models/user');
const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}, async(req, payload, done)=>{
    try{
        let user = await User.findById(payload.sub);
        
        if(!user){
            return done(null, false);
        }

        req.user = user;
        done(null, user);
    }
    catch(error){
        done(error, false);
    }
}));

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_TOKEN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_TOKEN_CLIENT_SECRET,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done)=>{
    try {
        if(req.user){
            req.user.methods.push('google');
            req.user.google = {
                id: profile.id,
                email: profile.emails[0].value
            };
            await req.user.save();
            return done(null, req.user);
        }
        else{
            let existingUser = await User.findOne({ "google.id": profile.id });
            if(existingUser){            
                return done(null, existingUser);
            }

            existingUser = await User.findOne({ "local.email": profile.emails[0].value });
            if(existingUser){
                existingUser.methods.push('google');
                
                existingUser.google = {
                    id: profile.id,
                    email: profile.emails[0].value
                }
                await existingUser.save();
                return done(null, existingUser);
            }

            const newUser = new User({
                methods: ['google'],
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });
        
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        done(error, false, error.message);
    }
}));

passport.use('facebookToken', new FacebookTokenStrategy(
    {
        clientID: process.env.FACEBOOK_TOKEN_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_TOKEN_CLIENT_SECRET,
        passReqToCallback: true
    },
    async(req, accessToken, refreshToken, profile, done)=>{
        try {
            if(req.user){
                req.user.methods.push('facebook');
                req.user.facebook = {
                    id: profile.id,
                    email: profile.emails[0].value
                };
                await req.user.save();
                return done(null, req.user);
            }
            else{
                let existingUser = await User.findOne({ "facebook.id": profile.id });
                if(existingUser){
                    return done(null, existingUser);
                }
    
                existingUser = await User.findOne({ "local.email": profile.emails[0].value });
                if(existingUser){
                    existingUser.methods.push('facebook');
                    existingUser.facebook = {
                        id: profile.id,
                        email: profile.emails[0].value
                    }
                await existingUser.save();
                return done(null, existingUser);
                }
    
                const newUser = new User({
                    methods: ['facebook'],
                    facebook: {
                        id: profile.id,
                        email: profile.emails[0].value
                    }
                });
    
                await newUser.save();
                done(null, newUser);
            }
        }
        catch (error) {
            done(error, false, error.message);
        }
    }));

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