const validator =require('validator');

const Address= require('../module/address');

exports.addresscreate = async (req, res) => {
     
    const { name,number,pincode,house,area,landmark,city,state } = req.body;
    try {
if(!name||!number||!pincode||!house||!area||!landmark||!city||!state){
    return res.status(400).json({message:'all fileds are require'});
}      
if (!validator.isNumeric(number.toString()) || number.toString().length !== 10) {
    return res.status(400).json({ message: 'Invalid number format. Must be 10 digits' });
  }
  if (!validator.isNumeric(pincode.toString()) || pincode.toString().length !== 6) {
    return res.status(400).json({ message: 'Invalid pincode format. Must be 6 digits' });
  }
const newaddress= new Address({
    name,number,pincode,house,area,landmark,city,state
});
await newaddress.save();
res.json({message:'new address added successfully'});

 } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.deleteaddress=async(req,res)=>{
    try{
        const {addressId}=req.params;

        const address=await Address.findById(addressId);

        if(!address){
            return res.status(404).json({message:"Address not found"} )

        }
        await address.deleteOne();

        return res.json({message:'address deleted sucessfullly'}

        )
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Failed to delete product',error:err.message});
    }
}

exports.updateaddress=async(req,res)=>{
try {
    const addressId = req.params.addresstId; // Assuming productId is passed in the request

    const {
        name,number,pincode,house,area,landmark,city,state
    } = req.body;

    const updateFields = {
        name,number,pincode,house,area,landmark,city,state};

   
    const updatedAddress = await Address.findByIdAndUpdate(productId, updateFields, { new: true });

    if (!updatedAddress) {
        return res.status(404).json({ message: "address not found" });
    }

    return res.json({ message: 'address updated successfully', updateaddress});
} catch (err) {
    return res.status(500).json({ message: err.message });
}
}


exports.getAddressList = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
