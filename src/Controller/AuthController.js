const userSchema = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

const securePassowrd = async (pass) => {
    return await bcrypt.hash(pass, 10);
};

exports.Registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                message:
                    "User already registered with this mail.Please try different email.",
            });
        } else {
            const userDetails = {
                name: name,
                email: email,
                role: email === "rajtailor@gmail.com" ? "admin" : "user",
                password: await securePassowrd(password),
            };
            const user = await userSchema.create(userDetails);
            res.status(400).json({ message: "User Registered Successfully", user: user });
        }
    } catch (error) {
        res.status(404).json(error);
    }
};
exports.Login = async (req, res) => {
    try {
        const {email,password}=req.body
        const user=await userSchema.findOne({email:email})
        
        if(user){
            const matchPassword=await bcrypt.compare(password,user.password)
            if(matchPassword){
                const token=jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:'24h'})
                res.status(200).json({success:true,message:"User logged in successfully",token:token,data:user})
            }else{
                res.status(409).json({success:false,message:"Email or password is incorrect"})
            }
        }else{
            res.status(404).json({success:false,message:"User not found"})
        }
    } catch (error) {
        res.status(404).json(error);
    }
}
