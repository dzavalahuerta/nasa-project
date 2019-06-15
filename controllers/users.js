const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

signToken = user =>{
    return JWT.sign({
        iss: 'NASA-project',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)
    }, JWT_SECRET);
};

module.exports = {
    signUp: async(req,res,next)=>{
        const { email, password } = req.value.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(403).json({ error: "Email already in use" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({token});
    },
    
    signIn: async(req,res,next)=>{

    },

    secret: async(req,res,next)=>{

    }

}