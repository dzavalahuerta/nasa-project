const JWT = require('jsonwebtoken');
const User = require('../models/user');

signToken = user =>{
    return JWT.sign({
        iss: 'NASA-project',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)
    }, process.env.JWT_SECRET);
};

module.exports = {
    signUp: async(req,res,next)=>{
        const { email, password } = req.value.body;
        async function addLocalMethodToExistingAccount(){
            existingUser.methods.push('local');
            existingUser.local = {
                email,
                password
            };
            await existingUser.save();
            const token = signToken(existingUser);
            return res.status(200).json({
                token,
                methods: existingUser.methods
            });
        }
        let existingUser;

        if(existingUser = await User.findOne({ "local.email": email })){
            return res.status(403).json({ error: "Email already in use" });
        }

        if(existingUser = await User.findOne({ "google.email": email })){
            addLocalMethodToExistingAccount();
            return;
        }
        
        if(existingUser = await User.findOne({ "facebook.email": email })){
            addLocalMethodToExistingAccount();
            return;
        }

        const newUser = new User({
            methods: ['local'],
            local: {
                email: email, 
                password: password
            }
        });
        await newUser.save();
        const token = signToken(newUser);
        res.status(200).json({
            token,
            methods: newUser.methods
        });
    },
    
    signIn: async(req,res,next)=>{
        const token = signToken(req.user);
        res.status(200).json({
            token,
            methods: req.user.methods
        });
    },

    googleOAuth: async(req,res,next)=>{   
        const token = signToken(req.user);
        res.status(200).json({
            token,
            methods: req.user.methods
        });
    },

    facebookOAuth: async(req,res,next)=>{
        const token = signToken(req.user);
        res.status(200).json({
            token,
            methods: req.user.methods
        });
    },

    linkGoogle: async(req,res,next)=>{
        res.status(200).json({ methods: req.user.methods });
    },

    linkFacebook: async(req,res,next)=>{
        res.status(200).json({ methods: req.user.methods });
    },

    unlinkGoogle: async(req,res,next)=>{
        try {
            const user = await User.findOneAndUpdate({"_id": req.user._id}, {$unset: {google: 1}, $pull: {methods: {$in: ["google"]}}}, {new: true});
            res.status(200).json({ methods: user.methods});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    unlinkFacebook: async(req,res,next)=>{
        try {
            const user = await User.findOneAndUpdate({"_id": req.user._id}, {$unset: {facebook: 1}, $pull: {methods: {$in: ["facebook"]}}}, {new: true});
            res.status(200).json({ methods: user.methods });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}