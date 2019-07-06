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
            res.cookie('access_token', token, {httpOnly: true});
            return res.status(200).json({ success: true });
        }
        let existingUser;

        if(existingUser = await User.findOne({ "local.email": email })){
            return res.status(403).json({ error: "Email already in use" });
        }

        if(existingUser = await User.findOne({$or: [{"google.email": email}, {"facebook.email": email}] })){
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
        res.cookie('access_token', token, {httpOnly: true});
        res.status(200).json({ success: true });
    },
    
    signIn: async(req,res,next)=>{
        const token = signToken(req.user);
        res.cookie('access_token', token, {httpOnly: true});
        res.status(200).json({ success: true });
    },

    signOut: async(req,res,next)=>{
        res.clearCookie('access_token');
        res.status(200).json({ success: true });
    },

    googleOAuth: async(req,res,next)=>{   
        const token = signToken(req.user);
        res.cookie('access_token', token, {httpOnly: true});
        res.status(200).json({ success: true });
    },

    facebookOAuth: async(req,res,next)=>{
        const token = signToken(req.user);
        res.cookie('access_token', token, {httpOnly: true});
        res.status(200).json({ success: true });
    },

    linkGoogle: async(req,res,next)=>{
        res.status(200).json({ methods: req.user.methods });
    },

    linkFacebook: async(req,res,next)=>{
        res.status(200).json({ methods: req.user.methods });
    },

    unlinkGoogle: async(req,res,next)=>{
        try {
            const user = await User.findOneAndUpdate({"_id": req.user._id}, {$unset: {google: 1}, $pull: {methods: {$in: ["google"]}}}, {new: true, useFindAndModify: false});
            res.status(200).json({ methods: user.methods });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    unlinkFacebook: async(req,res,next)=>{
        try {
            const user = await User.findOneAndUpdate({"_id": req.user._id}, {$unset: {facebook: 1}, $pull: {methods: {$in: ["facebook"]}}}, {new: true, useFindAndModify: false});
            res.status(200).json({ methods: user.methods });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getUserAuthenticationStatusAndMethods: async(req,res,next)=>{
        console.log(req.user.methods)
        res.status(200).json({ methods: req.user.methods });
    }
}