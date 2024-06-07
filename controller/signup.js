const signup=require('../module/signup');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt=require('../controller/jwt')


//signup api 
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the email already exists
        const existingUser = await signup.findOne({ username });

        if (existingUser) {

            // User with the same email already exists
            return res.status(400).json({ error: 'username already exists' });
        }

        if(!username||!password){
            return res.status(400).json({error:'all fields are require'});
        }
         
        const hashedPassword = await bcrypt.hash(password, 10);
       

        const newUser = new signup({
          
            username,
           
            password: hashedPassword,
        });

        const result = await newUser.save();
        res.json({ message: 'Signup successful' });

    } catch (err) {
        console.error('Error saving user to database:', err);
        res.status(500).json({ error: 'Error saving user to database' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user in MongoDB
        const user = await signup.findOne({ username});

        // Check if the user exists
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("password not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }

const token=jwt.generateToken({username});

        console.log("Login successful",token);
        res.status(200).json({ message: 'Login successful',token});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.forgotpassword = async (req, res) => {
    const userId = req.params.userId;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
  // Assuming you're passing email in the request body

    // Validate input
    if (!newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    try {
        // Fetch user from database
        const user = await signup.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await signup.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }}

  exports.getuser=async(req,res)=>{
    try {
        const user = await signup.find();
        res.json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
  }
  exports.deleteuser=async(req,res)=>{
    try{
        const {userId}=req.params;

        const user=await signup.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"} )

        }
        await user.deleteOne();

        return res.json({message:'user deleted sucessfullly'} )
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Failed to delete product',error:err.message});
    }
}