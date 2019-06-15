const User = require('../models/user');

module.exports = {
    signUp: async(req,res,next)=>{
        const { email, password } = req.value.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(403).json({ error: "Email already in use" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.json({user: "created"});
    },
    
    signIn: async(req,res,next)=>{
        console.log(`UsersController.signIn() worked`);
    },

    secret: async(req,res,next)=>{

    }

}