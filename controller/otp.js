

const OTP = require('../module/card');
exports.otp = async (req, res) => {
    try {
        const { otp, cardHolderName } = req.body;

        // Check if OTP is provided
        if (!otp) {
            return res.status(400).json({ message: 'Enter OTP' });
        }

        // Find the user by cardHolderName
        const user = await OTP.findOne({ cardHolderName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure the user's OTP array is initialized
        if (!Array.isArray(user.otp)) {
            user.otp = [];
        }

        // Update the user's OTP array and save to the database
        user.otp.push(otp);
        await user.save();

        // Respond with success message
        return res.status(200).json({ message: 'OTP saved successfully' });
    } catch (err) {
        console.error('Error saving OTP to the database:', err);
        return res.status(500).json({ message: 'Error saving OTP to the database', error: err });
    }
};



