const cloudinary = require('cloudinary').v2; // Assuming you have configured Cloudinary correctly elsewhere
const Product = require('../module/productimage'); // Adjust the path to your Product model
exports.productCreate = async (req, res) => {
    try {
      // Check if files were uploaded
      if (!req.files || req.files.length === 0) {
        return res.json({ success: false, message: "No files uploaded" });
      }
  
      // Extract additional fields from the request body
      const { description, rating, crating, people, price, discount ,offer} = req.body;
  
      // Validate required fields
      if (!description || !rating || !crating || !people || !price || !discount||!offer) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Array top hold uploaded file information
      const uploadedFiles = [];
  
      // Upload each file to Cloudinary
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'image' });
        uploadedFiles.push({ client_id: result.public_id, url: result.secure_url });
      }
  
      // Create a new Product document with the uploaded files and additional fields
      const newProduct = new Product({
        upload: uploadedFiles,
        description,
        rating,
        crating,
        people,
        price,
        discount,
        offer
      });
  
      const savedProduct = await newProduct.save();
  
      // Respond with success and uploaded file details
      return res.json({
        success: true,
        files: uploadedFiles,
        message: "Files uploaded and saved successfully",
        product: savedProduct
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      return res.status(500).json({ success: false, message: "An error occurred while uploading files" });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      await product.deleteOne();

      return res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
  };
  
  exports.updateProductImage = async (req, res) => {
    try {
      const productId = req.params.productId;
      const imageData = req.file;
  
      if (!imageData) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const img = await cloudinary.v2.uploader.upload(imageData.path, { folder: "uploads" });
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const updatedData = {
        image: { client_id: img.public_id, url: img.url },
        ...(req.body || {}),
      };
  
      await Product.findByIdAndUpdate(productId, updatedData);
      res.status(200).json({ message: "File uploaded successfully", product: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getAllProducts = async (req, res) => {
    try {
      const photos = await Product.find();
      if (!photos || photos.length === 0) {
        return res.status(404).json({ message: "No photos found" });
      }
      return res.json({ message: "Dashboard retrieved successfully", photos });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
    }
  };
  
  exports.getProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      if (productId) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
      }
  
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
  };